"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";

type Entry = {
  id: number;
  entry_date: string;
  gratitude: string | null;
  note: string | null;
  moon_sign: string | null;
};

export default function Home() {
  const [gratitude, setGratitude] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);

  async function loadEntries() {
    const { data, error } = await supabase
      .from("entries")
      .select("id, entry_date, gratitude, note, moon_sign")
      .order("entry_date", { ascending: false })
      .limit(10);

    if (error) {
      setStatus(`Load error: ${error.message}`);
      return;
    }

    setEntries(data || []);
  }

  useEffect(() => {
    loadEntries();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");

    const { error } = await supabase.from("entries").insert([
      {
        entry_date: new Date().toISOString().split("T")[0],
        gratitude,
        note,
        moon_sign: "TBD",
        moon_degree: null,
      },
    ]);

    if (error) {
      setStatus(`Save error: ${error.message}`);
      return;
    }

    setStatus("Saved!");
    setGratitude("");
    setNote("");
    loadEntries();
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1>Moon Rope Prototype</h1>
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

      <h2>Recent Entries</h2>

      {entries.length === 0 ? (
        <p>No entries yet.</p>
      ) : (
        <ul style={{ paddingLeft: "1.25rem" }}>
          {entries.map((entry) => (
            <li key={entry.id} style={{ marginBottom: "1rem" }}>
              <strong>{new Date(entry.entry_date).toLocaleString()}</strong>
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
