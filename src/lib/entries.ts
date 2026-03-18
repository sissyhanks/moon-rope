import { supabase } from "src/lib/supabase";
import { getCurrentMoonPosition } from "@/src/lib/moon";

export type Entry = {
  id: number;
  created_at: string;
  entry_date: string;
  gratitude: string | null;
  note: string | null;
  moon_sign: string | null;
  moon_degree: string | null;
};

type SaveEntryInput = {
  gratitude: string;
  note: string;
};

export async function getRecentEntries(limit = 10): Promise<Entry[]> {
  const { data, error } = await supabase
    .from("entries")
    .select(
      "id, created_at, gratitude, note, moon_sign, moon_degree, entry_date",
    )
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

  const { error } = await supabase.from("entries").insert([
    {
      created_at: now,
      entry_date: now,
      gratitude,
      note,
      moon_sign: moon.moonSign,
      moon_degree: moon.moonDegree,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getEchoEntriesByMoonSign(moonSign: string) {
  const { data, error } = await supabase
    .from("entries")
    .select(
      "id, created_at, gratitude, note, moon_sign, moon_degree, entry_date",
    )
    .eq("moon_sign", moonSign)
    .order("entry_date", { ascending: false })
    .limit(4);

  if (error) {
    throw error;
  }

  return (data || []).slice(1, 4);
}
