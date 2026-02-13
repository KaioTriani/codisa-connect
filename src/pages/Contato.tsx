import { useState } from "react";
import { Phone, Mail, MapPin, Instagram, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const Contato = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Erro", description: "Preencha todos os campos obrigatórios.", variant: "destructive" });
      return;
    }
    toast({ title: "Mensagem enviada!", description: "Entraremos em contato em breve." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl font-black text-primary-foreground mb-3">Contato</h1>
          <p className="text-primary-foreground/70">Fale conosco! Estamos prontos para atender você.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Envie uma mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome *</Label>
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
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} maxLength={1000} />
                </div>
                <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Send className="h-4 w-4 mr-2" /> Enviar Mensagem
                </Button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Informações</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Telefones</p>
                    <a href="tel:+558332312333" className="text-muted-foreground hover:text-secondary text-sm block">(83) 3231-2333</a>
                    <a href="tel:+558332317700" className="text-muted-foreground hover:text-secondary text-sm block">(83) 3231-7700</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">WhatsApp</p>
                    <a href="https://wa.me/558332312333" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary text-sm">(83) 3231-2333</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Instagram</p>
                    <a href="https://instagram.com/codisaatacadista" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-secondary text-sm">@codisaatacadista</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary mt-0.5" />
                  <div>
                    <p className="font-bold text-foreground text-sm">Endereço</p>
                    <p className="text-muted-foreground text-sm">
                      Rua Manoel Rufino da Silva, 2.250<br />
                      João Paulo II — João Pessoa, PB<br />
                      CEP 58.076-005
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden border border-border mt-6">
                <iframe
                  title="CODISA Localização"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8!2d-34.87!3d-7.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDknMDAuMCJTIDM0wrA1MicxMi4wIlc!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;
