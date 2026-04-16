import restaurantMahas from "@/assets/restaurant-mahas.jpg";
import restaurantRikkis from "@/assets/restaurant-rikkis.jpg";
import restaurantUkraina from "@/assets/restaurant-ukraina.jpg";

type RestaurantImageLike = {
  slug?: string | null;
  image_url?: string | null;
};

const LOCAL_IMAGES: Record<string, string> = {
  "maha-s-egyptian-cuisine": restaurantMahas,
  "rikki-s-filipino-kitchen": restaurantRikkis,
  "ukraina-deli-cafe": restaurantUkraina,
};

export const getRestaurantImage = (restaurant?: RestaurantImageLike | null): string | null => {
  if (!restaurant) return null;
  const slug = restaurant.slug?.toLowerCase();
  if (slug && LOCAL_IMAGES[slug]) return LOCAL_IMAGES[slug];
  return restaurant.image_url ?? null;
};
