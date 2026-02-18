import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, ShoppingCart, X, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { products, categories } from "@/data/products";
import { useCart } from "@/hooks/useCart";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }),
};

const Produtos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("categoria") || "");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();

  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (!p.active) return false;
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedBrand && p.brand !== selectedBrand) return false;
      if (search) {
        const q = search.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.code.toLowerCase().includes(q);
      }
      return true;
    });
  }, [search, selectedCategory, selectedBrand]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedBrand("");
    setSearchParams({});
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-black text-primary-foreground mb-2">Catálogo de Produtos</h1>
          <p className="text-primary-foreground/70">Encontre os melhores produtos com preços atacadistas</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, marca ou código..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
            <Filter className="h-4 w-4 mr-2" /> Filtros
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-56 shrink-0`}>
            <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-sm">Filtros</h3>
                {(selectedCategory || selectedBrand) && (
                  <button onClick={clearFilters} className="text-xs text-destructive hover:underline flex items-center gap-1">
                    <X className="h-3 w-3" /> Limpar
                  </button>
                )}
              </div>

              <div className="mb-4">
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Categoria</p>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(selectedCategory === cat.id ? "" : cat.id); setSearchParams(selectedCategory === cat.id ? {} : { categoria: cat.id }); }}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${selectedCategory === cat.id ? "bg-secondary text-secondary-foreground" : "hover:bg-muted text-foreground"}`}
                    >
                      {cat.icon} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-muted-foreground uppercase mb-2">Marca</p>
                <div className="space-y-1 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(selectedBrand === brand ? "" : brand)}
                      className={`w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors ${selectedBrand === brand ? "bg-secondary text-secondary-foreground" : "hover:bg-muted text-foreground"}`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} produto(s) encontrado(s)</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((product, i) => {
                const unitPrice = product.promoPrice || product.wholesalePrice;
                const boxTotal = unitPrice * product.unitsPerBox;
                const esgotado = product.stock <= 0;

                return (
                  <motion.div
                    key={product.id}
                    custom={i % 12}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
                  >
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      {product.promoPrice && !esgotado && (
                        <span className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">OFERTA</span>
                      )}
                      {esgotado && (
                        <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
                          <span className="bg-foreground text-background text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">Esgotado</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground">{product.brand} • <span className="font-mono">{product.code}</span></p>
                      <h3 className="font-heading font-bold text-sm text-card-foreground line-clamp-2 mb-2 min-h-[2.5rem]">{product.name}</h3>

                      {/* B2B Price Display */}
                      <div className="mb-2 space-y-0.5">
                        {product.promoPrice && (
                          <p className="text-xs text-muted-foreground line-through">R$ {product.wholesalePrice.toFixed(2)} / un.</p>
                        )}
                        <p className="text-base font-heading font-black text-secondary">
                          R$ {unitPrice.toFixed(2)} <span className="text-xs font-medium text-muted-foreground">/ un.</span>
                        </p>
                        <p className="text-xs font-semibold text-foreground bg-muted rounded px-2 py-0.5 inline-block">
                          R$ {boxTotal.toFixed(2)} / caixa ({product.unitsPerBox}un)
                        </p>
                      </div>

                      <p className="text-xs text-muted-foreground mb-3">{product.packaging}</p>

                      <Button
                        size="sm"
                        className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 disabled:opacity-50"
                        onClick={() => !esgotado && addItem(product)}
                        disabled={esgotado}
                      >
                        {esgotado ? (
                          <><Package className="h-4 w-4 mr-1" /> Esgotado</>
                        ) : (
                          <><ShoppingCart className="h-4 w-4 mr-1" /> Adicionar caixa</>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">Nenhum produto encontrado.</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>Limpar filtros</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Produtos;
