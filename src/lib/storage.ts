// Storage utility for accessing images from Lovable Cloud storage
const STORAGE_URL = "https://upynycgzzwzhkwqjtuek.supabase.co/storage/v1/object/public/images";
const STORAGE_URL_TWO = "https://upynycgzzwzhkwqjtuek.supabase.co/storage/v1/object/public/images-two";

// Curated high-quality images from uploaded collection
// Selected based on file size (larger = higher resolution) and visual quality
export const storageImages = {
  // Hero/Main images - highest quality uploads (keeping original for home hero)
  hero: `${STORAGE_URL}/photo_2024-06-27_13-12-11.jpg`,
  
  // Program-specific images - mapped from images-two bucket
  education: `${STORAGE_URL_TWO}/code%20camp%201.JPEG`, // Coding/learning activity
  feeding: `${STORAGE_URL_TWO}/circe%20play.JPEG`, // Children circle play - community meals context
  coCurricular: `${STORAGE_URL_TWO}/ess%20chess%201.JPEG`, // Chess activity - co-curricular
  community: `${STORAGE_URL_TWO}/comunity%20outreach.JPEG`, // Community outreach
  vocational: `${STORAGE_URL_TWO}/code%20camp%202.JPEG`, // Skills training
  
  // About/General images
  about: `${STORAGE_URL_TWO}/grad%20potrait%201.JPEG`, // Graduation - achievement
  
  // Hero for Get Involved / Call to Action sections
  heroAlt: `${STORAGE_URL_TWO}/hero%20kids%20on%20slide%20pose.JPEG`, // Kids group pose
  
  // Additional images for variety - portraits and activities
  gallery1: `${STORAGE_URL_TWO}/elisha%20junior.JPEG`, // Student portrait
  gallery2: `${STORAGE_URL_TWO}/fransisca%20junior.JPEG`, // Student portrait
  gallery3: `${STORAGE_URL_TWO}/boni%20junior.JPEG`, // Student portrait
  gallery4: `${STORAGE_URL_TWO}/hijab%20potrait.JPEG`, // Student portrait
  gallery5: `${STORAGE_URL_TWO}/games%202.JPEG`, // Games activity
  gallery6: `${STORAGE_URL_TWO}/games%203%20-%20Elisha.JPEG`, // Games activity
  gallery7: `${STORAGE_URL_TWO}/baloon.JPEG`, // Balloon activity
  gallery8: `${STORAGE_URL_TWO}/back%20carry.JPEG`, // Community activity
};

// Helper function to get storage image URL
export const getStorageImageUrl = (imageName: string): string => {
  return `${STORAGE_URL}/${encodeURIComponent(imageName)}`;
};

// Helper function to get storage image URL from images-two bucket
export const getStorageImageUrlTwo = (imageName: string): string => {
  return `${STORAGE_URL_TWO}/${encodeURIComponent(imageName)}`;
};