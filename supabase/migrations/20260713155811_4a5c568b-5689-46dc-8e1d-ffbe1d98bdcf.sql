
CREATE POLICY "Public upload to review-images" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'review-images');

CREATE POLICY "Public read review-images" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'review-images');
