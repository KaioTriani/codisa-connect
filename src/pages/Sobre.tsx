import { MapPin, Target, Eye, Heart, Award, Users, Truck } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Sobre = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl font-black text-primary-foreground mb-3">
            Sobre a CODISA
          </motion.h1>
          <p className="text-primary-foreground/70 max-w-xl">Mais de 25 anos distribuindo qualidade e confiança na Paraíba.</p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Nossa História</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Fundada em 03 de dezembro de 1999, a <strong className="text-foreground">CDS Atacadista Distribuidor LTDA</strong>, conhecida como CODISA, nasceu com a missão de levar os melhores produtos com os melhores preços e condições para comerciantes de toda a Paraíba.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Com mais de 25 anos de experiência no mercado atacadista, a CODISA se consolidou como referência em distribuição, atendendo milhares de clientes com um portfólio diversificado que inclui alimentos, produtos de limpeza, refrigerados, bebidas e muito mais.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Localizada em João Pessoa, no bairro João Paulo II, a empresa conta com uma estrutura logística moderna para atender com agilidade e eficiência todo o estado da Paraíba e regiões próximas.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Target, title: "Missão", text: "Distribuir produtos de qualidade com os melhores preços e condições, contribuindo para o sucesso dos nossos clientes e parceiros comerciais." },
              { icon: Eye, title: "Visão", text: "Ser a distribuidora atacadista mais confiável e eficiente da Paraíba, reconhecida pela excelência no atendimento e compromisso com o desenvolvimento regional." },
              { icon: Heart, title: "Valores", text: "Ética, transparência, compromisso com o cliente, qualidade dos produtos, agilidade na entrega e responsabilidade social." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card border border-border rounded-lg p-6"
              >
                <item.icon className="h-8 w-8 text-secondary mb-3" />
                <h3 className="font-heading font-bold text-lg text-card-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            {[
              { icon: Award, value: "25+", label: "Anos de experiência" },
              { icon: Users, value: "5.000+", label: "Clientes atendidos" },
              { icon: Truck, value: "100+", label: "Municípios atendidos" },
              { icon: MapPin, value: "1", label: "Estado de atuação" },
            ].map((stat, i) => (
              <motion.div key={stat.label} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <stat.icon className="h-6 w-6 text-secondary mx-auto mb-2" />
                <p className="font-heading text-3xl font-black text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-2xl font-bold text-foreground text-center mb-8">Nossa Localização</h2>
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden border border-border shadow-lg">
            <iframe
              title="CODISA Localização"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8!2d-34.87!3d-7.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMDknMDAuMCJTIDM0wrA1MicxMi4wIlc!5e0!3m2!1spt-BR!2sbr!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            <MapPin className="inline h-4 w-4 text-secondary mr-1" />
            Rua Manoel Rufino da Silva, 2.250 — João Paulo II — João Pessoa, PB — CEP 58.076-005
          </p>
        </div>
      </section>
    </div>
  );
};

export default Sobre;
