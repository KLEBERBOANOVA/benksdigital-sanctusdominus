import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ME_BASE = "https://melhorenvio.com.br/api/v2";
const ORIGIN_CEP = "53585140";
const CONTACT_EMAIL = "sanctusdominusoficial@gmail.com";

const inputSchema = z.object({
  cepDestino: z
    .string()
    .transform((v) => v.replace(/\D/g, ""))
    .refine((v) => v.length === 8, { message: "CEP inválido" }),
  precoProduto: z.number().positive().max(100000),
});

export type ShippingOption = {
  id: number;
  name: string;
  company: string;
  price: string;
  deliveryTime: string;
  error?: string;
};

export const calcularFrete = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => inputSchema.parse(data))
  .handler(async ({ data }): Promise<{ options: ShippingOption[]; error?: string }> => {
    const token = process.env.MELHOR_ENVIO_TOKEN;
    if (!token) return { options: [], error: "Integração de frete não configurada." };

    const body = {
      from: { postal_code: ORIGIN_CEP },
      to: { postal_code: data.cepDestino },
      products: [
        {
          id: "camisa-1",
          width: 15,
          height: 3,
          length: 20,
          weight: 0.3,
          insurance_value: data.precoProduto,
          quantity: 1,
        },
      ],
    };

    try {
      const res = await fetch(`${ME_BASE}/me/shipment/calculate`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "User-Agent": `Sanctus Dominus (${CONTACT_EMAIL})`,
        },
        body: JSON.stringify(body),
      });

      const raw = await res.text();
      if (!res.ok) {
        console.error(`[melhor-envio] ${res.status}: ${raw}`);
        return { options: [], error: `Não foi possível calcular o frete (${res.status}).` };
      }

      const parsed = JSON.parse(raw) as Array<{
        id: number;
        name: string;
        price?: string | number | null;
        custom_price?: string | number | null;
        delivery_time?: number | null;
        custom_delivery_time?: number | null;
        company?: { name?: string };
        error?: string;
      }>;

      const options: ShippingOption[] = parsed.map((o) => {
        const priceNum = Number(o.custom_price ?? o.price ?? 0);
        const days = o.custom_delivery_time ?? o.delivery_time;
        return {
          id: o.id,
          name: o.name,
          company: o.company?.name ?? "",
          price: Number.isFinite(priceNum) && priceNum > 0
            ? priceNum.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
            : "—",
          deliveryTime: days ? `${days} dia${days > 1 ? "s" : ""} úteis` : "—",
          error: o.error,
        };
      });

      return { options };
    } catch (err) {
      console.error("[melhor-envio] request failed", err);
      return { options: [], error: "Falha ao contatar o serviço de frete." };
    }
  });
