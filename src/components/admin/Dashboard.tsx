import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, ShoppingBag, Package, TrendingUp, Users, Clock, ChevronRight } from "lucide-react";

interface Stats {
  totalPedidos: number;
  pedidosPendentes: number;
  totalProdutos: number;
  produtosEsgotados: number;
  receitaTotal: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats>({ totalPedidos: 0, pedidosPendentes: 0, totalProdutos: 0, produtosEsgotados: 0, receitaTotal: 0 });
  const [pedidos, setPedidos] = useState<Array<{ id: string; total: number; status: string; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [{ count: totalPedidos }, { count: pedidosPendentes }, { count: totalProdutos }, { count: produtosEsgotados }, { data: pedidosData }, { data: receitaData }] =
        await Promise.all([
          supabase.from("pedidos").select("*", { count: "exact", head: true }),
          supabase.from("pedidos").select("*", { count: "exact", head: true }).eq("status", "pendente"),
          supabase.from("produtos").select("*", { count: "exact", head: true }),
          supabase.from("produtos").select("*", { count: "exact", head: true }).eq("stock", 0),
          supabase.from("pedidos").select("id, total, status, created_at").order("created_at", { ascending: false }).limit(10),
          supabase.from("pedidos").select("total"),
        ]);

      const receita = (receitaData || []).reduce((sum: number, p: { total: number }) => sum + Number(p.total), 0);
      setStats({
        totalPedidos: totalPedidos || 0,
        pedidosPendentes: pedidosPendentes || 0,
        totalProdutos: totalProdutos || 0,
        produtosEsgotados: produtosEsgotados || 0,
        receitaTotal: receita,
      });
      setPedidos(pedidosData || []);
      setLoading(false);
    };
    load();
  }, []);

  const statusColor: Record<string, string> = {
    pendente: "text-yellow-600 bg-yellow-50 border-yellow-200",
    confirmado: "text-blue-600 bg-blue-50 border-blue-200",
    entregue: "text-green-600 bg-green-50 border-green-200",
    cancelado: "text-red-600 bg-red-50 border-red-200",
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="animate-spin h-8 w-8 rounded-full border-2 border-secondary border-t-transparent" /></div>;

  return (
    <div className="space-y-6">
      <h2 className="font-heading text-xl font-bold text-foreground">Dashboard</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Pedidos Totais", value: stats.totalPedidos, icon: ShoppingBag, color: "text-blue-600" },
          { label: "Pendentes", value: stats.pedidosPendentes, icon: Clock, color: "text-yellow-600" },
          { label: "Produtos Ativos", value: stats.totalProdutos, icon: Package, color: "text-green-600" },
          { label: "Esgotados", value: stats.produtosEsgotados, icon: TrendingUp, color: "text-red-600" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-card border border-border rounded-xl p-5">
            <kpi.icon className={`h-5 w-5 ${kpi.color} mb-3`} />
            <p className="font-heading font-black text-2xl text-foreground">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Receita */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-3 mb-1">
          <BarChart3 className="h-5 w-5 text-secondary" />
          <h3 className="font-heading font-bold text-foreground">Receita Total (Estimada)</h3>
        </div>
        <p className="font-heading font-black text-3xl text-secondary mt-2">
          R$ {stats.receitaTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-muted-foreground mt-1">Baseado em todos os pedidos registrados</p>
      </div>

      {/* Recent orders */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-heading font-bold text-foreground mb-4 flex items-center gap-2">
          <Users className="h-4 w-4" /> Pedidos Recentes
        </h3>
        {pedidos.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Nenhum pedido ainda.</p>
        ) : (
          <div className="space-y-2">
            {pedidos.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-mono text-foreground">{p.id.slice(0, 8)}…</p>
                  <p className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString("pt-BR")}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-0.5 rounded border font-medium ${statusColor[p.status] || ""}`}>{p.status}</span>
                  <span className="font-heading font-bold text-sm text-foreground">R$ {Number(p.total).toFixed(2)}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
