"use client";

import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { signUpWithEmail } from "@/lib/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

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
  );
}
