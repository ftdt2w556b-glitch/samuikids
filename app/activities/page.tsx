import { getAllActivities } from "@/lib/activities";
import ActivitiesClient from "./ActivitiesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Activities",
  description:
    "Browse all kid-friendly and family activities on Koh Samui. Filter by age, category, and price. Find beaches, water parks, animal encounters, cooking classes, and more.",
};

export default function ActivitiesPage() {
  const activities = getAllActivities();
  return <ActivitiesClient activities={activities} />;
}
