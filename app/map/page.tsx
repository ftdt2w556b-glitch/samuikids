import { getAllActivities } from "@/lib/activities";
import MapClient from "./MapClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Map View",
  description: "Interactive map of all kid-friendly activities on Koh Samui. Find activities near your hotel.",
};

export default function MapPage() {
  const activities = getAllActivities();
  return <MapClient activities={activities} />;
}
