CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  collection text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'Camiseta',
  audience text NOT NULL DEFAULT 'Unissex',
  color text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT 'R$ 89,90',
  image text NOT NULL DEFAULT '',
  tagline text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  inspiration text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active products"
ON public.products FOR SELECT
USING (is_active OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage products"
ON public.products FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER products_set_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.whatsapp_orders (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  address_postal_code text,
  address_street text,
  address_number text,
  address_complement text,
  address_district text,
  address_city text,
  address_state_abbr text,
  product_slug text,
  product_name text NOT NULL,
  product_size text,
  product_color text,
  product_price text,
  product_price_pix text,
  shipping_service text,
  shipping_price text,
  shipping_deadline text,
  message text,
  status text NOT NULL DEFAULT 'novo',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.whatsapp_orders TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whatsapp_orders TO authenticated;
GRANT ALL ON public.whatsapp_orders TO service_role;

ALTER TABLE public.whatsapp_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register whatsapp orders"
ON public.whatsapp_orders FOR INSERT
WITH CHECK (
  length(trim(customer_name)) >= 2 AND length(trim(customer_name)) <= 120
  AND length(trim(customer_phone)) >= 8 AND length(trim(customer_phone)) <= 30
  AND length(trim(product_name)) >= 1 AND length(trim(product_name)) <= 200
);

CREATE POLICY "Admins read whatsapp orders"
ON public.whatsapp_orders FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins update whatsapp orders"
ON public.whatsapp_orders FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins delete whatsapp orders"
ON public.whatsapp_orders FOR DELETE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER whatsapp_orders_set_updated_at
BEFORE UPDATE ON public.whatsapp_orders
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();