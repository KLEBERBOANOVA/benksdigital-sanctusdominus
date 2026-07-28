import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Loader2, Plus, Pencil, Trash2, Search, Download, Eye, EyeOff, Shirt } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AdminNav } from "@/components/site/AdminNav";
import { importStaticCatalog } from "@/lib/catalog.functions";
import { assetUrl } from "@/lib/asset-url";

type Row = {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: string;
  audience: string;
  color: string;
  price: string;
  image: string;
  tagline: string;
  description: string;
  inspiration: string;
  sizes: string;
  is_active: boolean;
  sort_order: number;
};

const CATEGORIES = ["Camiseta", "Baby Look", "Moletom", "Boné", "Oversize", "Plus size"];
const AUDIENCES = ["Masculino", "Feminino", "Unissex", "Infantil"];

const SIZE_PRESETS: { label: string; value: string }[] = [
  { label: "Padrão", value: "P, M, G, GG" },
  { label: "Feminino", value: "PP, P, M, G, GG" },
  { label: "Oversize", value: "P, M, G, GG, G1" },
  { label: "Plus size", value: "G1, G2, G3, G4, G5" },
  { label: "Infantil", value: "02 ANOS, 04 ANOS, 06 ANOS, 08 ANOS, 10 ANOS, 12 ANOS, 14 ANOS, 16 ANOS" },
];

const EMPTY: Omit<Row, "id"> = {
  slug: "",
  name: "",
  collection: "Apóstolos",
  category: "Camiseta",
  audience: "Unissex",
  color: "",
  price: "R$ 89,90",
  image: "",
  tagline: "",
  description: "",
  inspiration: "",
  sizes: "",
  is_active: true,
  sort_order: 0,
};

function slugify(v: string) {
  return v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const Route = createFileRoute("/_authenticated/admin/produtos")({
  head: () => ({
    meta: [{ title: "Produtos | Painel Sanctus Dominus" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminProdutosPage,
});

function AdminProdutosPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<(Omit<Row, "id"> & { id?: string }) | null>(null);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(file: File) {
    if (!file.type.startsWith("image/")) {
      setMsg("Selecione um arquivo de imagem (JPG, PNG ou WEBP).");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setMsg("Imagem muito grande. Envie um arquivo de até 8 MB.");
      return;
    }
    setUploading(true);
    setMsg(null);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `produtos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const up = await supabase.storage.from("product-images").upload(path, file, {
        cacheControl: "31536000",
        upsert: false,
        contentType: file.type,
      });
      if (up.error) throw new Error(up.error.message);
      const signed = await supabase.storage
        .from("product-images")
        .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
      if (signed.error || !signed.data?.signedUrl) throw new Error(signed.error?.message ?? "URL não gerada");
      setEditing((prev) => (prev ? { ...prev, image: signed.data.signedUrl } : prev));
      setMsg("Imagem enviada com sucesso.");
    } catch (err) {
      setMsg(`Falha ao enviar imagem: ${err instanceof Error ? err.message : "erro desconhecido"}`);
    } finally {
      setUploading(false);
    }
  }

  const router = useRouter();

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("products" as never)
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) setMsg(`Falha ao carregar produtos: ${error.message}`);
    setRows((data as Row[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter((r) =>
      [r.name, r.slug, r.collection, r.category, r.audience, r.color].join(" ").toLowerCase().includes(term)
    );
  }, [rows, q]);

  async function handleImport() {
    setImporting(true);
    setMsg(null);
    try {
      const res = await importStaticCatalog({ data: undefined as never });
      setMsg(`Catálogo importado: ${res.imported} novos produtos de ${res.total}.`);
      await load();
    } catch (err) {
      setMsg(`Falha ao importar: ${err instanceof Error ? err.message : "erro desconhecido"}`);
    } finally {
      setImporting(false);
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    if (!editing.image) {
      setMsg("Envie a imagem do produto antes de salvar.");
      return;
    }
    setSaving(true);
    setMsg(null);
    const payload = { ...editing, slug: editing.slug || slugify(editing.name) };
    const { id, ...values } = payload;
    const res = id
      ? await supabase.from("products" as never).update(values as never).eq("id", id)
      : await supabase.from("products" as never).insert(values as never);
    setSaving(false);
    if (res.error) {
      setMsg(`Falha ao salvar: ${res.error.message}`);
      return;
    }
    setMsg(id ? "Produto atualizado." : "Produto cadastrado.");
    setEditing(null);
    await load();
    await router.invalidate();
  }

  async function toggleActive(row: Row) {
    const { error } = await supabase
      .from("products" as never)
      .update({ is_active: !row.is_active } as never)
      .eq("id", row.id);
    if (error) setMsg(`Falha ao alterar situação: ${error.message}`);
    await load();
    await router.invalidate();
  }

  async function handleDelete(row: Row) {
    if (!confirm(`Excluir definitivamente "${row.name}"?`)) return;
    const { error } = await supabase.from("products" as never).delete().eq("id", row.id);
    if (error) setMsg(`Falha ao excluir: ${error.message}`);
    else setMsg("Produto excluído.");
    await load();
    await router.invalidate();
  }

  return (
    <section className="min-h-screen px-5 py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminNav />

        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 font-display text-4xl text-foreground">
              <Shirt className="h-8 w-8 text-gold" /> Produtos
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Cadastre, edite, ative ou remova as peças exibidas na Camisaria.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleImport}
              disabled={importing}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-xs uppercase tracking-wider hover:border-gold hover:text-gold disabled:opacity-60"
            >
              {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />} Importar catálogo do site
            </button>
            <button
              onClick={() => setEditing({ ...EMPTY, sort_order: (rows.at(-1)?.sort_order ?? 0) + 10 })}
              className="inline-flex items-center gap-2 rounded-full bg-navy-deep px-5 py-2 text-xs font-semibold uppercase tracking-wider text-cream hover:bg-bordeaux"
            >
              <Plus className="h-4 w-4" /> Novo produto
            </button>
          </div>
        </header>

        {msg && (
          <p className="mt-4 rounded-lg border border-gold/40 bg-gold/10 p-3 text-sm text-foreground">{msg}</p>
        )}

        <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome, coleção, categoria…"
            className="h-8 w-full bg-transparent text-sm outline-none"
          />
          <span className="shrink-0 text-xs text-muted-foreground">{filtered.length} itens</span>
        </div>

        {editing && (
          <form onSubmit={handleSave} className="mt-6 rounded-lg border border-border bg-card p-6 shadow-elegant">
            <h2 className="font-display text-2xl text-foreground">
              {editing.id ? "Editar produto" : "Cadastrar produto"}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Nome *" value={editing.name} onChange={(v) => setEditing({ ...editing, name: v, slug: editing.id ? editing.slug : slugify(v) })} required />
              <Field label="Slug (URL) *" value={editing.slug} onChange={(v) => setEditing({ ...editing, slug: slugify(v) })} required />
              <Field label="Coleção" value={editing.collection} onChange={(v) => setEditing({ ...editing, collection: v })} />
              <Select label="Categoria" value={editing.category} options={CATEGORIES} onChange={(v) => setEditing({ ...editing, category: v })} />
              <Select label="Público" value={editing.audience} options={AUDIENCES} onChange={(v) => setEditing({ ...editing, audience: v })} />
              <Field label="Cor" value={editing.color} onChange={(v) => setEditing({ ...editing, color: v })} />
              <Field label="Preço *" value={editing.price} onChange={(v) => setEditing({ ...editing, price: v })} required />
              <label className="block md:col-span-2">
                <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">Imagem do produto *</span>
                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      e.target.value = "";
                      if (f) void handleImageUpload(f);
                    }}
                    className="block w-full max-w-sm cursor-pointer rounded-lg border border-border bg-background px-3 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-navy-deep file:px-4 file:py-1.5 file:text-xs file:uppercase file:tracking-wider file:text-cream"
                  />
                  {uploading && (
                    <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="h-4 w-4 animate-spin" /> Enviando imagem…
                    </span>
                  )}
                  {editing.image && !uploading && (
                    <button
                      type="button"
                      onClick={() => setEditing({ ...editing, image: "" })}
                      className="rounded-full border border-border px-4 py-1.5 text-[11px] uppercase tracking-wider hover:border-bordeaux hover:text-bordeaux"
                    >
                      Remover imagem
                    </button>
                  )}
                </div>
                <span className="mt-1 block text-[11px] text-muted-foreground">
                  JPG, PNG ou WEBP até 8 MB. A imagem é salva no armazenamento do site.
                </span>
              </label>
              <Field label="Chamada (tagline)" value={editing.tagline} onChange={(v) => setEditing({ ...editing, tagline: v })} />
              <Field label="Ordem de exibição" value={String(editing.sort_order)} onChange={(v) => setEditing({ ...editing, sort_order: Number(v.replace(/\D/g, "")) || 0 })} />
              <label className="block md:col-span-2">
                <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">Tamanhos disponíveis</span>
                <input
                  value={editing.sizes ?? ""}
                  onChange={(e) => setEditing({ ...editing, sizes: e.target.value })}
                  placeholder="P, M, G, GG"
                  className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-bordeaux"
                />
                <span className="mt-1 block text-[11px] text-muted-foreground">
                  Separe por vírgula. Deixe vazio para usar os tamanhos padrão da categoria.
                </span>
                <span className="mt-2 flex flex-wrap gap-2">
                  {SIZE_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => setEditing({ ...editing, sizes: p.value })}
                      className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-wider hover:border-bordeaux hover:text-bordeaux"
                    >
                      {p.label}
                    </button>
                  ))}
                </span>
              </label>
              <Area label="Descrição" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} />
              <Area label="Inspiração" value={editing.inspiration} onChange={(v) => setEditing({ ...editing, inspiration: v })} />
            </div>

            {editing.image && (
              <img
                src={assetUrl(editing.image)}
                alt="Pré-visualização do produto"
                className="mt-4 h-40 w-auto rounded-lg border border-border object-cover"
              />
            )}

            <label className="mt-4 flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.is_active}
                onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })}
              />
              Produto visível no site
            </label>

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-xs font-semibold uppercase tracking-wider text-navy-deep disabled:opacity-60"
              >
                {saving && <Loader2 className="h-4 w-4 animate-spin" />} Salvar
              </button>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="rounded-full border border-border px-6 py-3 text-xs uppercase tracking-wider hover:border-bordeaux hover:text-bordeaux"
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        <div className="mt-8">
          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Carregando produtos…
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground">
              Nenhum produto cadastrado no banco. Use “Importar catálogo do site” para trazer todas as peças atuais.
            </p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((r) => (
                <li key={r.id} className="flex gap-4 rounded-lg border border-border bg-card p-4">
                  <img
                    src={assetUrl(r.image)}
                    alt={r.name}
                    loading="lazy"
                    className="h-24 w-20 shrink-0 rounded-md border border-border object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg text-foreground">{r.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.category} · {r.audience} · {r.collection}
                    </p>
                    <p className="mt-1 text-sm text-bordeaux">{r.price}</p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      {r.is_active ? "Visível" : "Oculto"} · ordem {r.sort_order}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <IconBtn label="Editar" onClick={() => setEditing(r)}><Pencil className="h-3.5 w-3.5" /></IconBtn>
                      <IconBtn label={r.is_active ? "Ocultar" : "Exibir"} onClick={() => toggleActive(r)}>
                        {r.is_active ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </IconBtn>
                      <IconBtn label="Excluir" onClick={() => handleDelete(r)}><Trash2 className="h-3.5 w-3.5" /></IconBtn>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-[11px] uppercase tracking-wider hover:border-gold hover:text-gold"
    >
      {children}
    </button>
  );
}

function Field({ label, value, onChange, required }: { label: string; value: string; onChange: (v: string) => void; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-gold focus:outline-none"
      />
    </label>
  );
}

function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 h-10 w-full rounded-lg border border-border bg-background px-3 text-sm focus:border-gold focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}

function Area({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block md:col-span-2">
      <span className="block text-[11px] uppercase tracking-wider text-muted-foreground">{label}</span>
      <textarea
        value={value}
        rows={3}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none"
      />
    </label>
  );
}
