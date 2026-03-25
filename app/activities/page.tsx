import { getAllActivities } from "@/lib/activities";
import ActivitiesClient from "./ActivitiesClient";
import type { Metadata } from "next";
import { Category, AgeGroup, PriceRange, Audience } from "@/types";

export const metadata: Metadata = {
  title: "All Activities",
  description:
    "Browse kid-centric and family activities on Koh Samui. Filter by age, category, and price. Find drop-off spots, water parks, cooking classes, ninja gyms, and more.",
};

interface Props {
  searchParams: Promise<{ category?: string; age?: string; search?: string; price?: string; audience?: string }>;
}

export default async function ActivitiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const activities = getAllActivities();

  const initialCategory = params.category as Category | undefined;
  const initialAge = params.age as AgeGroup | undefined;
  const initialSearch = params.search ?? "";
  const initialPrice = params.price as PriceRange | undefined;
  const initialAudience = params.audience as Audience | undefined;

  return (
    <ActivitiesClient
      activities={activities}
      initialCategory={initialCategory}
      initialAge={initialAge}
      initialSearch={initialSearch}
      initialPrice={initialPrice}
      initialAudience={initialAudience}
    />
  );
}
