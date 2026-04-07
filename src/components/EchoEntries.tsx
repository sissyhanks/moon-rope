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
    <section className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-stone-900">
          Echoes from the previous {moonSign ?? "..."} moon
        </h2>
        <p className="mt-1 text-sm text-stone-600">
          Entries from the last time the moon was in this sign.
        </p>
      </div>

      {echoEntries.length === 0 ? (
        <p className="text-sm text-stone-500">No echoes yet.</p>
      ) : (
        <ul className="space-y-3">
          {echoEntries.map((entry) => (
            <li key={entry.id} className="rounded-2xl bg-stone-50 px-4 py-3">
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
                <span className="font-medium text-stone-900">Gratitude:</span>{" "}
                {entry.gratitude || "—"}
              </p>
              <p className="mt-1 text-sm text-stone-700">
                <span className="font-medium text-stone-900">Note:</span>{" "}
                {entry.note || "—"}
              </p>
              <p className="mt-1 text-sm text-stone-700">
                <span className="font-medium text-stone-900">Moon Sign:</span>{" "}
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
