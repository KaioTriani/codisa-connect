import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, Truck, Shield, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { products, categories, suppliers } from "@/data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Index = () => {
  const featuredProducts = products.filter((p) => p.promoPrice && p.active).slice(0, 8);
  const newProducts = products.filter((p) => p.category === "lancamentos" && p.active);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-medium mb-4"
            >
              Há mais de 25 anos no mercado
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl font-black text-primary-foreground leading-tight mb-4"
            >
              Melhores preços e{" "}
              <span className="text-secondary">condições!</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-primary-foreground/70 text-lg mb-8 max-w-lg"
            >
              Distribuidor atacadista de alimentos, limpeza, refrigerados e bebidas na Paraíba. Atendendo todo o estado com qualidade e agilidade.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <Link to="/produtos">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-heading font-bold text-base">
                  <ShoppingCart className="h-5 w-5 mr-2" /> Ver Catálogo
                </Button>
              </Link>
              <Link to="/contato">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-heading font-bold text-base">
                  Fale Conosco <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Truck, text: "Entrega em toda Paraíba" },
              { icon: Shield, text: "Compra segura" },
              { icon: Clock, text: "Atendimento ágil" },
              { icon: ShoppingCart, text: "Pedido via WhatsApp" },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex items-center gap-3 justify-center py-2"
              >
                <item.icon className="h-5 w-5 text-secondary shrink-0" />
                <span className="text-sm font-medium text-foreground">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Nossas Categorias</h2>
            <p className="text-muted-foreground">Encontre tudo o que precisa para o seu negócio</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link
                  to={`/produtos?categoria=${cat.id}`}
                  className="block bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg hover:border-secondary/50 transition-all group"
                >
                  <span className="text-4xl block mb-3">{cat.icon}</span>
                  <span className="font-heading font-bold text-sm text-card-foreground group-hover:text-secondary transition-colors">{cat.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-1">Ofertas em Destaque</h2>
              <p className="text-muted-foreground">Aproveite os melhores preços</p>
            </div>
            <Link to="/produtos" className="hidden md:flex items-center gap-1 text-secondary font-medium hover:underline">
              Ver todos <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.promoPrice && (
                    <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
                      OFERTA
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                  <h3 className="font-heading font-bold text-sm text-card-foreground line-clamp-2 mb-2 min-h-[2.5rem]">{product.name}</h3>
                  <div className="flex items-baseline gap-2">
                    {product.promoPrice && (
                      <span className="text-xs text-muted-foreground line-through">
                        R$ {product.wholesalePrice.toFixed(2)}
                      </span>
                    )}
                    <span className="text-lg font-heading font-black text-secondary">
                      R$ {(product.promoPrice || product.wholesalePrice).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{product.packaging} • Cx c/ {product.unitsPerBox}un</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Link to="/produtos">
              <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                Ver todos os produtos <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Products */}
      {newProducts.length > 0 && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <span className="inline-block bg-secondary/10 text-secondary text-sm font-bold px-4 py-1 rounded-full mb-3">🆕 Novidades</span>
              <h2 className="font-heading text-3xl font-bold text-foreground">Lançamentos</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-1">{product.brand}</p>
                    <h3 className="font-heading font-bold text-sm text-card-foreground mb-2">{product.name}</h3>
                    <span className="text-lg font-heading font-black text-secondary">
                      R$ {(product.promoPrice || product.wholesalePrice).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Suppliers */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-2">Marcas Parceiras</h2>
            <p className="text-muted-foreground">Trabalhamos com as melhores marcas do mercado</p>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-5 gap-4">
            {suppliers.map((s, i) => (
              <motion.div
                key={s.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-card border border-border rounded-lg p-4 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow"
              >
                <span className="text-3xl">{s.logo}</span>
                <span className="text-xs font-heading font-bold text-card-foreground">{s.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary/80">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-primary-foreground mb-4">
              Faça seu pedido agora!
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-md mx-auto">
              Monte seu pedido pelo nosso catálogo e envie direto pelo WhatsApp. Rápido, fácil e sem complicação.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link to="/produtos">
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-heading font-bold">
                  <ShoppingCart className="h-5 w-5 mr-2" /> Acessar Catálogo
                </Button>
              </Link>
              <a href="https://wa.me/558332312333" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-heading font-bold">
                  WhatsApp Direto
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
