import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="text-3xl font-semibold text-stone-900">Moon Rope</h1>
      <div className="mt-6 flex gap-3">
        <Link
          href="/login"
          className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white"
        >
          Log In
        </Link>
        <Link
          href="/signup"
          className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-900"
        >
          Sign Up
        </Link>
        <Link
          href="/journal"
          className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-medium text-stone-900"
        >
          Journal
        </Link>
      </div>
    </main>
  );
}
