CREATE TABLE public.studio_designs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  subtitle text NOT NULL DEFAULT '',
  collection text NOT NULL DEFAULT 'Apóstolos',
  image text NOT NULL DEFAULT '',
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.studio_designs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.studio_designs TO authenticated;
GRANT ALL ON public.studio_designs TO service_role;

ALTER TABLE public.studio_designs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active studio designs"
  ON public.studio_designs FOR SELECT
  TO anon, authenticated
  USING (is_active);

CREATE POLICY "Admins manage studio designs"
  ON public.studio_designs FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER studio_designs_set_updated_at
  BEFORE UPDATE ON public.studio_designs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();