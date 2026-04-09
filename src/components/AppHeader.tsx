import Link from "next/link";
import { ui } from "@/styles/ui";

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
    <header className={ui.header.layout.card}>
      <h1 className={ui.header.text.heading}>Moon Rope</h1>

      <div className={ui.header.layout.headerRow}>
        <div className="min-w-0 text-left">
          <p className={ui.header.text.moonIn}>Moon in {moonSign ?? "..."}</p>
          <p className={ui.header.text.date}>{dateText}</p>
        </div>

        <div className="min-w-0 text-right">
          {rightContent ? (
            rightContent
          ) : rightLabel && rightHref ? (
            <Link href={rightHref} className={ui.header.text.signup}>
              {rightLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
