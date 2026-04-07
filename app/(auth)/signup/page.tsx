"use client";

import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import AuthForm from "@/components/AuthForm";
import { signUpWithEmail } from "@/lib/auth";
import { getCurrentMoonPosition } from "@/lib/moon";
import { formatShortDate } from "@/lib/date";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [moonSign, setMoonSign] = useState<string | null>(null);

  useEffect(() => {
    const moon = getCurrentMoonPosition();
    setMoonSign(moon.moonSign);
  }, []);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Signing up...");

    try {
      await signUpWithEmail(email, password);
      setStatus(
        "Signup successful! Check your email if confirmation is enabled.",
      );
    } catch (error) {
      if (error instanceof Error) {
        setStatus(`Signup error: ${error.message}`);
      } else {
        setStatus("Signup error: Something went wrong");
      }
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <AppHeader
        moonSign={moonSign}
        dateText={formatShortDate()}
        rightLabel="Log In"
        rightHref="/login"
      />
      <AuthForm
        title="Sign Up"
        subtitle="Create an account to start journaling."
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSignup}
        submitLabel="Sign Up"
        status={status}
      />
    </main>
  );
}
