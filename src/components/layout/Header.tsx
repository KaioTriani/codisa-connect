import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogIn, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Sobre Nós", path: "/sobre" },
  { label: "Produtos", path: "/produtos" },
  { label: "Combos", path: "/combos" },
  { label: "Fornecedores", path: "/fornecedores" },
  { label: "Trabalhe Conosco", path: "/trabalhe-conosco" },
  { label: "Contato", path: "/contato" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();
  const { itemCount } = useCart();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-secondary-foreground font-heading font-black text-lg">C</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-black text-xl text-primary-foreground tracking-wider">CODISA</span>
            <span className="text-[10px] text-primary-foreground/70 font-medium tracking-widest uppercase -mt-1">Atacadista Distribuidor</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.path
                  ? "bg-secondary text-secondary-foreground"
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/carrinho" className="relative">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Button>
          </Link>
          {isAdmin && (
            <Link to="/admin">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Shield className="h-4 w-4 mr-1" /> Admin
              </Button>
            </Link>
          )}
          {user ? (
            <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-1" /> Sair
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <LogIn className="h-4 w-4 mr-1" /> Entrar
                </Button>
              </Link>
              <Link to="/cadastro">
                <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <User className="h-4 w-4 mr-1" /> Cadastre-se
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <Link to="/carrinho" className="relative">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Button>
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-primary-foreground p-2">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-primary border-t border-primary-foreground/10 overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? "bg-secondary text-secondary-foreground"
                      : "text-primary-foreground/80 hover:bg-primary-foreground/10"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {isAdmin && (
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-md text-sm font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Painel Admin
                </Link>
              )}
              <div className="flex gap-2 mt-3 pt-3 border-t border-primary-foreground/10">
                {user ? (
                  <Button variant="outline" className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" onClick={() => { handleSignOut(); setMobileOpen(false); }}>
                    <LogOut className="h-4 w-4 mr-1" /> Sair
                  </Button>
                ) : (
                  <>
                    <Link to="/login" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button variant="outline" className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                        <LogIn className="h-4 w-4 mr-1" /> Entrar
                      </Button>
                    </Link>
                    <Link to="/cadastro" className="flex-1" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                        <User className="h-4 w-4 mr-1" /> Cadastre-se
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
