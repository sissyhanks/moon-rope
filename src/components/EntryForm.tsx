import { ui } from "@/styles/ui";

type EntryFormProps = {
  gratitude: string;
  note: string;
  setGratitude: (value: string) => void;
  setNote: (value: string) => void;
  handleSave: (e: React.FormEvent) => void;
  status: string;
};

export default function EntryForm({
  gratitude,
  note,
  setGratitude,
  setNote,
  handleSave,
  status,
}: EntryFormProps) {
  return (
    <div className={ui.layout.card}>
      <h2 className={ui.text.pageTitle}>New Entry</h2>
      <p className={ui.text.subtitle}>Record what is here today.</p>

      <form onSubmit={handleSave} className={ui.layout.formWithTopSpacing}>
        <div className={ui.layout.field}>
          <label className={ui.text.label}>Gratitude</label>
          <input
            type="text"
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            className={ui.input.text}
          />
        </div>

        <div className={ui.layout.field}>
          <label className={ui.text.label}>Note</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={4}
            className={ui.input.textarea}
          />
        </div>

        <button type="submit" className={ui.button.primary}>
          Save Entry
        </button>

        {status && <p className={ui.text.status}>{status}</p>}
      </form>
    </div>
  );
}
