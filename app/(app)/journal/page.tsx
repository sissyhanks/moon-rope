// export default function JournalPage() {
//   return (
//     <main className="mx-auto max-w-3xl p-6">
//       <h1 className="text-2xl font-semibold text-stone-900">Journal</h1>
//       <p className="mt-2 text-sm text-stone-600">Journal app goes here.</p>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

import { getCurrentMoonPosition, type MoonPosition } from "@/lib/moon";
import {
  getRecentEntries,
  saveEntry,
  getEchoEntriesByMoonSign,
} from "@/lib/entries";
import type { Entry } from "@/types";

import { MoonClock, EntryForm, RecentEntries, EchoEntries } from "@/components";

const {
  data: { user },
} = await supabase.auth.getUser();

export default function Home() {
  const [gratitude, setGratitude] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [moon, setMoon] = useState<MoonPosition | null>(null);
  const [echoEntries, setEchoEntries] = useState<Entry[]>([]);

  useEffect(() => {
    const loadMoon = async () => {
      const moonData = await getCurrentMoonPosition();
      setMoon(moonData);
    };

    loadMoon();
  }, []);

  async function loadEntries() {
    try {
      const data = await getRecentEntries(10);
      setEntries(data);
    } catch (error) {
      if (error instanceof Error) {
        setStatus(`Load error: ${error.message}`);
      } else {
        setStatus("Load error: Something went wrong");
      }
    }
  }

  useEffect(() => {
    loadEntries();
  }, []);

  async function loadEchoEntries(moonSign: string) {
    try {
      const data = await getEchoEntriesByMoonSign(moonSign);
      setEchoEntries(data);
    } catch (error) {
      if (error instanceof Error) {
        setStatus(`Echo load error: ${error.message}`);
      } else {
        setStatus("Echo load error: Something went wrong");
      }
    }
  }

  useEffect(() => {
    if (!moon?.moonSign) return;
    loadEchoEntries(moon.moonSign);
  }, [moon]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");

    try {
      await saveEntry({ gratitude, note });

      setStatus("Saved!");
      setGratitude("");
      setNote("");
      await loadEntries();
      if (moon?.moonSign) {
        await loadEchoEntries(moon.moonSign);
      }
    } catch (error) {
      if (error instanceof Error) {
        setStatus(`Save error: ${error.message}`);
      } else {
        setStatus("Save error: Something went wrong");
      }
    }
  }

  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
              Moon Rope Prototype
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
              Journal with lunar context
            </h1>
            <p className="text-sm text-stone-600">
              Save a daily entry and revisit echoes from earlier moons of the
              same sign.
            </p>
          </div>

          {/* <button
            onClick={handleLogout}
            className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            Log Out
          </button> */}
        </header>

        <MoonClock moon={moon} />

        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-stone-900">New Entry</h2>
            <p className="mt-1 text-sm text-stone-600">
              Record a moment and let the app attach the moon sign
              automatically.
            </p>
          </div>

          <EntryForm
            gratitude={gratitude}
            note={note}
            setGratitude={setGratitude}
            setNote={setNote}
            handleSave={handleSave}
            status={status}
          />
        </section>

        <EchoEntries moonSign={moon?.moonSign} echoEntries={echoEntries} />

        <RecentEntries entries={entries} />
      </div>
    </main>
  );
}
