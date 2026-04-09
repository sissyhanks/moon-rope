import { ui } from "@/styles/ui";
import type { Entry } from "@/types";

type EchoEntriesProps = {
  moonSign: string | undefined;
  echoEntries: Entry[];
};

export default function EchoEntries({
  moonSign,
  echoEntries,
}: EchoEntriesProps) {
  return (
    <section className={ui.layout.card}>
      <h2 className={ui.text.pageTitle}>
        Echoes from the previous {moonSign ?? "..."} moon
      </h2>
      <p className={ui.text.subtitle}>
        Entries from the last time the moon was in this sign.
      </p>

      {echoEntries.length === 0 ? (
        <p className="mt-6 text-sm text-stone-300">No echoes yet.</p>
      ) : (
        <ul className="mt-6 space-y-4">
          {echoEntries.map((entry) => (
            <li key={entry.id} className="rounded-2xl px-4 py-4">
              <p className="text-sm font-medium text-stone-200">
                {new Date(entry.created_at).toLocaleString([], {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>

              <p className="mt-3 text-sm text-stone-300">
                <span className="font-medium text-stone-200">Gratitude:</span>{" "}
                {entry.gratitude || "—"}
              </p>

              <p className="mt-1 text-sm text-stone-300">
                <span className="font-medium text-stone-200">Note:</span>{" "}
                {entry.note || "—"}
              </p>

              <p className="mt-1 text-sm text-stone-300">
                <span className="font-medium text-stone-200">Moon Sign:</span>{" "}
                {entry.moon_sign || "—"}
                {entry.moon_degree != null
                  ? ` ${Number(entry.moon_degree).toFixed(2)}°`
                  : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
