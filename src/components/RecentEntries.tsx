import { ui } from "@/styles/ui";
import type { Entry } from "@/types";

type RecentEntriesProps = {
  entries: Entry[];
};

export default function RecentEntries({ entries }: RecentEntriesProps) {
  return (
    <section className={ui.layout.card}>
      <h2 className={ui.text.pageTitle}>Recent Entries</h2>
      <p className={ui.text.subtitle}>Your most recent journal entries.</p>

      {entries.length === 0 ? (
        <p className={ui.panel.empty}>No entries yet.</p>
      ) : (
        <ul className={ui.panel.list}>
          {entries.map((entry) => (
            <li key={entry.id} className={ui.panel.item}>
              <p className={ui.panel.itemTitle}>
                {new Date(entry.created_at).toLocaleString([], {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>

              <p className="mt-3 text-sm text-stone-300">
                <span className={ui.panel.itemLabel}>Gratitude:</span>{" "}
                {entry.gratitude || "—"}
              </p>

              <p className={ui.panel.itemText}>
                <span className={ui.panel.itemLabel}>Note:</span>{" "}
                {entry.note || "—"}
              </p>

              <p className={ui.panel.itemText}>
                <span className={ui.panel.itemLabel}>Moon Sign:</span>{" "}
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
