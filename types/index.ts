export type AgeGroup = "toddlers" | "kids" | "tweens" | "all-ages";
export type PriceRange = "free" | "budget" | "mid" | "premium";
export type Category =
  | "nature-animals"
  | "water-beaches"
  | "creative-learning"
  | "adventure-sports"
  | "food-cafes"
  | "cultural"
  | "entertainment";

export interface Activity {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  category: Category;
  tags: string[];
  ageGroups: AgeGroup[];
  priceRange: PriceRange;
  priceNote: string;
  location: {
    lat: number;
    lng: number;
    address: string;
    area: string;
  };
  photos: string[];
  openingHours?: string;
  website?: string;
  phone?: string;
  featured: boolean;
  popularity: number; // 1-10
}
