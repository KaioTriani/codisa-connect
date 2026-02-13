import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground font-heading font-black text-sm">C</span>
              </div>
              <span className="font-heading font-bold text-lg">CODISA</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Atacadista distribuidor com mais de 25 anos de experiência, oferecendo os melhores preços e condições para o seu negócio na Paraíba.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {[
                { label: "Sobre Nós", path: "/sobre" },
                { label: "Produtos", path: "/produtos" },
                { label: "Fornecedores", path: "/fornecedores" },
                { label: "Trabalhe Conosco", path: "/trabalhe-conosco" },
                { label: "Contato", path: "/contato" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <Phone className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
                <div>
                  <a href="tel:+558332312333" className="hover:text-secondary transition-colors block">(83) 3231-2333</a>
                  <a href="tel:+558332317700" className="hover:text-secondary transition-colors block">(83) 3231-7700</a>
                </div>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Instagram className="h-4 w-4 text-secondary shrink-0" />
                <a href="https://instagram.com/codisaatacadista" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">
                  @codisaatacadista
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-heading font-bold text-sm uppercase tracking-wider mb-4">Endereço</h3>
            <div className="flex items-start gap-2 text-sm text-primary-foreground/70">
              <MapPin className="h-4 w-4 mt-0.5 text-secondary shrink-0" />
              <p>
                Rua Manoel Rufino da Silva, 2.250<br />
                João Paulo II<br />
                João Pessoa – PB<br />
                CEP 58.076-005
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary-foreground/70 mt-3">
              <Clock className="h-4 w-4 text-secondary shrink-0" />
              <p>Seg a Sex: 7h às 17h<br />Sáb: 7h às 12h</p>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-10 pt-6 text-center">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} CODISA Atacadista Distribuidor — CDS Atacadista Distribuidor LTDA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
