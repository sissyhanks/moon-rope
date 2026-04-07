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
    <main className="mx-auto max-w-md p-6">
      <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-stone-900">{title}</h1>
        <p className="mt-2 text-sm text-stone-600">{subtitle}</p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div>
            <label className="text-sm font-medium text-stone-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-xl border border-stone-200 px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white"
          >
            {submitLabel}
          </button>

          {status && <p className="text-sm text-stone-500">{status}</p>}
        </form>
      </div>
    </main>
  );
}
