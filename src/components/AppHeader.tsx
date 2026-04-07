import Link from "next/link";

type AppHeaderProps = {
  moonSign?: string | null;
  dateText: string;
  rightLabel?: string;
  rightHref?: string;
  rightContent?: React.ReactNode;
};

export default function AppHeader({
  moonSign,
  dateText,
  rightLabel,
  rightHref,
  rightContent,
}: AppHeaderProps) {
  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <header className="mb-6">
        <h1
          // className="mx-auto max-w-md p-6"
          className="text-center text-3xl font-semibold text-stone-900"
        >
          Moon Rope
        </h1>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div className="text-left">
            <p className="text-sm font-medium text-stone-900">
              Moon in {moonSign ?? "..."}
            </p>
            <p className="mt-1 text-sm text-stone-600">{dateText}</p>
          </div>

          <div className="text-right">
            {rightContent ? (
              rightContent
            ) : rightLabel && rightHref ? (
              <Link
                href={rightHref}
                className="text-sm font-medium text-stone-700 underline-offset-4 hover:underline"
              >
                {rightLabel}
              </Link>
            ) : null}
          </div>
        </div>
      </header>
    </div>
  );
}
