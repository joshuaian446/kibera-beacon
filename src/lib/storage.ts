// Storage utility for accessing images from Lovable Cloud storage
const STORAGE_URL = "https://upynycgzzwzhkwqjtuek.supabase.co/storage/v1/object/public/images";

// Curated high-quality images from uploaded collection
// Selected based on file size (larger = higher resolution) and visual quality
export const storageImages = {
  // Hero/Main images - highest quality uploads
  hero: `${STORAGE_URL}/photo_2024-06-27_13-12-11.jpg`, // 326KB - Best quality
  
  // Program-specific images
  education: `${STORAGE_URL}/photo_2024-06-27_13-12-21.jpg`, // 280KB - Classroom/learning
  feeding: `${STORAGE_URL}/photo_2024-06-27_13-13-09.jpg`, // 268KB - Community/meals
  coCurricular: `${STORAGE_URL}/photo_2024-06-27_14-49-21.jpg`, // 263KB - Activities
  community: `${STORAGE_URL}/photo_2024-06-27_13-05-01.jpg`, // 240KB - Engagement
  vocational: `${STORAGE_URL}/photo_2024-06-27_13-12-36%20(2).jpg`, // 233KB - Training
  
  // About/General images
  about: `${STORAGE_URL}/photo_2024-06-27_13-11-58.jpg`, // 216KB
  
  // Additional images for variety
  gallery1: `${STORAGE_URL}/photo_2024-06-27_13-05-16.jpg`, // 217KB
  gallery2: `${STORAGE_URL}/photo_2024-06-27_13-11-47.jpg`, // 199KB
  gallery3: `${STORAGE_URL}/photo_2024-06-27_13-13-37.jpg`, // 189KB
  gallery4: `${STORAGE_URL}/photo_2024-06-27_12-57-23.jpg`, // 176KB
  gallery5: `${STORAGE_URL}/photo_2024-06-27_13-13-31.jpg`, // 140KB
  gallery6: `${STORAGE_URL}/photo_2024-06-27_13-12-30.jpg`, // 106KB
  gallery7: `${STORAGE_URL}/photo_2024-06-27_13-13-28.jpg`, // 99KB
};

// Helper function to get storage image URL
export const getStorageImageUrl = (imageName: string): string => {
  return `${STORAGE_URL}/${encodeURIComponent(imageName)}`;
};
