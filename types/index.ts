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
  popularity: number; // 1-10
  audience: Audience;
  dropOff?: boolean;        // parents can leave kids with staff
  memberDiscount?: boolean; // offers SamuiKids.com member discount
  sessionType?: "private" | "group" | "both";
  allDayOption?: boolean;   // has multi-hour or full-day option
  ageMin?: number;          // minimum age in years
  ageMax?: number;          // maximum age in years
}
