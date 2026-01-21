-- Make the images bucket public
UPDATE storage.buckets SET public = true WHERE id = 'images';

-- Add RLS policy to allow public reads
CREATE POLICY "Public read access for images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'images');