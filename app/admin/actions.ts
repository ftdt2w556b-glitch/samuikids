"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function login(formData: FormData) {
  const password = formData.get("password") as string;
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });
    redirect("/admin");
  } else {
    redirect("/admin/login?error=1");
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

export async function updateActivity(slug: string, formData: FormData) {
  const row = {
    title:             formData.get("title")            as string,
    short_desc:        formData.get("short_desc")       as string,
    description:       formData.get("description")      as string,
    category:          formData.get("category")         as string,
    price_range:       formData.get("price_range")      as string,
    price_note:        formData.get("price_note")       as string,
    area:              formData.get("area")             as string,
    address:           formData.get("address")          as string,
    opening_hours:     formData.get("opening_hours")    as string || null,
    website:           formData.get("website")          as string || null,
    phone:             formData.get("phone")            as string || null,
    audience:          formData.get("audience")         as string,
    featured:          formData.get("featured")          === "on",
    member_discount:   formData.get("member_discount")   === "on",
    english_spoken:    formData.get("english_spoken")    === "on",
    has_food:          formData.get("has_food")          === "on",
    has_drinks:        formData.get("has_drinks")        === "on",
    all_day_option:    formData.get("all_day_option")    === "on",
    booking_required:  formData.get("booking_required")  === "on",
    legally_registered: formData.get("legally_registered") === "on",
    air_conditioned:   formData.get("air_conditioned")   === "on",
    indoor:            formData.get("indoor")            === "on",
    nanny_welcome:     formData.get("nanny_welcome")     === "on",
    session_type:      formData.get("session_type")     as string || null,
    age_min:           formData.get("age_min")          ? Number(formData.get("age_min"))  : null,
    age_max:           formData.get("age_max")          ? Number(formData.get("age_max"))  : null,
    member_offer:      formData.get("member_offer")     as string || null,
  };

  // Update primary image if a new one was selected
  const primaryImage = formData.get("primary_image") as string;
  if (primaryImage) {
    (row as Record<string, unknown>).photos = [primaryImage];
  }

  const { error } = await supabaseAdmin
    .from("activities")
    .update(row)
    .eq("slug", slug);

  if (error) throw new Error(error.message);
  redirect("/admin");
}
