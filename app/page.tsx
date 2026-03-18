"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";

import { getCurrentMoonPosition, type MoonPosition } from "@/src/lib/moon";
import { getRecentEntries, saveEntry, type Entry } from "@/src/lib/entries";
import { getEchoEntriesByMoonSign } from "@/src/lib/entries";

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
    <main style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1>Moon Rope Prototype</h1>
      <section>
        <h2>Moon in {moon?.moonSign ?? "..."}</h2>
        <p>{moon ? `${moon.moonDegree.toFixed(2)}°` : "..."}</p>
      </section>
      <p>Save a simple daily entry.</p>

      <form onSubmit={handleSave} style={{ display: "grid", gap: "1rem" }}>
        <div>
          <label htmlFor="gratitude">Gratitude</label>
          <br />
          <input
            id="gratitude"
            type="text"
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <div>
          <label htmlFor="note">Note</label>
          <br />
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={5}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>

        <button type="submit" style={{ padding: "0.75rem 1rem" }}>
          Save Entry
        </button>
      </form>

      {status && <p>{status}</p>}

      <hr style={{ margin: "2rem 0" }} />

      <h2>Echoes from past {moon?.moonSign ?? "..."} moons</h2>

      {echoEntries.length === 0 ? (
        <p>No echoes yet.</p>
      ) : (
        <ul style={{ paddingLeft: "1.25rem" }}>
          {echoEntries.map((entry) => (
            <li key={entry.id} style={{ marginBottom: "1rem" }}>
              <strong>
                {new Date(entry.created_at).toLocaleString([], {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </strong>
              <br />
              Gratitude: {entry.gratitude || "—"}
              <br />
              Note: {entry.note || "—"}
              <br />
              Moon Sign: {entry.moon_sign || "—"}
            </li>
          ))}
        </ul>
      )}

      <h2>Recent Entries</h2>

      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul style={{ paddingLeft: "1.25rem" }}>
          {entries.map((entry) => (
            <li key={entry.id} style={{ marginBottom: "1rem" }}>
              <strong>
                {new Date(entry.created_at).toLocaleString([], {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </strong>
              <br />
              Gratitude: {entry.gratitude || "—"}
              <br />
              Note: {entry.note || "—"}
              <br />
              Moon Sign: {entry.moon_sign || "—"}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
