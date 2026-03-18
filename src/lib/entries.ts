import { supabase } from "src/lib/supabase";
import { getCurrentMoonPosition } from "@/src/lib/moon";

type SaveEntryInput = {
  gratitude: string;
  note: string;
};

export async function getRecentEntries() {
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .order("entry_date", { ascending: false })
    .limit(5);

  if (error) throw error;
  return data;
}

export async function saveEntry({
  gratitude,
  note,
}: {
  gratitude: string;
  note: string;
}) {
  const moon = await getCurrentMoonPosition();

  const { data, error } = await supabase.from("entries").insert([
    {
      entry_date: new Date().toISOString(),
      gratitude,
      note,
      moon_sign: moon.moonSign,
      moon_degree: moon.moonDegree,
    },
  ]);

  if (error) throw error;
  return data;
}
