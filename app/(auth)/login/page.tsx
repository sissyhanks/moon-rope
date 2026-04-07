"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/components/AppHeader";
import { getCurrentMoonPosition } from "@/lib/moon";
import { formatShortDate } from "@/lib/date";
import AuthForm from "@/components/AuthForm";
import { signInWithEmail } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [moonSign, setMoonSign] = useState<string | null>(null);

  useEffect(() => {
    const moon = getCurrentMoonPosition();
    setMoonSign(moon.moonSign);
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Logging in...");

    try {
      await signInWithEmail(email, password);
      setStatus("Logged in!");
      router.push("/journal");
    } catch (error) {
      if (error instanceof Error) {
        setStatus(`Login error: ${error.message}`);
      } else {
        setStatus("Login error: Something went wrong");
      }
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <AppHeader
        moonSign={moonSign}
        dateText={formatShortDate()}
        rightLabel="Sign Up"
        rightHref="/signup"
      />
      <AuthForm
        title="Log In"
        subtitle="Enter your email and password to continue."
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleLogin}
        submitLabel="Log In"
        status={status}
      />
    </main>
  );
}
