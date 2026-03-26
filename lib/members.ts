import "server-only";
import { supabaseAdmin } from "./supabase-admin";

export interface Member {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export async function createOrGetMember(
  name: string,
  email: string
): Promise<{ token: string; member: Member; isNew: boolean }> {
  const lowerEmail = email.toLowerCase().trim();

  // Check if already registered
  const { data: existing } = await supabaseAdmin
    .from("members")
    .select("*")
    .eq("email", lowerEmail)
    .single();

  if (existing) {
    return {
      token: existing.session_token,
      member: {
        id: existing.id,
        email: existing.email,
        name: existing.name,
        createdAt: existing.created_at,
      },
      isNew: false,
    };
  }

  const { data, error } = await supabaseAdmin
    .from("members")
    .insert({ name: name.trim(), email: lowerEmail })
    .select("*")
    .single();

  if (error) throw new Error(error.message);

  return {
    token: data.session_token,
    member: {
      id: data.id,
      email: data.email,
      name: data.name,
      createdAt: data.created_at,
    },
    isNew: true,
  };
}

export async function getMemberByToken(token: string): Promise<Member | null> {
  const { data } = await supabaseAdmin
    .from("members")
    .select("id, email, name, created_at")
    .eq("session_token", token)
    .single();

  if (!data) return null;
  return {
    id: data.id,
    email: data.email,
    name: data.name,
    createdAt: data.created_at,
  };
}
