import "server-only";
import { supabaseAdmin } from "./supabase-admin";
import { getActivityBySlug } from "./activities";
import { Activity } from "@/types";

export interface MemberItinerary {
  id: string;
  memberId: string;
  title: string;
  area?: string;
  notes?: string;
  createdAt: string;
  stopCount?: number;
}

export interface MemberItineraryStop {
  id: string;
  itineraryId: string;
  activitySlug: string;
  stopNumber: number;
  stopNote?: string;
  activity?: Activity;
}

export async function getMemberItineraries(memberId: string): Promise<MemberItinerary[]> {
  const { data, error } = await supabaseAdmin
    .from("member_itineraries")
    .select("*")
    .eq("member_id", memberId)
    .order("created_at", { ascending: false });

  if (error) return [];

  const withCounts = await Promise.all(
    (data ?? []).map(async (r) => {
      const { count } = await supabaseAdmin
        .from("member_itinerary_stops")
        .select("*", { count: "exact", head: true })
        .eq("itinerary_id", r.id);
      return {
        id: r.id,
        memberId: r.member_id,
        title: r.title,
        area: r.area ?? undefined,
        notes: r.notes ?? undefined,
        createdAt: r.created_at,
        stopCount: count ?? 0,
      };
    })
  );
  return withCounts;
}

export async function getMemberItineraryById(
  id: string,
  memberId: string
): Promise<(MemberItinerary & { stops: MemberItineraryStop[] }) | null> {
  const { data: row, error } = await supabaseAdmin
    .from("member_itineraries")
    .select("*")
    .eq("id", id)
    .eq("member_id", memberId)
    .single();

  if (error || !row) return null;

  const { data: stops } = await supabaseAdmin
    .from("member_itinerary_stops")
    .select("*")
    .eq("itinerary_id", id)
    .order("stop_number", { ascending: true });

  const stopsWithActivity = await Promise.all(
    (stops ?? []).map(async (s) => ({
      id: s.id,
      itineraryId: s.itinerary_id,
      activitySlug: s.activity_slug,
      stopNumber: s.stop_number,
      stopNote: s.stop_note ?? undefined,
      activity: await getActivityBySlug(s.activity_slug),
    }))
  );

  return {
    id: row.id,
    memberId: row.member_id,
    title: row.title,
    area: row.area ?? undefined,
    notes: row.notes ?? undefined,
    createdAt: row.created_at,
    stops: stopsWithActivity,
  };
}

export async function createMemberItinerary(
  memberId: string,
  title: string,
  area?: string
): Promise<string> {
  const { data, error } = await supabaseAdmin
    .from("member_itineraries")
    .insert({ member_id: memberId, title, area: area || null })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id;
}

export async function addStopToMemberItinerary(
  itineraryId: string,
  activitySlug: string,
  stopNote?: string
): Promise<void> {
  const { data: existing } = await supabaseAdmin
    .from("member_itinerary_stops")
    .select("stop_number")
    .eq("itinerary_id", itineraryId)
    .order("stop_number", { ascending: false })
    .limit(1);

  const nextStop = existing && existing.length > 0 ? existing[0].stop_number + 1 : 1;

  const { error } = await supabaseAdmin
    .from("member_itinerary_stops")
    .insert({ itinerary_id: itineraryId, activity_slug: activitySlug, stop_number: nextStop, stop_note: stopNote || null });

  if (error) throw new Error(error.message);
}

export async function removeStopFromMemberItinerary(stopId: string): Promise<void> {
  await supabaseAdmin.from("member_itinerary_stops").delete().eq("id", stopId);
}

export async function deleteMemberItinerary(id: string, memberId: string): Promise<void> {
  await supabaseAdmin
    .from("member_itineraries")
    .delete()
    .eq("id", id)
    .eq("member_id", memberId);
}
