import { getAllActivities } from "@/lib/activities";
import ActivitiesClient from "./ActivitiesClient";
import type { Metadata } from "next";
import { Category, AgeGroup, PriceRange } from "@/types";

export const metadata: Metadata = {
  title: "All Activities",
  description:
    "Browse all kid-friendly and family activities on Koh Samui. Filter by age, category, and price. Find beaches, water parks, animal encounters, cooking classes, and more.",
};

interface Props {
  searchParams: Promise<{ category?: string; age?: string; search?: string; price?: string }>;
}

export default async function ActivitiesPage({ searchParams }: Props) {
  const params = await searchParams;
  const activities = getAllActivities();

  const initialCategory = params.category as Category | undefined;
  const initialAge = params.age as AgeGroup | undefined;
  const initialSearch = params.search ?? "";
  const initialPrice = params.price as PriceRange | undefined;

  return (
    <ActivitiesClient
      activities={activities}
      initialCategory={initialCategory}
      initialAge={initialAge}
      initialSearch={initialSearch}
      initialPrice={initialPrice}
    />
  );
}
