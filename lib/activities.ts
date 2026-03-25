import "server-only";
import { Activity } from "@/types";
import fs from "fs";
import path from "path";

const ACTIVITIES_DIR = path.join(process.cwd(), "content/activities");

export function getAllActivities(): Activity[] {
  const files = fs.readdirSync(ACTIVITIES_DIR).filter((f) => f.endsWith(".json"));
  const activities = files.map((file) => {
    const raw = fs.readFileSync(path.join(ACTIVITIES_DIR, file), "utf-8");
    return JSON.parse(raw) as Activity;
  });
  return activities.sort((a, b) => b.popularity - a.popularity);
}

export function getActivityBySlug(slug: string): Activity | undefined {
  return getAllActivities().find((a) => a.slug === slug);
}

export function getFeaturedActivities(): Activity[] {
  return getAllActivities().filter((a) => a.featured);
}

export function getKidActivities(): Activity[] {
  return getAllActivities().filter((a) => a.audience === "kids");
}

export function getFamilyActivities(): Activity[] {
  return getAllActivities().filter((a) => a.audience === "family");
}
