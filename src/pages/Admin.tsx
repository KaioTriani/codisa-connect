import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LayoutDashboard, Package, Upload, LogOut, Menu, X, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import Dashboard from "@/components/admin/Dashboard";
import EstoqueImport from "@/components/admin/EstoqueImport";

type Tab = "dashboard" | "estoque";

const Admin = () => {
  const { isAdmin, loading, signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin h-8 w-8 rounded-full border-2 border-secondary border-t-transparent" /></div>;
  if (!isAdmin) return <Navigate to="/" replace />;

  const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "estoque", label: "Importar Estoque", icon: Upload },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static z-50 h-full lg:h-auto w-64 bg-card border-r border-border transition-transform flex flex-col`}>
        <div className="p-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-secondary-foreground font-heading font-black">C</span>
            </div>
            <div>
              <p className="font-heading font-black text-sm text-foreground">CODISA Admin</p>
              <p className="text-xs text-muted-foreground">Painel Administrativo</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${tab === item.id ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-destructive" onClick={signOut}>
            <LogOut className="h-4 w-4 mr-2" /> Sair
          </Button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-6 py-3 flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-secondary" />
            <span className="font-heading font-bold text-foreground text-sm">
              {navItems.find((i) => i.id === tab)?.label}
            </span>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          {tab === "dashboard" && <Dashboard />}
          {tab === "estoque" && <EstoqueImport />}
        </div>
      </main>
    </div>
  );
};

export default Admin;
