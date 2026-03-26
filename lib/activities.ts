import "server-only";
import { supabaseAdmin } from "./supabase-admin";
import { Activity, AgeGroup, Audience, Category, PriceRange } from "@/types";

// Convert Supabase snake_case row → Activity camelCase
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRow(r: any): Activity {
  return {
    slug:              r.slug,
    title:             r.title,
    shortDesc:         r.short_desc,
    description:       r.description,
    category:          r.category          as Category,
    tags:              r.tags              ?? [],
    ageGroups:         r.age_groups        as AgeGroup[],
    priceRange:        r.price_range       as PriceRange,
    priceNote:         r.price_note        ?? "",
    location: {
      lat:     r.lat,
      lng:     r.lng,
      address: r.address ?? "",
      area:    r.area    ?? "",
    },
    photos:            r.photos            ?? [],
    openingHours:      r.opening_hours     ?? undefined,
    website:           r.website           ?? undefined,
    phone:             r.phone             ?? undefined,
    featured:          r.featured          ?? false,
    popularity:        r.popularity        ?? 5,
    audience:          r.audience          as Audience,
    dropOff:           r.drop_off          ?? undefined,
    memberDiscount:    r.member_discount   ?? undefined,
    sessionType:       r.session_type      ?? undefined,
    sessionLengths:    r.session_lengths   ?? undefined,
    allDayOption:      r.all_day_option    ?? undefined,
    ageMin:            r.age_min           ?? undefined,
    ageMax:            r.age_max           ?? undefined,
    englishSpoken:     r.english_spoken    ?? undefined,
    hasFood:           r.has_food          ?? undefined,
    hasDrinks:         r.has_drinks        ?? undefined,
    legallyRegistered: r.legally_registered ?? undefined,
  };
}

export async function getAllActivities(): Promise<Activity[]> {
  const { data, error } = await supabaseAdmin
    .from("activities")
    .select("*")
    .order("popularity", { ascending: false });

  if (error) throw new Error(`getAllActivities: ${error.message}`);
  return (data ?? []).map(mapRow);
}

export async function getActivityBySlug(slug: string): Promise<Activity | undefined> {
  const { data, error } = await supabaseAdmin
    .from("activities")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return undefined;
  return mapRow(data);
}

export async function getFeaturedActivities(): Promise<Activity[]> {
  const { data, error } = await supabaseAdmin
    .from("activities")
    .select("*")
    .eq("featured", true)
    .order("popularity", { ascending: false });

  if (error) throw new Error(`getFeaturedActivities: ${error.message}`);
  return (data ?? []).map(mapRow);
}

export async function getKidActivities(): Promise<Activity[]> {
  const { data, error } = await supabaseAdmin
    .from("activities")
    .select("*")
    .eq("audience", "kids")
    .order("popularity", { ascending: false });

  if (error) throw new Error(`getKidActivities: ${error.message}`);
  return (data ?? []).map(mapRow);
}

export async function getFamilyActivities(): Promise<Activity[]> {
  const { data, error } = await supabaseAdmin
    .from("activities")
    .select("*")
    .eq("audience", "family")
    .order("popularity", { ascending: false });

  if (error) throw new Error(`getFamilyActivities: ${error.message}`);
  return (data ?? []).map(mapRow);
}
