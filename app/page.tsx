"use client";

import { useState } from "react";
import { supabase } from "@/src/lib/supabase";

export default function Home() {
  const [gratitude, setGratitude] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

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
      setStatus(error.message);
      return;
    }

    setStatus("Saved!");
    setGratitude("");
    setNote("");
  }

  return (
    <main style={{ padding: "2rem", maxWidth: "600px" }}>
      <h1>Moon Rope Prototype</h1>
      <form onSubmit={handleSave}>
        <div>
          <label>Gratitude</label>
          <input
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
          />
        </div>

        <div>
          <label>Note</label>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <button type="submit">Save Entry</button>
      </form>
      {status && <p>{status}</p>}
    </main>
  );
}
