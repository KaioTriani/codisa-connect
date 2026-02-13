import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

const Carrinho = () => {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return "";
    let msg = "Olá, gostaria de fazer o seguinte pedido:\n\n";
    items.forEach((item) => {
      const price = item.product.promoPrice || item.product.wholesalePrice;
      msg += `• ${item.product.name} — ${item.quantity}x (R$ ${(price * item.quantity).toFixed(2)})\n`;
    });
    msg += `\n💰 Total estimado: R$ ${total.toFixed(2)}`;
    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/558332312333?text=${generateWhatsAppMessage()}`;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Seu carrinho está vazio</h1>
        <p className="text-muted-foreground mb-6">Adicione produtos do nosso catálogo</p>
        <Link to="/produtos">
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            <ArrowLeft className="h-4 w-4 mr-2" /> Ver Catálogo
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-primary py-10">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl font-black text-primary-foreground">Carrinho ({itemCount} itens)</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items */}
          <div className="flex-1 space-y-3">
            {items.map((item) => {
              const price = item.product.promoPrice || item.product.wholesalePrice;
              return (
                <div key={item.product.id} className="bg-card border border-border rounded-lg p-4 flex gap-4 items-center">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded object-cover" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-sm text-card-foreground truncate">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.product.brand} • {item.product.packaging}</p>
                    <p className="text-sm font-bold text-secondary mt-1">R$ {price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="font-heading font-bold text-sm w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="font-heading font-bold text-foreground w-24 text-right">R$ {(price * item.quantity).toFixed(2)}</p>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => removeItem(item.product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:w-80">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="font-heading font-bold text-lg text-card-foreground mb-4">Resumo do Pedido</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Itens ({itemCount})</span>
                  <span className="text-foreground">R$ {total.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-heading font-bold text-foreground">Total Estimado</span>
                  <span className="font-heading font-black text-xl text-secondary">R$ {total.toFixed(2)}</span>
                </div>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button className="w-full bg-[hsl(142,70%,45%)] hover:bg-[hsl(142,70%,40%)] text-white font-heading font-bold" size="lg">
                  <MessageCircle className="h-5 w-5 mr-2" /> Enviar pelo WhatsApp
                </Button>
              </a>
              <Button variant="ghost" className="w-full mt-2 text-destructive hover:text-destructive" onClick={clearCart}>
                Limpar Carrinho
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
