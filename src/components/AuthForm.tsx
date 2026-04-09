import { ui } from "@/styles/ui";

type AuthFormProps = {
  title: string;
  subtitle: string;
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  submitLabel: string;
  status: string;
};

export default function AuthForm({
  title,
  subtitle,
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  submitLabel,
  status,
}: AuthFormProps) {
  return (
    <div className={ui.layout.card}>
      <h1 className={ui.text.pageTitle}>{title}</h1>
      <p className={ui.text.subtitle}>{subtitle}</p>

      <form onSubmit={handleSubmit} className={ui.layout.formWithTopSpacing}>
        <div className={ui.layout.field}>
          <label className={ui.text.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={ui.input.text}
          />
        </div>

        <div className={ui.layout.field}>
          <label className={ui.text.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={ui.input.text}
          />
        </div>

        <button type="submit" className={ui.button.primary}>
          {submitLabel}
        </button>

        {status && <p className={ui.text.status}>{status}</p>}
      </form>
    </div>
  );
}
