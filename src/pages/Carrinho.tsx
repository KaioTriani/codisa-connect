import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft, MessageCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

const Carrinho = () => {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();

  const generateWhatsAppMessage = () => {
    if (items.length === 0) return "";
    let msg = "Olá, gostaria de fazer o seguinte pedido:\n\n";
    items.forEach((item) => {
      const unitPrice = item.product.promoPrice || item.product.wholesalePrice;
      const boxTotal = unitPrice * item.product.unitsPerBox * item.quantity;
      msg += `• ${item.product.name}\n  ${item.quantity}x caixa (${item.product.unitsPerBox}un/cx) — R$ ${boxTotal.toFixed(2)}\n`;
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
          <h1 className="font-heading text-3xl font-black text-primary-foreground">Carrinho ({itemCount} caixa{itemCount !== 1 ? "s" : ""})</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items */}
          <div className="flex-1 space-y-3">
            {items.map((item) => {
              const unitPrice = item.product.promoPrice || item.product.wholesalePrice;
              const boxPrice = unitPrice * item.product.unitsPerBox;
              const lineTotal = boxPrice * item.quantity;

              return (
                <div key={item.product.id} className="bg-card border border-border rounded-lg p-4 flex gap-4 items-start">
                  <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-bold text-sm text-card-foreground truncate">{item.product.name}</h3>
                    <p className="text-xs text-muted-foreground">{item.product.brand} • {item.product.packaging}</p>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs text-muted-foreground">R$ {unitPrice.toFixed(2)}/un</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs font-semibold text-foreground bg-muted rounded px-2 py-0.5 flex items-center gap-1">
                        <Package className="h-3 w-3" /> R$ {boxPrice.toFixed(2)}/cx ({item.product.unitsPerBox}un)
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="font-heading font-bold text-sm w-6 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <span className="text-xs text-muted-foreground ml-1">cx</span>
                    </div>
                    <p className="font-heading font-bold text-foreground text-sm">R$ {lineTotal.toFixed(2)}</p>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => removeItem(item.product.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="lg:w-80">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="font-heading font-bold text-lg text-card-foreground mb-4">Resumo do Pedido</h2>
              <div className="space-y-2 mb-4">
                {items.map((item) => {
                  const unitPrice = item.product.promoPrice || item.product.wholesalePrice;
                  const lineTotal = unitPrice * item.product.unitsPerBox * item.quantity;
                  return (
                    <div key={item.product.id} className="flex justify-between text-xs">
                      <span className="text-muted-foreground truncate mr-2">{item.product.name} ({item.quantity}cx)</span>
                      <span className="text-foreground shrink-0">R$ {lineTotal.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-heading font-bold text-foreground">Total Estimado</span>
                  <span className="font-heading font-black text-xl text-secondary">R$ {total.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{itemCount} caixa{itemCount !== 1 ? "s" : ""} • {items.reduce((s, i) => s + i.quantity * i.product.unitsPerBox, 0)} unidades</p>
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
