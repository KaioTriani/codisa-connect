import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ImportResult {
  updated: number;
  esgotados: number;
  naoEncontrados: string[];
  errors: string[];
}

interface SpreadsheetRow {
  Código?: string;
  codigo?: string;
  CÓDIGO?: string;
  SKU?: string;
  Quantidade?: number | string;
  quantidade?: number | string;
  QUANTIDADE?: number | string;
  Estoque?: number | string;
  estoque?: number | string;
  "Preço"?: number | string;
  "Preço Atacado"?: number | string;
  preco?: number | string;
}

const EstoqueImport = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [preview, setPreview] = useState<SpreadsheetRow[]>([]);

  const processFile = async (file: File) => {
    setLoading(true);
    setResult(null);

    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<SpreadsheetRow>(ws);

      setPreview(rows.slice(0, 5));

      if (rows.length === 0) {
        toast({ title: "Planilha vazia", variant: "destructive" });
        setLoading(false);
        return;
      }

      // Build SKU map from spreadsheet
      const skuMap = new Map<string, { quantidade: number; preco?: number }>();
      rows.forEach((row) => {
        const code = String(row.Código || row.codigo || row.CÓDIGO || row.SKU || "").trim().toUpperCase();
        const qty = Number(row.Quantidade ?? row.quantidade ?? row.QUANTIDADE ?? row.Estoque ?? row.estoque ?? 0);
        const preco = row["Preço"] ?? row["Preço Atacado"] ?? row.preco;
        if (code) skuMap.set(code, { quantidade: qty, preco: preco ? Number(preco) : undefined });
      });

      // Fetch all active products
      const { data: produtos, error } = await supabase.from("produtos").select("id, code, stock, wholesale_price");
      if (error) throw error;

      const res: ImportResult = { updated: 0, esgotados: 0, naoEncontrados: [], errors: [] };
      const codigosBanco = new Set<string>();

      for (const produto of (produtos || [])) {
        const codeUp = produto.code.toUpperCase();
        codigosBanco.add(codeUp);
        const match = skuMap.get(codeUp);

        if (!match) {
          // Product not in spreadsheet → mark as esgotado
          const { error: e } = await supabase
            .from("produtos")
            .update({ stock: 0, active: false })
            .eq("id", produto.id);
          if (!e) res.esgotados++;
          else res.errors.push(produto.code);
        } else {
          // Update stock and price
          const updates: Record<string, unknown> = { stock: match.quantidade, active: match.quantidade > 0 };
          if (match.preco && match.preco > 0) updates.wholesale_price = match.preco;
          const { error: e } = await supabase.from("produtos").update(updates).eq("id", produto.id);
          if (!e) res.updated++;
          else res.errors.push(produto.code);
        }
      }

      // Report codes in spreadsheet not found in DB
      skuMap.forEach((_, code) => {
        if (!codigosBanco.has(code)) res.naoEncontrados.push(code);
      });

      setResult(res);
      toast({ title: "Importação concluída!", description: `${res.updated} produto(s) atualizado(s), ${res.esgotados} marcado(s) como esgotado.` });
    } catch (err) {
      console.error(err);
      toast({ title: "Erro ao processar planilha", description: "Verifique o formato do arquivo.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) processFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"], "application/vnd.ms-excel": [".xls"] },
    maxFiles: 1,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-xl font-bold text-foreground mb-1">Importação de Estoque</h2>
        <p className="text-sm text-muted-foreground">
          Faça upload da planilha diária (.xlsx). O sistema sincroniza por <strong>Código SKU</strong> — produtos ausentes são marcados automaticamente como esgotados.
        </p>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-secondary bg-secondary/5" : "border-border hover:border-secondary/50"
        }`}
      >
        <input {...getInputProps()} />
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 text-secondary animate-spin" />
            <p className="text-foreground font-medium">Processando planilha...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
            <div>
              <p className="font-heading font-bold text-foreground">{isDragActive ? "Solte o arquivo aqui" : "Arraste ou clique para selecionar"}</p>
              <p className="text-sm text-muted-foreground mt-1">Suporte a .xlsx e .xls</p>
            </div>
            <Button variant="outline" size="sm" className="mt-2">
              <Upload className="h-4 w-4 mr-2" /> Selecionar Arquivo
            </Button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="bg-muted/50 rounded-lg p-4 text-sm">
        <p className="font-semibold text-foreground mb-2">📋 Formato esperado da planilha:</p>
        <div className="grid grid-cols-3 gap-2 text-muted-foreground">
          <div className="bg-card border border-border rounded px-3 py-2 text-center font-mono text-xs">Código</div>
          <div className="bg-card border border-border rounded px-3 py-2 text-center font-mono text-xs">Quantidade</div>
          <div className="bg-card border border-border rounded px-3 py-2 text-center font-mono text-xs">Preço (opcional)</div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">A coluna "Código" deve conter o SKU (ex: ACU001). Quantidade 0 = produto marcado como Esgotado.</p>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <p className="font-heading font-black text-2xl text-foreground">{result.updated}</p>
              <p className="text-xs text-muted-foreground">Atualizados</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Package className="h-6 w-6 text-orange-500 mx-auto mb-1" />
              <p className="font-heading font-black text-2xl text-foreground">{result.esgotados}</p>
              <p className="text-xs text-muted-foreground">Esgotados</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <AlertCircle className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
              <p className="font-heading font-black text-2xl text-foreground">{result.naoEncontrados.length}</p>
              <p className="text-xs text-muted-foreground">SKUs não encontrados</p>
            </div>
          </div>

          {result.naoEncontrados.length > 0 && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <p className="text-sm font-semibold text-destructive mb-2">SKUs na planilha não encontrados no cadastro:</p>
              <div className="flex flex-wrap gap-2">
                {result.naoEncontrados.map((code) => (
                  <span key={code} className="bg-card border border-border rounded px-2 py-1 font-mono text-xs">{code}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EstoqueImport;
