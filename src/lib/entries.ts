import { supabase } from "src/lib/supabase";
import { getCurrentMoonPosition } from "@/src/lib/moon";

export type Entry = {
  id: number;
  created_at: string;
  entry_date: string;
  gratitude: string | null;
  note: string | null;
  moon_sign: string | null;
  moon_degree: number | string | null;
};

type SaveEntryInput = {
  gratitude: string;
  note: string;
};

export async function getRecentEntries(limit = 10): Promise<Entry[]> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase
    .from("entries")
    .select(
      "id, created_at, gratitude, note, moon_sign, moon_degree, entry_date",
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Entry[];
}

export async function saveEntry({
  gratitude,
  note,
}: SaveEntryInput): Promise<void> {
  const moon = getCurrentMoonPosition();
  const now = new Date().toISOString();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase.from("entries").insert([
    {
      created_at: now,
      entry_date: now,
      gratitude,
      note,
      moon_sign: moon.moonSign,
      moon_degree: moon.moonDegree,
      user_id: user.id,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getEchoEntriesByMoonSign(moonSign: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not logged in");
  }
  const { data, error } = await supabase
    .from("entries")
    .select(
      "id, created_at, gratitude, note, moon_sign, moon_degree, entry_date",
    )
    .eq("moon_sign", moonSign)
    .eq("user_id", user.id)
    .order("entry_date", { ascending: false })
    .limit(4);

  if (error) {
    throw error;
  }

  return (data || []).slice(1, 4);
}
