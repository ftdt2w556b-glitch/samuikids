export type AgeGroup = "toddlers" | "kids" | "tweens" | "all-ages";
export type PriceRange = "free" | "budget" | "mid" | "premium";
export type Audience = "kids" | "family";
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
  bookingRequired?: boolean;
  audience: Audience;
  dropOff?: boolean;
  memberDiscount?: boolean;
  sessionType?: "private" | "group" | "both";
  sessionLengths?: ("hourly" | "half-day" | "daily")[];
  allDayOption?: boolean;
  ageMin?: number;
  ageMax?: number;
  englishSpoken?: boolean;
  hasFood?: boolean;
  hasDrinks?: boolean;
  legallyRegistered?: boolean;
}
