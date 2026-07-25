DROP POLICY IF EXISTS "Anyone can read active products" ON public.products;

CREATE POLICY "Public can read active products"
ON public.products FOR SELECT TO anon, authenticated
USING (is_active);

GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;

GRANT INSERT ON public.whatsapp_orders TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.whatsapp_orders TO authenticated;
GRANT ALL ON public.whatsapp_orders TO service_role;