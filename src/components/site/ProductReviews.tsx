import { useEffect, useState, type FormEvent } from "react";
import { Star, Upload, Loader2, ImageIcon, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Review = {
  id: string;
  author_name: string;
  rating: number;
  comment: string;
  image_url: string | null;
  created_at: string;
};

const MAX_IMAGE_MB = 5;

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  } catch {
    return "";
  }
}

function Stars({ value, onChange, size = 22 }: { value: number; onChange?: (n: number) => void; size?: number }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  return (
    <div className="inline-flex items-center gap-0.5" role={onChange ? "radiogroup" : undefined} aria-label="Avaliação">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= display;
        const Btn = onChange ? "button" : "span";
        return (
          <Btn
            key={n}
            type={onChange ? "button" : undefined}
            onClick={onChange ? () => onChange(n) : undefined}
            onMouseEnter={onChange ? () => setHover(n) : undefined}
            onMouseLeave={onChange ? () => setHover(0) : undefined}
            aria-label={onChange ? `${n} ${n === 1 ? "estrela" : "estrelas"}` : undefined}
            className={onChange ? "cursor-pointer transition-transform hover:scale-110" : ""}
          >
            <Star
              width={size}
              height={size}
              className={filled ? "fill-gold text-gold" : "text-muted-foreground/40"}
            />
          </Btn>
        );
      })}
    </div>
  );
}

export function ProductReviews({ productSlug }: { productSlug: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("product_reviews")
        .select("id, author_name, rating, comment, image_url, created_at")
        .eq("product_slug", productSlug)
        .order("created_at", { ascending: false })
        .limit(50);
      if (!mounted) return;
      if (!error && data) setReviews(data as Review[]);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [productSlug]);

  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (!f) { setFile(null); return; }
    if (!f.type.startsWith("image/")) { setError("Envie um arquivo de imagem."); return; }
    if (f.size > MAX_IMAGE_MB * 1024 * 1024) { setError(`Imagem deve ter no máximo ${MAX_IMAGE_MB}MB.`); return; }
    setError(null);
    setFile(f);
  }

  async function uploadImage(f: File): Promise<string | null> {
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "jpg";
    const path = `${productSlug}/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("review-images")
      .upload(path, f, { contentType: f.type, upsert: false });
    if (upErr) throw upErr;
    // Bucket is private; generate long-lived signed URL (10 years).
    const { data, error: sErr } = await supabase.storage
      .from("review-images")
      .createSignedUrl(path, 60 * 60 * 24 * 365 * 10);
    if (sErr || !data) throw sErr ?? new Error("Falha ao gerar URL da imagem.");
    return data.signedUrl;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const trimmedName = name.trim();
    const trimmedComment = comment.trim();
    if (trimmedName.length < 2) { setError("Informe seu nome."); return; }
    if (trimmedComment.length < 3) { setError("Escreva um comentário."); return; }
    setSubmitting(true);
    try {
      let image_url: string | null = null;
      if (file) image_url = await uploadImage(file);
      const { data, error: insErr } = await supabase
        .from("product_reviews")
        .insert({ product_slug: productSlug, author_name: trimmedName, rating, comment: trimmedComment, image_url })
        .select("id, author_name, rating, comment, image_url, created_at")
        .single();
      if (insErr) throw insErr;
      setReviews((prev) => [data as Review, ...prev]);
      setName(""); setComment(""); setRating(5); setFile(null); setPreview(null); setSuccess(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Falha ao enviar avaliação.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  const total = reviews.length;
  const avg = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;

  return (
    <section aria-labelledby="reviews-heading" className="mx-auto max-w-5xl">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-gold">Avaliações</p>
          <h2 id="reviews-heading" className="font-display text-3xl md:text-4xl text-foreground mt-1">
            O que dizem sobre esta peça
          </h2>
        </div>
        {total > 0 && (
          <div className="flex items-center gap-3">
            <Stars value={Math.round(avg)} size={20} />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">{avg.toFixed(1)}</strong> · {total} {total === 1 ? "avaliação" : "avaliações"}
            </p>
          </div>
        )}
      </header>

      {/* Form */}
      <form onSubmit={onSubmit} className="rounded-xl border border-border bg-muted/30 p-5 md:p-6 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="rv-name" className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Seu nome</label>
            <input
              id="rv-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={60}
              placeholder="Como quer aparecer"
              className="w-full h-11 px-4 rounded-full border border-border bg-background text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Sua nota</span>
            <Stars value={rating} onChange={setRating} />
          </div>
        </div>

        <div>
          <label htmlFor="rv-comment" className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Comentário</label>
          <textarea
            id="rv-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="Conte sua experiência com a peça"
            className="w-full px-4 py-3 rounded-2xl border border-border bg-background text-sm focus:outline-none focus:border-gold resize-y"
          />
          <p className="mt-1 text-[11px] text-muted-foreground text-right">{comment.length}/1000</p>
        </div>

        <div>
          <span className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Foto do produto (opcional)</span>
          <div className="flex items-center gap-3 flex-wrap">
            <label className="inline-flex items-center gap-2 h-11 px-5 rounded-full border border-border bg-background text-xs uppercase tracking-wider font-semibold cursor-pointer hover:border-gold hover:text-gold transition-colors">
              <Upload className="h-4 w-4" />
              {file ? "Trocar imagem" : "Enviar imagem"}
              <input type="file" accept="image/*" className="sr-only" onChange={onFileChange} />
            </label>
            {preview && (
              <div className="relative">
                <img src={preview} alt="Prévia" className="h-16 w-16 object-cover rounded-lg border border-border" />
                <button
                  type="button"
                  aria-label="Remover imagem"
                  onClick={() => { setFile(null); }}
                  className="absolute -top-2 -right-2 h-6 w-6 grid place-items-center rounded-full bg-navy-deep text-cream hover:bg-bordeaux"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            )}
            <span className="text-[11px] text-muted-foreground">Até {MAX_IMAGE_MB}MB · JPG/PNG</span>
          </div>
        </div>

        {error && <p className="text-sm text-bordeaux">{error}</p>}
        {success && <p className="text-sm text-green-700">Avaliação publicada. Obrigado!</p>}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center gap-2 bg-gradient-gold text-navy-deep px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold shadow-gold hover:scale-[1.02] transition-transform disabled:opacity-60 disabled:hover:scale-100"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Star className="h-4 w-4" />}
            {submitting ? "Enviando" : "Publicar avaliação"}
          </button>
        </div>
      </form>

      {/* List */}
      <div className="mt-10 space-y-4">
        {loading ? (
          <p className="text-sm text-muted-foreground flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Carregando avaliações…</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">Ainda não há avaliações. Seja o primeiro a comentar!</p>
        ) : (
          reviews.map((r) => (
            <article key={r.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <header className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{r.author_name}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Stars value={r.rating} size={16} />
                    <span className="text-[11px] text-muted-foreground">{formatDate(r.created_at)}</span>
                  </div>
                </div>
                {r.image_url && (
                  <a href={r.image_url} target="_blank" rel="noopener noreferrer" className="shrink-0" aria-label="Ver imagem em tamanho maior">
                    <img
                      src={r.image_url}
                      alt={`Foto enviada por ${r.author_name}`}
                      loading="lazy"
                      className="h-20 w-20 object-cover rounded-lg border border-border hover:opacity-90 transition-opacity"
                    />
                  </a>
                )}
              </header>
              <p className="mt-3 text-sm text-foreground/85 whitespace-pre-line leading-relaxed">{r.comment}</p>
              {!r.image_url && (
                <span className="mt-2 inline-flex items-center gap-1 text-[11px] text-muted-foreground/70">
                  <ImageIcon className="h-3 w-3" /> sem foto
                </span>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}
