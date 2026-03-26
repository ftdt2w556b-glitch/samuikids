"use server";

import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function createTour(formData: FormData) {
  const title = (formData.get("title") as string).trim();
  const slug = toSlug(title);

  const { data, error } = await supabaseAdmin
    .from("tours")
    .insert({
      slug,
      title,
      description: formData.get("description") as string || null,
      area:         formData.get("area")        as string || null,
      duration_note: formData.get("duration_note") as string || null,
      active: true,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  redirect(`/admin/itineraries/${data.id}`);
}

export async function updateTour(id: string, formData: FormData) {
  const { error } = await supabaseAdmin
    .from("tours")
    .update({
      title:        formData.get("title")         as string,
      description:  formData.get("description")   as string || null,
      area:         formData.get("area")           as string || null,
      duration_note: formData.get("duration_note") as string || null,
      active:       formData.get("active") === "on",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  redirect(`/admin/itineraries/${id}`);
}

export async function deleteTour(id: string) {
  await supabaseAdmin.from("tours").delete().eq("id", id);
  redirect("/admin/itineraries");
}

export async function addTourStop(formData: FormData) {
  const tourId       = formData.get("tour_id")       as string;
  const activitySlug = formData.get("activity_slug") as string;
  const stopNote     = formData.get("stop_note")     as string || null;
  const stopNumber   = Number(formData.get("stop_number"));

  const { error } = await supabaseAdmin
    .from("tour_stops")
    .insert({ tour_id: tourId, activity_slug: activitySlug, stop_number: stopNumber, stop_note: stopNote });

  if (error) throw new Error(error.message);
  redirect(`/admin/itineraries/${tourId}`);
}

export async function removeTourStop(stopId: string, tourId: string) {
  await supabaseAdmin.from("tour_stops").delete().eq("id", stopId);
  redirect(`/admin/itineraries/${tourId}`);
}
