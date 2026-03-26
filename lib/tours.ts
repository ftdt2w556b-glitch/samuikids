import "server-only";
import { supabaseAdmin } from "./supabase-admin";
import { Activity } from "@/types";
import { getActivityBySlug } from "./activities";

export interface Tour {
  id: string;
  slug: string;
  title: string;
  description?: string;
  area?: string;
  durationNote?: string;
  active: boolean;
  stopCount?: number;
}

export interface TourStop {
  id: string;
  tourId: string;
  activitySlug: string;
  stopNumber: number;
  stopNote?: string;
  activity?: Activity;
}

export interface TourWithStops extends Tour {
  stops: TourStop[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTour(r: any): Tour {
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description ?? undefined,
    area: r.area ?? undefined,
    durationNote: r.duration_note ?? undefined,
    active: r.active ?? true,
  };
}

export async function getAllTours(): Promise<Tour[]> {
  const { data, error } = await supabaseAdmin
    .from("tours")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  if (!data?.length) return [];

  // Get stop counts
  const toursWithCounts = await Promise.all(
    data.map(async (t) => {
      const { count } = await supabaseAdmin
        .from("tour_stops")
        .select("*", { count: "exact", head: true })
        .eq("tour_id", t.id);
      return { ...mapTour(t), stopCount: count ?? 0 };
    })
  );
  return toursWithCounts;
}

export async function getAllToursAdmin(): Promise<Tour[]> {
  const { data, error } = await supabaseAdmin
    .from("tours")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapTour);
}

export async function getTourBySlug(slug: string): Promise<TourWithStops | null> {
  const { data: tour, error } = await supabaseAdmin
    .from("tours")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !tour) return null;

  const { data: stops } = await supabaseAdmin
    .from("tour_stops")
    .select("*")
    .eq("tour_id", tour.id)
    .order("stop_number", { ascending: true });

  const stopsWithActivity = await Promise.all(
    (stops ?? []).map(async (s) => ({
      id: s.id,
      tourId: s.tour_id,
      activitySlug: s.activity_slug,
      stopNumber: s.stop_number,
      stopNote: s.stop_note ?? undefined,
      activity: await getActivityBySlug(s.activity_slug),
    }))
  );

  return { ...mapTour(tour), stops: stopsWithActivity };
}

export async function getTourById(id: string): Promise<(Tour & { stops: TourStop[] }) | null> {
  const { data: tour, error } = await supabaseAdmin
    .from("tours")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !tour) return null;

  const { data: stops } = await supabaseAdmin
    .from("tour_stops")
    .select("*")
    .eq("tour_id", id)
    .order("stop_number", { ascending: true });

  return {
    ...mapTour(tour),
    stops: (stops ?? []).map((s) => ({
      id: s.id,
      tourId: s.tour_id,
      activitySlug: s.activity_slug,
      stopNumber: s.stop_number,
      stopNote: s.stop_note ?? undefined,
    })),
  };
}
