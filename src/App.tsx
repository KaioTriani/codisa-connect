import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/useCart";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Produtos from "./pages/Produtos";
import Combos from "./pages/Combos";
import Fornecedores from "./pages/Fornecedores";
import TrabalheConosco from "./pages/TrabalheConosco";
import Contato from "./pages/Contato";
import Carrinho from "./pages/Carrinho";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Admin (sem layout público) */}
              <Route path="/admin" element={<Admin />} />
              {/* Rotas públicas */}
              <Route path="/*" element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/produtos" element={<Produtos />} />
                    <Route path="/combos" element={<Combos />} />
                    <Route path="/fornecedores" element={<Fornecedores />} />
                    <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/carrinho" element={<Carrinho />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              } />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
