"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";

import { getCurrentMoonPosition, type MoonPosition } from "@/src/lib/moon";
import { getRecentEntries, saveEntry, type Entry } from "@/src/lib/entries";
import { getEchoEntriesByMoonSign } from "@/src/lib/entries";

const {
  data: { user },
} = await supabase.auth.getUser();

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gratitude, setGratitude] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("");
  const [entries, setEntries] = useState<Entry[]>([]);
  const [moon, setMoon] = useState<MoonPosition | null>(null);
  const [echoEntries, setEchoEntries] = useState<Entry[]>([]);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const loadMoon = async () => {
      const moonData = await getCurrentMoonPosition();
      setMoon(moonData);
    };

    loadMoon();
  }, []);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    loadUser();
  }, []);

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus(`Login error: ${error.message}`);
    } else {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setStatus("Logged in!");
    }
  }

  async function handleSignUp() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error(error.message);
    } else {
      console.log("Signed up!");
    }
  }

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setStatus(`Logout error: ${error.message}`);
    } else {
      setStatus("Logged out.");
      setEntries([]);
      setEchoEntries([]);
    }
  }

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

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setStatus(`Signup error: ${error.message}`);
    } else {
      setStatus(
        "Signup successful! Check your email if confirmation is enabled.",
      );
    }
  }

  if (!user) {
    return (
      <main className="min-h-screen px-6 py-10">
        <div className="mx-auto max-w-md">
          <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
            <div className="mb-6 space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
                Moon Rope
              </h1>
              <p className="text-sm text-stone-600">
                Log in to enter and revisit your moon-marked memories.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-stone-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-stone-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleLogin}
                  className="flex-1 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
                >
                  Log In
                </button>
                <button
                  onClick={handleSignup}
                  className="flex-1 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 transition hover:bg-stone-50"
                >
                  Sign Up
                </button>
              </div>

              {status && (
                <p className="rounded-xl bg-stone-100 px-3 py-2 text-sm text-stone-700">
                  {status}
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    );
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

          <button
            onClick={handleLogout}
            className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
          >
            Log Out
          </button>
        </header>

        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
            Current Moon
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-stone-900">
                Moon in {moon?.moonSign ?? "..."}
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                The current sky context attached to new entries.
              </p>
            </div>
            <p className="text-3xl font-medium tabular-nums text-stone-900">
              {moon ? `${moon.moonDegree.toFixed(2)}°` : "..."}
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-stone-900">New Entry</h2>
            <p className="mt-1 text-sm text-stone-600">
              Record a moment and let the app attach the moon sign
              automatically.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label
                htmlFor="gratitude"
                className="mb-1 block text-sm font-medium text-stone-700"
              >
                Gratitude
              </label>
              <input
                id="gratitude"
                type="text"
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
              />
            </div>

            <div>
              <label
                htmlFor="note"
                className="mb-1 block text-sm font-medium text-stone-700"
              >
                Note
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={5}
                className="w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-300"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                className="rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Save Entry
              </button>

              {status && <p className="text-sm text-stone-600">{status}</p>}
            </div>
          </form>
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-stone-900">
              Echoes from earlier {moon?.moonSign ?? "..."} moons
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Past entries from the previous visit of this moon sign.
            </p>
          </div>

          {echoEntries.length === 0 ? (
            <p className="text-sm text-stone-500">No echoes yet.</p>
          ) : (
            <ul className="space-y-3">
              {echoEntries.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-2xl bg-stone-50 px-4 py-3"
                >
                  <p className="text-sm font-medium text-stone-900">
                    {new Date(entry.created_at).toLocaleString([], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="mt-2 text-sm text-stone-700">
                    <span className="font-medium text-stone-900">
                      Gratitude:
                    </span>{" "}
                    {entry.gratitude || "—"}
                  </p>
                  <p className="mt-1 text-sm text-stone-700">
                    <span className="font-medium text-stone-900">Note:</span>{" "}
                    {entry.note || "—"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-stone-900">
              Recent Entries
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Your most recent saved moments with their moon sign context.
            </p>
          </div>

          {entries.length === 0 ? (
            <p className="text-sm text-stone-500">No entries yet.</p>
          ) : (
            <ul className="space-y-3">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-2xl bg-stone-50 px-4 py-3"
                >
                  <p className="text-sm font-medium text-stone-900">
                    {new Date(entry.created_at).toLocaleString([], {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="mt-2 text-sm text-stone-700">
                    <span className="font-medium text-stone-900">
                      Gratitude:
                    </span>{" "}
                    {entry.gratitude || "—"}
                  </p>
                  <p className="mt-1 text-sm text-stone-700">
                    <span className="font-medium text-stone-900">Note:</span>{" "}
                    {entry.note || "—"}
                  </p>
                  <p className="mt-1 text-sm text-stone-700">
                    <span className="font-medium text-stone-900">
                      Moon Sign:
                    </span>{" "}
                    {entry.moon_sign || "—"}
                    {entry.moon_degree != null
                      ? `${Number(entry.moon_degree).toFixed(2)}°`
                      : ""}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
//   if (!user) {
//     if (!user) {
//       return (
//         <main style={{ padding: "2rem", maxWidth: "500px" }}>
//           <h1>Moon Rope</h1>
//           <section>
//             <h2>Moon in {moon?.moonSign ?? "..."}</h2>
//             <p>{moon ? `${moon.moonDegree.toFixed(2)}°` : "..."}</p>
//           </section>
//           <p>Please log in to continue.</p>

//           <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
//             <div>
//               <label htmlFor="email">Email</label>
//               <br />
//               <input
//                 id="email"
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 style={{ width: "100%", padding: "0.5rem" }}
//               />
//             </div>

//             <div>
//               <label htmlFor="password">Password</label>
//               <br />
//               <input
//                 id="password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 style={{ width: "100%", padding: "0.5rem" }}
//               />
//             </div>

//             <div style={{ display: "flex", gap: "0.75rem" }}>
//               <button onClick={handleLogin}>Log In</button>
//               <button onClick={handleSignup}>Sign Up</button>
//             </div>

//             {status && <p>{status}</p>}
//           </div>
//         </main>
//       );
//     }
//   }

//   return (
//     <main style={{ padding: "2rem", maxWidth: "600px" }}>
//       <h1>Moon Rope Prototype</h1>
//       <section>
//         <h2>Moon in {moon?.moonSign ?? "..."}</h2>
//         <p>{moon ? `${moon.moonDegree.toFixed(2)}°` : "..."}</p>
//       </section>
//       <p>Save a simple daily entry.</p>
//       <form onSubmit={handleSave} style={{ display: "grid", gap: "1rem" }}>
//         <div>
//           <label htmlFor="gratitude">Gratitude</label>
//           <br />
//           <input
//             id="gratitude"
//             type="text"
//             value={gratitude}
//             onChange={(e) => setGratitude(e.target.value)}
//             style={{ width: "100%", padding: "0.5rem" }}
//           />
//         </div>

//         <div>
//           <label htmlFor="note">Note</label>
//           <br />
//           <textarea
//             id="note"
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//             rows={5}
//             style={{ width: "100%", padding: "0.5rem" }}
//           />
//         </div>

//         <button type="submit" style={{ padding: "0.75rem 1rem" }}>
//           Save Entry
//         </button>
//       </form>
//       {status && <p>{status}</p>}
//       <hr style={{ margin: "2rem 0" }} />
//       <h2>Echoes from past {moon?.moonSign ?? "..."} moons</h2>
//       {echoEntries.length === 0 ? (
//         <p>No echoes yet.</p>
//       ) : (
//         <ul style={{ paddingLeft: "1.25rem" }}>
//           {echoEntries.map((entry) => (
//             <li key={entry.id} style={{ marginBottom: "1rem" }}>
//               <strong>
//                 {new Date(entry.created_at).toLocaleString([], {
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                   hour: "numeric",
//                   minute: "2-digit",
//                 })}
//               </strong>
//               <br />
//               Gratitude: {entry.gratitude || "—"}
//               <br />
//               Note: {entry.note || "—"}
//               <br />
//               Moon Sign: {entry.moon_sign || "—"}
//             </li>
//           ))}
//         </ul>
//       )}
//       <h2>Recent Entries</h2>
//       {entries.length === 0 ? (
//         <p>No entries yet.</p>
//       ) : (
//         <ul style={{ paddingLeft: "1.25rem" }}>
//           {entries.map((entry) => (
//             <li key={entry.id} style={{ marginBottom: "1rem" }}>
//               <strong>
//                 {new Date(entry.created_at).toLocaleString([], {
//                   year: "numeric",
//                   month: "short",
//                   day: "numeric",
//                   hour: "numeric",
//                   minute: "2-digit",
//                 })}
//               </strong>
//               <br />
//               Gratitude: {entry.gratitude || "—"}
//               <br />
//               Note: {entry.note || "—"}
//               <br />
//               Moon Sign: {entry.moon_sign || "—"}
//             </li>
//           ))}
//         </ul>
//       )}
//     </main>
//   );
