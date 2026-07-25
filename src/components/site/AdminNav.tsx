import { Link, useNavigate } from "@tanstack/react-router";
import { LogOut, Package, MessageCircle, Shirt, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const tabs = [
  { to: "/admin/produtos", label: "Produtos", icon: Shirt },
  { to: "/admin/whatsapp", label: "Pedidos WhatsApp", icon: MessageCircle },
  { to: "/admin/pedidos", label: "Pedidos & Etiquetas", icon: Package },
] as const;

export function AdminNav() {
  const navigate = useNavigate();

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
      <nav className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            activeProps={{ className: "bg-navy-deep text-cream border-navy-deep" }}
            inactiveProps={{ className: "border-border text-foreground hover:border-gold hover:text-gold" }}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors"
          >
            <t.icon className="h-3.5 w-3.5" /> {t.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wider hover:border-gold hover:text-gold"
        >
          <Home className="h-3.5 w-3.5" /> Site
        </Link>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wider hover:border-bordeaux hover:text-bordeaux"
        >
          <LogOut className="h-3.5 w-3.5" /> Sair
        </button>
      </div>
    </div>
  );
}
