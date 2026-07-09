import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ME_BASE = "https://melhorenvio.com.br/api/v2";
const ORIGIN_CEP = "53585140";
const CONTACT_EMAIL = "sanctusdominusoficial@gmail.com";

// Dados do remetente (loja) — usados para o carrinho da Melhor Envio.
// Ajuste no painel se necessário.
const SENDER = {
  name: "Sanctus Dominus",
  phone: "5581982202007",
  email: CONTACT_EMAIL,
  document: "00000000000", // CPF/CNPJ do remetente (11 ou 14 dígitos, apenas números)
  address: "Endereço da loja",
  complement: "",
  number: "S/N",
  district: "Centro",
  city_name: "Paulista",
  state_abbr: "PE",
  country_id: "BR",
  postal_code: ORIGIN_CEP,
};

function meHeaders(token: string): HeadersInit {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    "User-Agent": `Sanctus Dominus (${CONTACT_EMAIL})`,
  };
}

async function meFetch(path: string, token: string, init: RequestInit = {}) {
  const res = await fetch(`${ME_BASE}${path}`, { ...init, headers: { ...meHeaders(token), ...(init.headers ?? {}) } });
  const raw = await res.text();
  let json: unknown = null;
  try { json = raw ? JSON.parse(raw) : null; } catch { /* ignore */ }
  if (!res.ok) {
    const msg = (json && typeof json === "object" && "message" in json && (json as { message?: string }).message) || raw || `HTTP ${res.status}`;
    console.error(`[me-admin] ${path} → ${res.status}: ${raw.slice(0, 500)}`);
    throw new Error(String(msg));
  }
  return json;
}

async function assertAdmin(supabase: any, userId: string) {
  const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (error) throw new Error("Falha ao validar permissão.");
  if (!data) throw new Error("Acesso restrito a administradores.");
}

// ---------- Emissão de etiqueta ----------
// Fluxo: order (do banco) → cart → checkout → generate → print → salva URL no pedido.

const emitInput = z.object({ orderId: z.string().uuid() });

export const emitirEtiqueta = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => emitInput.parse(d))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(supabase, userId);

    const token = process.env.MELHOR_ENVIO_TOKEN;
    if (!token) throw new Error("MELHOR_ENVIO_TOKEN não configurado.");

    const { data: order, error } = await supabase.from("orders").select("*").eq("id", data.orderId).maybeSingle();
    if (error || !order) throw new Error("Pedido não encontrado.");
    if (!order.shipping_service_id) throw new Error("Selecione um serviço de frete antes de emitir.");
    if (order.me_label_url) return { url: order.me_label_url, tracking: order.me_tracking, alreadyIssued: true };

    // 1) Adiciona ao carrinho
    const cartBody = {
      service: order.shipping_service_id,
      agency: null,
      from: SENDER,
      to: {
        name: order.customer_name,
        phone: order.customer_phone ?? SENDER.phone,
        email: order.customer_email ?? SENDER.email,
        document: (order.customer_document ?? "").replace(/\D/g, ""),
        address: order.address_street,
        complement: order.address_complement ?? "",
        number: order.address_number,
        district: order.address_district,
        city: order.address_city,
        state_abbr: order.address_state_abbr,
        country_id: "BR",
        postal_code: (order.address_postal_code ?? "").replace(/\D/g, ""),
      },
      products: [{
        name: order.product_name,
        quantity: order.product_quantity ?? 1,
        unitary_value: Number(order.product_price),
      }],
      volumes: [{ height: 3, width: 15, length: 20, weight: 0.3 }],
      options: {
        insurance_value: Number(order.product_price),
        receipt: false,
        own_hand: false,
        reverse: false,
        non_commercial: true,
        invoice: null,
        platform: "Sanctus Dominus",
      },
    };

    const cart = (await meFetch("/me/cart", token, { method: "POST", body: JSON.stringify(cartBody) })) as { id: string; protocol?: string };
    const meOrderId = cart.id;

    await supabase.from("orders").update({ me_cart_id: meOrderId, status: "carrinho" }).eq("id", order.id);

    // 2) Checkout
    await meFetch("/me/shipment/checkout", token, { method: "POST", body: JSON.stringify({ orders: [meOrderId] }) });
    await supabase.from("orders").update({ status: "pago" }).eq("id", order.id);

    // 3) Gerar
    await meFetch("/me/shipment/generate", token, { method: "POST", body: JSON.stringify({ orders: [meOrderId] }) });
    await supabase.from("orders").update({ status: "gerado" }).eq("id", order.id);

    // 4) Imprimir
    const print = (await meFetch("/me/shipment/print", token, { method: "POST", body: JSON.stringify({ mode: "private", orders: [meOrderId] }) })) as { url?: string };
    const url = print.url ?? null;

    // 5) Tracking (opcional)
    let tracking: string | null = null;
    try {
      const tr = (await meFetch("/me/shipment/tracking", token, { method: "POST", body: JSON.stringify({ orders: [meOrderId] }) })) as Record<string, { tracking?: string }>;
      tracking = tr?.[meOrderId]?.tracking ?? null;
    } catch { /* ignore */ }

    await supabase.from("orders").update({
      me_order_id: meOrderId,
      me_label_url: url,
      me_tracking: tracking,
      status: "impresso",
    }).eq("id", order.id);

    return { url, tracking, alreadyIssued: false };
  });

// ---------- Saldo da conta Melhor Envio ----------
export const meSaldo = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const token = process.env.MELHOR_ENVIO_TOKEN;
    if (!token) throw new Error("MELHOR_ENVIO_TOKEN não configurado.");
    const bal = (await meFetch("/me/balance", token, { method: "GET" })) as { balance?: number };
    return { balance: bal?.balance ?? 0 };
  });
