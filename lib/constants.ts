import { Activity, Category, AgeGroup, PriceRange } from "@/types";

export const CATEGORY_LABELS: Record<Category, string> = {
  "nature-animals": "Nature & Animals",
  "water-beaches": "Water & Beaches",
  "creative-learning": "Creative & Learning",
  "adventure-sports": "Adventure & Sports",
  "food-cafes": "Food & Cafes",
  cultural: "Cultural",
  entertainment: "Entertainment",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  "nature-animals": "bg-green-100 text-green-800",
  "water-beaches": "bg-cyan-100 text-cyan-800",
  "creative-learning": "bg-orange-100 text-orange-800",
  "adventure-sports": "bg-yellow-100 text-yellow-800",
  "food-cafes": "bg-pink-100 text-pink-800",
  cultural: "bg-purple-100 text-purple-800",
  entertainment: "bg-blue-100 text-blue-800",
};

export const CATEGORY_BG: Record<Category, string> = {
  "nature-animals": "from-green-400 to-green-600",
  "water-beaches": "from-cyan-400 to-blue-500",
  "creative-learning": "from-orange-400 to-orange-600",
  "adventure-sports": "from-yellow-400 to-amber-500",
  "food-cafes": "from-pink-400 to-rose-500",
  cultural: "from-purple-400 to-purple-600",
  entertainment: "from-blue-400 to-indigo-500",
};

export const CATEGORY_ICONS: Record<Category, string> = {
  "nature-animals": "🐘",
  "water-beaches": "🌊",
  "creative-learning": "🎨",
  "adventure-sports": "🧗",
  "food-cafes": "🍜",
  cultural: "🏛️",
  entertainment: "🎮",
};

export const PRICE_LABELS: Record<PriceRange, string> = {
  free: "Free",
  budget: "Budget",
  mid: "Mid-Range",
  premium: "Premium",
};

export const PRICE_COLORS: Record<PriceRange, string> = {
  free: "bg-green-100 text-green-700",
  budget: "bg-blue-100 text-blue-700",
  mid: "bg-yellow-100 text-yellow-700",
  premium: "bg-purple-100 text-purple-700",
};

export const AGE_LABELS: Record<AgeGroup, string> = {
  toddlers: "Toddlers (0–3)",
  kids: "Kids (4–10)",
  tweens: "Tweens (11–15)",
  "all-ages": "All Ages",
};

export function filterActivities(
  activities: Activity[],
  {
    categories,
    ageGroups,
    priceRanges,
    search,
  }: {
    categories?: Category[];
    ageGroups?: AgeGroup[];
    priceRanges?: PriceRange[];
    search?: string;
  }
): Activity[] {
  return activities.filter((a) => {
    if (categories && categories.length > 0 && !categories.includes(a.category)) return false;
    if (ageGroups && ageGroups.length > 0 && !ageGroups.some((ag) => a.ageGroups.includes(ag))) return false;
    if (priceRanges && priceRanges.length > 0 && !priceRanges.includes(a.priceRange)) return false;
    if (search) {
      const q = search.toLowerCase();
      if (
        !a.title.toLowerCase().includes(q) &&
        !a.shortDesc.toLowerCase().includes(q) &&
        !a.tags.some((t) => t.toLowerCase().includes(q)) &&
        !a.location.area.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });
}
