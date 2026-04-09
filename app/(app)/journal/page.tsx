"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, signOutUser } from "@/lib/auth";
import { getCurrentMoonPosition, type MoonPosition } from "@/lib/moon";
import {
  getRecentEntries,
  saveEntry,
  getEchoEntriesByMoonSign,
} from "@/lib/entries";
import { formatShortDate } from "@/lib/date";
import type { Entry } from "@/types";
import AppHeader from "@/components/AppHeader";
import { EntryForm, RecentEntries, EchoEntries } from "@/components";

export default function JournalPage() {
  const router = useRouter();

  const [user, setUser] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [gratitude, setGratitude] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [echoEntries, setEchoEntries] = useState<Entry[]>([]);
  const [moon, setMoon] = useState<MoonPosition | null>(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
          router.push("/login");
        } else {
          setUser(currentUser);
        }
      } catch (error) {
        router.push("/login");
      } finally {
        setAuthLoading(false);
      }
    }

    checkUser();
  }, [router]);

  useEffect(() => {
    const loadMoon = async () => {
      const moonData = await getCurrentMoonPosition();
      setMoon(moonData);
    };

    loadMoon();
  }, []);

  useEffect(() => {
    if (!authLoading && user) {
      loadEntries();
    }
  }, [authLoading, user]);

  useEffect(() => {
    if (!moon?.moonSign || !user) return;
    loadEchoEntries(moon.moonSign);
  }, [moon, user]);

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

  async function handleLogout() {
    try {
      await signOutUser();
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        setStatus(`Logout error: ${error.message}`);
      } else {
        setStatus("Logout error: Something went wrong");
      }
    }
  }

  if (authLoading) {
    return (
      <main className="mx-auto max-w-md px-4 py-6">
        <p className="text-sm text-stone-500">Loading...</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <AppHeader
        moonSign={moon?.moonSign}
        dateText={formatShortDate()}
        rightContent={
          <button
            onClick={handleLogout}
            className="text-sm font-medium leading-none text-stone-200 underline-offset-4 hover:underline"
          >
            Log Out
          </button>
        }
      />

      <div className="mt-6 space-y-6">
        <EntryForm
          gratitude={gratitude}
          note={note}
          setGratitude={setGratitude}
          setNote={setNote}
          handleSave={handleSave}
          status={status}
        />
        <EchoEntries moonSign={moon?.moonSign} echoEntries={echoEntries} />
        <RecentEntries entries={entries} />
      </div>
    </main>
  );
}
