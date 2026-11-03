"use client";

import { useCallback, useState } from "react";
import type { FormEvent } from "react";

export async function sendEnquiry(form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form).entries());
  const endpoint = process.env.NODE_ENV === "development" ? "http://127.0.0.1:8080/send.php" : "/mailer/send.php";
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const payload = (await response.json().catch(() => null)) as { error?: string } | null;
  if (!response.ok) {
    throw new Error(payload?.error || "Could not send the request.");
  }
}

export function useEnquirySubmit() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      await sendEnquiry(event.currentTarget);
      setSent(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not send the request.");
    } finally {
      setSending(false);
    }
  }, []);

  const reset = useCallback(() => {
    setSent(false);
    setError("");
  }, []);

  return { sent, sending, error, onSubmit, reset };
}

export function EnquiryHoneypot() {
  return <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />;
}

export function EnquiryError({ error }: { error: string }) {
  if (!error) return null;
  return <p className="rounded-2xl bg-[#ffedd4] px-4 py-3 text-[14px] leading-6 text-[#c2410c]">{error}</p>;
}
