"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createOrGetMember } from "@/lib/members";

export async function registerMember(formData: FormData) {
  const name  = (formData.get("name")  as string)?.trim();
  const email = (formData.get("email") as string)?.trim();

  if (!name || !email) throw new Error("Name and email are required.");

  const { token } = await createOrGetMember(name, email);

  const cookieStore = await cookies();
  cookieStore.set("member_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: "/",
  });

  redirect("/badge");
}
