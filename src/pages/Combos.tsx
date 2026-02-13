import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/hooks/useCart";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }),
};

const Combos = () => {
  const combos = products.filter((p) => p.category === "combos" && p.active);
  const { addItem } = useCart();

  return (
    <div>
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-4xl font-black text-primary-foreground mb-3">Combos Promocionais</h1>
          <p className="text-primary-foreground/70">Kits especiais com preços imbatíveis para o seu negócio.</p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {combos.map((combo, i) => (
              <motion.div
                key={combo.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card border-2 border-secondary/20 rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-muted overflow-hidden">
                  <img src={combo.image} alt={combo.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full mb-3">COMBO</span>
                  <h3 className="font-heading font-bold text-lg text-card-foreground mb-2">{combo.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{combo.description}</p>
                  <div className="flex items-baseline gap-2 mb-4">
                    {combo.promoPrice && (
                      <span className="text-sm text-muted-foreground line-through">R$ {combo.wholesalePrice.toFixed(2)}</span>
                    )}
                    <span className="text-2xl font-heading font-black text-secondary">
                      R$ {(combo.promoPrice || combo.wholesalePrice).toFixed(2)}
                    </span>
                  </div>
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => addItem(combo)}>
                    <ShoppingCart className="h-4 w-4 mr-2" /> Adicionar ao Carrinho
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Combos;
