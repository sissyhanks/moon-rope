import type { Entry } from "@/types";

type RecentEntriesProps = {
  entries: Entry[];
};

export default function RecentEntries({ entries }: RecentEntriesProps) {
  return (
    <>
      <h2 className="text-xl font-semibold text-stone-900">Recent Entries</h2>

      {entries.length === 0 ? (
        <p className="text-sm text-stone-500">No entries yet.</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((entry) => (
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
    </>
  );
}
