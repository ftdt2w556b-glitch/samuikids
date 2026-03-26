"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMemberByToken } from "@/lib/members";
import {
  createMemberItinerary,
  addStopToMemberItinerary,
  removeStopFromMemberItinerary,
  deleteMemberItinerary,
} from "@/lib/member-itineraries";

async function requireMember() {
  const cookieStore = await cookies();
  const token = cookieStore.get("member_session")?.value;
  if (!token) redirect("/join");
  const member = await getMemberByToken(token);
  if (!member) redirect("/join");
  return member;
}

export async function createItinerary(formData: FormData) {
  const member = await requireMember();
  const title = (formData.get("title") as string).trim();
  const area  = (formData.get("area")  as string).trim();
  const id = await createMemberItinerary(member.id, title, area || undefined);
  redirect(`/member/itineraries/${id}`);
}

export async function addStop(formData: FormData) {
  await requireMember();
  const itineraryId  = formData.get("itinerary_id")  as string;
  const activitySlug = formData.get("activity_slug") as string;
  const stopNote     = formData.get("stop_note")     as string;
  await addStopToMemberItinerary(itineraryId, activitySlug, stopNote || undefined);
  redirect(`/member/itineraries/${itineraryId}`);
}

export async function removeStop(stopId: string, itineraryId: string) {
  await requireMember();
  await removeStopFromMemberItinerary(stopId);
  redirect(`/member/itineraries/${itineraryId}`);
}

export async function deleteItinerary(id: string) {
  const member = await requireMember();
  await deleteMemberItinerary(id, member.id);
  redirect("/member");
}
