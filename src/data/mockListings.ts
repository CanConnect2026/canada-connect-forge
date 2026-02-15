import type { Tables } from "@/integrations/supabase/types";

// Re-export for backward compatibility
export type Listing = Tables<"listings">;

export const mockListings: any[] = [];

export const categories = [
  "Settlement & Newcomer Services",
  "Immigration & Legal Support",
  "Housing & Shelter",
  "Employment & Career Support",
  "Language & Education",
  "Health & Wellness",
  "Financial Services & Support",
  "Food & Clothing Support",
  "Community & Cultural Organizations",
  "Crisis & Emergency Help",
];

export const ontarioCities = [
  "Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton",
  "London", "Markham", "Vaughan", "Kitchener", "Windsor",
  "Richmond Hill", "Oakville", "Burlington", "Scarborough",
];

export const allLanguages = [
  "English", "French", "Arabic", "Mandarin", "Cantonese",
  "Punjabi", "Hindi", "Urdu", "Tagalog", "Spanish",
  "Farsi", "Tamil", "Somali", "Tigrinya", "Amharic",
];
