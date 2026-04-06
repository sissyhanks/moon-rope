import { MoonPosition } from "@/lib/moon";

type MoonClockProps = {
  moon: MoonPosition | null;
};

export default function MoonClock({ moon }: MoonClockProps) {
  return (
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
  );
}
