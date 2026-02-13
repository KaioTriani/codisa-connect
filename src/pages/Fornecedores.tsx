import { motion } from "framer-motion";
import { suppliers } from "@/data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

const Fornecedores = () => {
  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl font-black text-primary-foreground mb-3">Nossos Fornecedores</h1>
          <p className="text-primary-foreground/70 max-w-xl">Trabalhamos com as melhores e mais confiáveis marcas do mercado brasileiro.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {suppliers.map((s, i) => (
              <motion.div
                key={s.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card border border-border rounded-lg p-8 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:border-secondary/50 transition-all cursor-pointer"
              >
                <span className="text-5xl">{s.logo}</span>
                <span className="font-heading font-bold text-card-foreground">{s.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Fornecedores;
