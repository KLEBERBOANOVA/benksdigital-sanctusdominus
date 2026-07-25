import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Loader2, MessageCircle, Trash2, Search, RefreshCw, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminNav } from "@/components/site/AdminNav";

type WhatsappOrder = {
  id: string;
  created_at: string;
  status: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  address_postal_code: string | null;
  address_street: string | null;
  address_number: string | null;
  address_complement: string | null;
  address_district: string | null;
  address_city: string | null;
  address_state_abbr: string | null;
  product_slug: string | null;
  product_name: string;
  product_size: string | null;
  product_color: string | null;
  product_price: string | null;
  product_price_pix: string | null;
  shipping_service: string | null;
  shipping_price: string | null;
  shipping_deadline: string | null;
  message: string | null;
};

const STATUSES = ["novo", "em atendimento", "pago", "enviado", "concluído", "cancelado"];

export const Route = createFileRoute("/_authenticated/admin/whatsapp")({
  head: () => ({
    meta: [{ title: "Pedidos WhatsApp | Painel Sanctus Dominus" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminWhatsappPage,
});

function AdminWhatsappPage() {
  const [rows, setRows] = useState<WhatsappOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("todos");

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("whatsapp_orders" as never)
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setMsg(`Falha ao carregar pedidos: ${error.message}`);
    setRows((data as WhatsappOrder[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return rows.filter(
      (r) =>
        (status === "todos" || r.status === status) &&
        (!term ||
          [r.customer_name, r.customer_phone, r.customer_email, r.product_name, r.address_city]
            .join(" ")
            .toLowerCase()
            .includes(term))
    );
  }, [rows, q, status]);

  async function updateStatus(id: string, value: string) {
    const { error } = await supabase.from("whatsapp_orders" as never).update({ status: value } as never).eq("id", id);
    if (error) setMsg(`Falha ao atualizar: ${error.message}`);
    await load();
  }

  async function remove(id: string) {
    if (!confirm("Excluir este pedido do painel?")) return;
    const { error } = await supabase.from("whatsapp_orders" as never).delete().eq("id", id);
    if (error) setMsg(`Falha ao excluir: ${error.message}`);
    await load();
  }

  return (
    <section className="min-h-screen px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminNav />

        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 font-display text-4xl text-foreground">
              <MessageCircle className="h-8 w-8 text-gold" /> Pedidos via WhatsApp
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Todos os pedidos enviados pelo site, com dados completos do cliente.
            </p>
          </div>
          <button
            onClick={load}
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs uppercase tracking-wider hover:border-gold hover:text-gold"
          >
            <RefreshCw className="h-4 w-4" /> Atualizar
          </button>
        </header>

        {msg && <p className="mt-4 rounded-lg border border-gold/40 bg-gold/10 p-3 text-sm">{msg}</p>}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por cliente, telefone, produto, cidade…"
              className="h-8 w-full bg-transparent text-sm outline-none"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-10 rounded-full border border-border bg-background px-4 text-sm"
          >
            <option value="todos">Todos os status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <span className="text-xs text-muted-foreground">{filtered.length} pedidos</span>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Carregando pedidos…
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground">Nenhum pedido registrado ainda.</p>
          ) : (
            <ul className="space-y-4">
              {filtered.map((o) => (
                <li key={o.id} className="rounded-lg border border-border bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl text-foreground">{o.customer_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(o.created_at).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={o.status}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        className="h-9 rounded-full border border-border bg-background px-3 text-xs uppercase tracking-wider"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <a
                        href={`https://wa.me/55${o.customer_phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-2 text-[11px] uppercase tracking-wider hover:border-gold hover:text-gold"
                      >
                        <MessageCircle className="h-3.5 w-3.5" /> Falar
                      </a>
                      <button
                        onClick={() => remove(o.id)}
                        aria-label="Excluir pedido"
                        className="inline-flex items-center rounded-full border border-border px-3 py-2 hover:border-bordeaux hover:text-bordeaux"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 text-sm md:grid-cols-3">
                    <Block title="Cliente">
                      <p>{o.customer_phone}</p>
                      {o.customer_email && <p className="break-all">{o.customer_email}</p>}
                    </Block>
                    <Block title="Entrega">
                      <p>
                        {o.address_street}, {o.address_number}
                        {o.address_complement ? ` — ${o.address_complement}` : ""}
                      </p>
                      <p>{o.address_district}</p>
                      <p>
                        {o.address_city}/{o.address_state_abbr} · CEP {o.address_postal_code}
                      </p>
                    </Block>
                    <Block title="Produto">
                      <p>{o.product_name}</p>
                      <p className="text-muted-foreground">
                        Tamanho {o.product_size ?? "—"}
                        {o.product_color ? ` · ${o.product_color}` : ""}
                      </p>
                      <p>
                        {o.product_price} {o.product_price_pix ? `· Pix ${o.product_price_pix}` : ""}
                      </p>
                      <p className="text-muted-foreground">
                        Frete: {o.shipping_service ?? "a calcular"}
                        {o.shipping_price ? ` — ${o.shipping_price}` : ""}
                        {o.shipping_deadline ? ` (${o.shipping_deadline})` : ""}
                      </p>
                    </Block>
                  </div>

                  {o.message && (
                    <details className="mt-4">
                      <summary className="cursor-pointer text-xs uppercase tracking-wider text-gold">
                        Ver mensagem enviada
                      </summary>
                      <pre className="mt-2 max-h-64 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-3 text-xs">
                        {o.message}
                      </pre>
                      <button
                        onClick={() => navigator.clipboard.writeText(o.message ?? "")}
                        className="mt-2 inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-[11px] uppercase tracking-wider hover:border-gold hover:text-gold"
                      >
                        <Copy className="h-3 w-3" /> Copiar
                      </button>
                    </details>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-muted/30 p-4">
      <p className="mb-2 text-[11px] uppercase tracking-wider text-gold">{title}</p>
      <div className="space-y-1 text-foreground/90">{children}</div>
    </div>
  );
}
