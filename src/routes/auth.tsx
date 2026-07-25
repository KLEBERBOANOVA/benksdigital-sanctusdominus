import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Acesso restrito | Sanctus Dominus" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin/pedidos" });
    });
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError("E-mail ou senha inválidos."); return; }
    navigate({ to: "/admin/pedidos" });
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5 py-16">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-elegant">
        <h1 className="font-display text-3xl text-foreground">Área administrativa</h1>
        <p className="mt-2 text-sm text-muted-foreground">Acesso exclusivo para gestão de pedidos e etiquetas.</p>

        <label className="mt-6 block text-xs uppercase tracking-wider text-muted-foreground">E-mail</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="mt-2 h-11 w-full rounded-full border border-border bg-background px-4 text-sm focus:outline-none focus:border-gold" />

        <label className="mt-4 block text-xs uppercase tracking-wider text-muted-foreground">Senha</label>
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
          className="mt-2 h-11 w-full rounded-full border border-border bg-background px-4 text-sm focus:outline-none focus:border-gold" />

        {error && <p className="mt-4 text-sm text-bordeaux">{error}</p>}

        <button type="submit" disabled={loading}
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-navy-deep px-6 py-3 text-xs uppercase tracking-wider font-semibold text-cream hover:bg-bordeaux transition-colors disabled:opacity-60">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Entrar
        </button>
      </form>
    </section>
  );
}
