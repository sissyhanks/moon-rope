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
    <form onSubmit={handleSave} className="grid gap-4">
      <div>
        <label className="text-sm font-medium text-stone-700">Gratitude</label>
        <input
          type="text"
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
          className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-stone-700">Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white"
      >
        Save Entry
      </button>

      {status && <p className="text-sm text-stone-500">{status}</p>}
    </form>
  );
}
