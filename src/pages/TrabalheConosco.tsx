import { useState } from "react";
import { Upload, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const TrabalheConosco = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", position: "" });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.position.trim()) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }
    toast({ title: "Currículo enviado!", description: "Agradecemos seu interesse. Entraremos em contato caso haja vagas compatíveis." });
    setForm({ name: "", email: "", phone: "", position: "" });
    setFile(null);
  };

  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl font-black text-primary-foreground mb-3">Trabalhe Conosco</h1>
          <p className="text-primary-foreground/70">Faça parte da equipe CODISA! Envie seu currículo.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-xl">
          <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Nome completo *</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={100} />
            </div>
            <div>
              <Label htmlFor="email">E-mail *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} maxLength={255} />
            </div>
            <div>
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} maxLength={20} />
            </div>
            <div>
              <Label htmlFor="position">Cargo desejado *</Label>
              <Input id="position" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} maxLength={100} />
            </div>
            <div>
              <Label htmlFor="resume">Currículo (PDF/DOCX)</Label>
              <div className="mt-1">
                <label
                  htmlFor="resume"
                  className="flex items-center gap-2 cursor-pointer border border-border rounded-md px-4 py-3 hover:bg-muted transition-colors"
                >
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{file ? file.name : "Selecionar arquivo..."}</span>
                </label>
                <input
                  id="resume"
                  type="file"
                  accept=".pdf,.docx,.doc"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Send className="h-4 w-4 mr-2" /> Enviar Currículo
            </Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
};

export default TrabalheConosco;
