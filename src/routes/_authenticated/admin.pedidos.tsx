import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { calcularFrete, type ShippingOption } from "@/lib/melhor-envio.functions";
import { emitirEtiqueta, meSaldo } from "@/lib/melhor-envio-admin.functions";
import { Loader2, Package, Plus, RefreshCw, ExternalLink, LogOut, Search, Truck } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/pedidos")({
  head: () => ({ meta: [{ title: "Pedidos | Sanctus Dominus" }, { name: "robots", content: "noindex" }] }),
  component: PedidosPage,
});

type Order = {
  id: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  customer_document: string;
  address_postal_code: string;
  address_street: string;
  address_number: string;
  address_complement: string | null;
  address_district: string;
  address_city: string;
  address_state_abbr: string;
  product_name: string;
  product_size: string | null;
  product_price: number;
  product_quantity: number;
  shipping_service_id: number | null;
  shipping_service_name: string | null;
  shipping_company: string | null;
  shipping_price: number | null;
  shipping_deadline: number | null;
  me_cart_id: string | null;
  me_order_id: string | null;
  me_label_url: string | null;
  me_tracking: string | null;
  status: string;
  notes: string | null;
  created_at: string;
};

const emptyForm = {
  customer_name: "", customer_email: "", customer_phone: "", customer_document: "",
  address_postal_code: "", address_street: "", address_number: "", address_complement: "",
  address_district: "", address_city: "", address_state_abbr: "",
  product_name: "", product_size: "", product_price: "", product_quantity: "1",
  notes: "",
};

function formatCurrency(v: number | string | null | undefined) {
  const n = typeof v === "number" ? v : Number(v ?? 0);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function PedidosPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [saldo, setSaldo] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from("orders" as any).select("*").order("created_at", { ascending: false });
    if (!error && data) setOrders(data as unknown as Order[]);
    setLoading(false);
  }

  async function loadSaldo() {
    try { const s = await meSaldo(); setSaldo(s.balance); } catch { setSaldo(null); }
  }

  useEffect(() => { load(); loadSaldo(); }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/auth";
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setMsg(null);
    const { data: { user } } = await supabase.auth.getUser();
    const payload = {
      ...form,
      customer_email: form.customer_email || null,
      customer_phone: form.customer_phone || null,
      address_complement: form.address_complement || null,
      product_size: form.product_size || null,
      product_price: Number(form.product_price.replace(",", ".")),
      product_quantity: Number(form.product_quantity) || 1,
      address_postal_code: form.address_postal_code.replace(/\D/g, ""),
      customer_document: form.customer_document.replace(/\D/g, ""),
      address_state_abbr: form.address_state_abbr.toUpperCase(),
      notes: form.notes || null,
      created_by: user?.id ?? null,
    };
    const { error } = await supabase.from("orders" as any).insert(payload as any);
    setCreating(false);
    if (error) { setMsg(`Erro ao salvar: ${error.message}`); return; }
    setForm(emptyForm);
    setShowForm(false);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("Excluir este pedido? Esta ação não pode ser desfeita.")) return;
    const { error } = await supabase.from("orders" as any).delete().eq("id", id);
    if (error) { alert(error.message); return; }
    load();
  }

  async function handleEmit(id: string) {
    if (!confirm("Confirmar emissão da etiqueta? Isso irá debitar o saldo da sua conta Melhor Envio.")) return;
    setBusyId(id);
    setMsg(null);
    try {
      const res = await emitirEtiqueta({ data: { orderId: id } });
      setMsg(res.alreadyIssued ? "Etiqueta já havia sido emitida." : "Etiqueta emitida com sucesso!");
      if (res.url) window.open(res.url, "_blank", "noopener,noreferrer");
      await load();
      await loadSaldo();
    } catch (err) {
      setMsg(`Falha na emissão: ${err instanceof Error ? err.message : "erro desconhecido"}`);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <section className="min-h-screen px-5 lg:px-8 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-foreground flex items-center gap-3"><Package className="h-8 w-8 text-gold" /> Pedidos & Etiquetas</h1>
            <p className="mt-1 text-sm text-muted-foreground">Cadastre pedidos manuais e emita etiquetas via Melhor Envio.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full border border-border bg-muted/40 px-4 py-2 text-xs">
              Saldo ME: <strong className="text-bordeaux">{saldo !== null ? formatCurrency(saldo) : "—"}</strong>
              <button onClick={loadSaldo} className="ml-2 text-gold hover:text-bordeaux" aria-label="Atualizar saldo"><RefreshCw className="inline h-3 w-3" /></button>
            </div>
            <button onClick={handleSignOut} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wider hover:border-bordeaux hover:text-bordeaux">
              <LogOut className="h-3 w-3" /> Sair
            </button>
          </div>
        </header>

        {msg && <p className="mt-4 rounded-lg border border-gold/40 bg-gold/10 p-3 text-sm text-foreground">{msg}</p>}

        <div className="mt-6 flex justify-end">
          <button onClick={() => setShowForm((v) => !v)} className="inline-flex items-center gap-2 rounded-full bg-navy-deep px-5 py-2 text-xs uppercase tracking-wider font-semibold text-cream hover:bg-bordeaux">
            <Plus className="h-4 w-4" /> {showForm ? "Cancelar" : "Novo pedido"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreate} className="mt-4 rounded-lg border border-border bg-card p-6 shadow-elegant">
            <h2 className="font-display text-2xl text-foreground">Cadastrar pedido</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Nome do cliente *" value={form.customer_name} onChange={(v) => setForm({ ...form, customer_name: v })} required />
              <Field label="CPF/CNPJ *" value={form.customer_document} onChange={(v) => setForm({ ...form, customer_document: v })} required />
              <Field label="E-mail" type="email" value={form.customer_email} onChange={(v) => setForm({ ...form, customer_email: v })} />
              <Field label="Telefone" value={form.customer_phone} onChange={(v) => setForm({ ...form, customer_phone: v })} />
              <Field label="CEP *" value={form.address_postal_code} onChange={(v) => setForm({ ...form, address_postal_code: v })} required />
              <Field label="Rua *" value={form.address_street} onChange={(v) => setForm({ ...form, address_street: v })} required />
              <Field label="Número *" value={form.address_number} onChange={(v) => setForm({ ...form, address_number: v })} required />
              <Field label="Complemento" value={form.address_complement} onChange={(v) => setForm({ ...form, address_complement: v })} />
              <Field label="Bairro *" value={form.address_district} onChange={(v) => setForm({ ...form, address_district: v })} required />
              <Field label="Cidade *" value={form.address_city} onChange={(v) => setForm({ ...form, address_city: v })} required />
              <Field label="UF *" value={form.address_state_abbr} onChange={(v) => setForm({ ...form, address_state_abbr: v })} required maxLength={2} />
              <Field label="Produto *" value={form.product_name} onChange={(v) => setForm({ ...form, product_name: v })} required />
              <Field label="Tamanho" value={form.product_size} onChange={(v) => setForm({ ...form, product_size: v })} />
              <Field label="Preço (R$) *" value={form.product_price} onChange={(v) => setForm({ ...form, product_price: v })} required />
              <Field label="Quantidade" value={form.product_quantity} onChange={(v) => setForm({ ...form, product_quantity: v })} />
              <Field label="Observações" value={form.notes} onChange={(v) => setForm({ ...form, notes: v })} />
            </div>
            <button type="submit" disabled={creating} className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-xs uppercase tracking-wider font-semibold text-navy-deep hover:scale-[1.02] transition-transform disabled:opacity-60">
              {creating && <Loader2 className="h-4 w-4 animate-spin" />} Salvar pedido
            </button>
          </form>
        )}

        <div className="mt-8">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Carregando pedidos…</div>
          ) : orders.length === 0 ? (
            <p className="text-muted-foreground">Nenhum pedido cadastrado ainda.</p>
          ) : (
            <ul className="space-y-4">
              {orders.map((o) => <OrderCard key={o.id} order={o} onDelete={handleDelete} onEmit={handleEmit} busy={busyId === o.id} onUpdated={load} />)}
            </ul>
          )}
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          <Link to="/" className="underline hover:text-bordeaux">← Voltar ao site</Link>
        </p>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = "text", required, maxLength }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; maxLength?: number }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input type={type} value={value} required={required} maxLength={maxLength} onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:border-gold" />
    </label>
  );
}

function OrderCard({ order, onDelete, onEmit, busy, onUpdated }: { order: Order; onDelete: (id: string) => void; onEmit: (id: string) => void; busy: boolean; onUpdated: () => void }) {
  const [shipLoading, setShipLoading] = useState(false);
  const [shipOptions, setShipOptions] = useState<ShippingOption[]>([]);
  const [shipError, setShipError] = useState<string | null>(null);

  async function calcular() {
    setShipLoading(true);
    setShipError(null);
    setShipOptions([]);
    try {
      const res = await calcularFrete({ data: { cepDestino: order.address_postal_code.replace(/\D/g, ""), precoProduto: Number(order.product_price) } });
      if (res.error) setShipError(res.error);
      setShipOptions(res.options.filter((o) => !o.error && o.price !== "—"));
    } catch { setShipError("Falha ao calcular frete."); }
    finally { setShipLoading(false); }
  }

  async function escolher(opt: ShippingOption) {
    const price = Number(opt.price.replace(/[^\d,]/g, "").replace(",", "."));
    const deadlineMatch = opt.deliveryTime.match(/\d+/);
    const { error } = await supabase.from("orders" as any).update({
      shipping_service_id: opt.id,
      shipping_service_name: opt.name,
      shipping_company: opt.company,
      shipping_price: price,
      shipping_deadline: deadlineMatch ? Number(deadlineMatch[0]) : null,
    }).eq("id", order.id);
    if (error) { alert(error.message); return; }
    onUpdated();
  }

  const canEmit = !!order.shipping_service_id && !order.me_label_url;

  return (
    <li className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">#{order.id.slice(0, 8)} · {new Date(order.created_at).toLocaleString("pt-BR")}</p>
          <h3 className="mt-1 font-display text-xl text-foreground">{order.customer_name}</h3>
          <p className="text-sm text-muted-foreground">{order.customer_document} · {order.customer_phone ?? "sem telefone"} · {order.customer_email ?? "sem e-mail"}</p>
          <p className="mt-2 text-sm text-foreground/85">
            <strong>{order.product_name}</strong>{order.product_size ? ` — Tam. ${order.product_size}` : ""} × {order.product_quantity} — <span className="text-bordeaux">{formatCurrency(order.product_price)}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            {order.address_street}, {order.address_number}{order.address_complement ? ` — ${order.address_complement}` : ""} · {order.address_district} · {order.address_city}/{order.address_state_abbr} · CEP {order.address_postal_code}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <StatusBadge status={order.status} />
          {order.me_tracking && <span className="text-[11px] text-muted-foreground">Rastreio: <strong className="text-foreground">{order.me_tracking}</strong></span>}
        </div>
      </div>

      <div className="mt-4 border-t border-border pt-4">
        {order.shipping_service_id ? (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm">
              <Truck className="inline h-4 w-4 text-bordeaux mr-1" />
              <strong>{order.shipping_company}</strong> — {order.shipping_service_name} · {formatCurrency(order.shipping_price ?? 0)}{order.shipping_deadline ? ` · ${order.shipping_deadline} dias` : ""}
            </div>
            {!order.me_label_url && (
              <button onClick={calcular} className="text-xs underline text-muted-foreground hover:text-bordeaux">Recalcular</button>
            )}
          </div>
        ) : (
          <button onClick={calcular} disabled={shipLoading} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs uppercase tracking-wider hover:border-gold">
            {shipLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Search className="h-3 w-3" />} Calcular frete
          </button>
        )}
        {shipError && <p className="mt-2 text-xs text-bordeaux">{shipError}</p>}
        {shipOptions.length > 0 && (
          <ul className="mt-3 space-y-2">
            {shipOptions.map((opt) => (
              <li key={opt.id}>
                <button onClick={() => escolher(opt)} className="w-full text-left flex items-center justify-between rounded border border-border bg-background p-3 hover:border-gold text-sm">
                  <span><strong>{opt.company}</strong> · {opt.name} — {opt.deliveryTime}</span>
                  <span className="text-bordeaux">{opt.price}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {order.me_label_url && (
          <a href={order.me_label_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-xs uppercase tracking-wider font-semibold text-navy-deep">
            <ExternalLink className="h-3 w-3" /> Abrir etiqueta
          </a>
        )}
        {canEmit && (
          <button onClick={() => onEmit(order.id)} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-bordeaux px-4 py-2 text-xs uppercase tracking-wider font-semibold text-cream hover:opacity-90 disabled:opacity-60">
            {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : <Truck className="h-3 w-3" />} Emitir etiqueta
          </button>
        )}
        <button onClick={() => onDelete(order.id)} className="ml-auto text-xs text-muted-foreground hover:text-bordeaux">Excluir</button>
      </div>
    </li>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    novo: "bg-muted text-foreground",
    carrinho: "bg-blue-100 text-blue-800",
    pago: "bg-emerald-100 text-emerald-800",
    gerado: "bg-amber-100 text-amber-800",
    impresso: "bg-gold/20 text-navy-deep",
    enviado: "bg-purple-100 text-purple-800",
    entregue: "bg-green-100 text-green-800",
    cancelado: "bg-red-100 text-red-800",
  };
  return <span className={`inline-block rounded-full px-3 py-1 text-[10px] uppercase tracking-wider ${map[status] ?? "bg-muted"}`}>{status}</span>;
}
