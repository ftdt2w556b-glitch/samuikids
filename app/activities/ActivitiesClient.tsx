"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Activity, Category, AgeGroup, PriceRange, Audience } from "@/types";
import {
  filterActivities,
  CATEGORY_LABELS,
  AGE_LABELS,
  PRICE_LABELS,
  CATEGORY_COLORS,
  PRICE_COLORS,
} from "@/lib/constants";
import ActivityCard from "@/components/activities/ActivityCard";

interface Props {
  activities: Activity[];
  initialCategory?: Category;
  initialAge?: AgeGroup;
  initialSearch?: string;
  initialPrice?: PriceRange;
  initialAudience?: Audience;
}

export default function ActivitiesClient({
  activities,
  initialCategory,
  initialAge,
  initialSearch = "",
  initialPrice,
  initialAudience,
}: Props) {
  const [search, setSearch] = useState(initialSearch);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedAges, setSelectedAges] = useState<AgeGroup[]>(
    initialAge ? [initialAge] : []
  );
  const [selectedPrices, setSelectedPrices] = useState<PriceRange[]>(
    initialPrice ? [initialPrice] : []
  );
  const [audience, setAudience] = useState<Audience | "all">(initialAudience ?? "all");
  const [sortBy, setSortBy] = useState<"az" | "price-low" | "price-high">("az");
  const [showFilters, setShowFilters] = useState(
    !!(initialCategory || initialAge || initialPrice)
  );

  const PRICE_ORDER: PriceRange[] = ["free", "budget", "mid", "premium"];

  const filtered = useMemo(() => {
    let result = filterActivities(activities, {
      categories: selectedCategories,
      ageGroups: selectedAges,
      priceRanges: selectedPrices,
      search,
    });

    if (audience !== "all") {
      result = result.filter((a) => a.audience === audience);
    }

    if (sortBy === "price-low") {
      result = [...result].sort(
        (a, b) => PRICE_ORDER.indexOf(a.priceRange) - PRICE_ORDER.indexOf(b.priceRange)
      );
    } else if (sortBy === "price-high") {
      result = [...result].sort(
        (a, b) => PRICE_ORDER.indexOf(b.priceRange) - PRICE_ORDER.indexOf(a.priceRange)
      );
    } else {
      // A-Z, featured first
      result = [...result].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.title.localeCompare(b.title);
      });
    }

    return result;
  }, [activities, search, selectedCategories, selectedAges, selectedPrices, sortBy]);

  const toggleCategory = (cat: Category) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const toggleAge = (age: AgeGroup) =>
    setSelectedAges((prev) =>
      prev.includes(age) ? prev.filter((a) => a !== age) : [...prev, age]
    );

  const togglePrice = (price: PriceRange) =>
    setSelectedPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );

  const clearAll = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedAges([]);
    setSelectedPrices([]);
  };

  const hasFilters =
    search || selectedCategories.length > 0 || selectedAges.length > 0 || selectedPrices.length > 0;

  const categories: Category[] = [
    "nature-animals",
    "water-beaches",
    "creative-learning",
    "adventure-sports",
    "food-cafes",
    "entertainment",
    "cultural",
  ];

  const ages: AgeGroup[] = ["toddlers", "kids", "tweens", "all-ages"];
  const prices: PriceRange[] = ["free", "budget", "mid", "premium"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-gray-900 mb-1">All Activities</h1>
        <p className="text-gray-500">
          {filtered.length} of {activities.length} activities on Koh Samui
        </p>
      </div>

      {/* Audience tabs */}
      <div className="flex gap-2 mb-6">
        {([
          { value: "all",    label: "All" },
          { value: "kids",   label: "Drop-off Supervised" },
          { value: "family", label: "Family (you join in)" },
        ] as { value: Audience | "all"; label: string }[]).map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setAudience(value)}
            className={`px-4 py-2 rounded-full font-bold text-sm transition-all border ${
              audience === value
                ? "bg-cyan-500 text-white border-cyan-500 shadow-sm"
                : "bg-white text-gray-600 border-gray-200 hover:border-cyan-300"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Search + controls */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <div className="flex-1 min-w-[200px] flex items-center bg-white border border-gray-200 rounded-2xl px-4 py-3 gap-2 shadow-sm focus-within:ring-2 focus-within:ring-cyan-400 focus-within:border-cyan-400 transition">
          <Search size={18} className="text-gray-400 shrink-0" />
          <input
            type="text"
            placeholder='Search activities, e.g. "beach" or "cooking"'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
          />
          {search && (
            <button onClick={() => setSearch("")}>
              <X size={16} className="text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-700 bg-white shadow-sm outline-none focus:ring-2 focus:ring-cyan-400 font-semibold"
        >
          <option value="az">Sort: Featured + A-Z</option>
          <option value="price-low">Sort: Price Low</option>
          <option value="price-high">Sort: Price High</option>
        </select>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-bold transition-colors shadow-sm ${
            showFilters || hasFilters
              ? "bg-cyan-500 text-white border-cyan-500"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
          }`}
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasFilters && (
            <span className="bg-white/30 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-black">
              {selectedCategories.length + selectedAges.length + selectedPrices.length}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-black text-gray-800 text-sm mb-3 uppercase tracking-wide">Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                      selectedCategories.includes(cat)
                        ? "bg-cyan-500 text-white border-cyan-500"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-cyan-300"
                    }`}
                  >
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black text-gray-800 text-sm mb-3 uppercase tracking-wide">Age Group</h3>
              <div className="flex flex-wrap gap-2">
                {ages.map((age) => (
                  <button
                    key={age}
                    onClick={() => toggleAge(age)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                      selectedAges.includes(age)
                        ? "bg-cyan-500 text-white border-cyan-500"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-cyan-300"
                    }`}
                  >
                    {AGE_LABELS[age]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-black text-gray-800 text-sm mb-3 uppercase tracking-wide">Price Range</h3>
              <div className="flex flex-wrap gap-2">
                {prices.map((price) => (
                  <button
                    key={price}
                    onClick={() => togglePrice(price)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                      selectedPrices.includes(price)
                        ? "bg-cyan-500 text-white border-cyan-500"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:border-cyan-300"
                    }`}
                  >
                    {PRICE_LABELS[price]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {hasFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={clearAll}
                className="text-sm text-red-500 hover:text-red-600 font-bold flex items-center gap-1"
              >
                <X size={14} /> Clear all filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* Active filter chips */}
      {hasFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className="flex items-center gap-1 bg-cyan-100 text-cyan-700 text-xs font-bold px-3 py-1 rounded-full hover:bg-cyan-200 transition-colors"
            >
              {CATEGORY_LABELS[cat]} <X size={11} />
            </button>
          ))}
          {selectedAges.map((age) => (
            <button
              key={age}
              onClick={() => toggleAge(age)}
              className="flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full hover:bg-purple-200 transition-colors"
            >
              {AGE_LABELS[age]} <X size={11} />
            </button>
          ))}
          {selectedPrices.map((price) => (
            <button
              key={price}
              onClick={() => togglePrice(price)}
              className="flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full hover:bg-green-200 transition-colors"
            >
              {PRICE_LABELS[price]} <X size={11} />
            </button>
          ))}
        </div>
      )}

      {/* Results */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((activity) => (
            <ActivityCard key={activity.slug} activity={activity} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-black text-gray-700 mb-2">No activities found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your filters or search term</p>
          <button onClick={clearAll} className="text-cyan-600 font-bold hover:underline">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
