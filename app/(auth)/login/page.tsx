"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { signInWithEmail } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

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
  );
}
