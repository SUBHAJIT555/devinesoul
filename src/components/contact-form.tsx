"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ContactsContent } from "@/lib/types";

export function ContactForm({ form }: { form: ContactsContent["form"] }) {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <div className="rounded-[28px] border border-black/8 bg-white p-6 sm:p-8">
      <h2 className="text-[28px] font-medium tracking-[-0.03em]">{form.title}</h2>
      <p className="mt-2 max-w-md text-[15px] leading-6 text-zinc-600">{form.body}</p>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.p
            key="success"
            className="mt-8 rounded-2xl bg-[#dff2fe] px-4 py-4 text-[15px] leading-6 text-ink"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
          >
            {form.success}
          </motion.p>
        ) : (
          <motion.form
            key="form"
            className="mt-8 grid gap-4"
            onSubmit={onSubmit}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
          >
            <Field label="Name" name="name" type="text" required />
            <Field label="Email" name="email" type="email" required />
            <label className="grid gap-2 text-[13px] font-medium text-zinc-600">
              Topic
              <select
                name="topic"
                required
                className="h-11 rounded-xl border border-black/10 bg-white px-3 text-[15px] font-normal text-ink outline-none focus:border-accent"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose one
                </option>
                {form.topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-[13px] font-medium text-zinc-600">
              Message
              <textarea
                name="message"
                required
                rows={5}
                className="rounded-xl border border-black/10 px-3 py-3 text-[15px] font-normal text-ink outline-none focus:border-accent"
              />
            </label>
            <button
              type="submit"
              className="mt-2 inline-flex h-[45px] w-max shrink-0 cursor-pointer items-center justify-center gap-[7px] overflow-clip whitespace-nowrap rounded-[16px] bg-[#00a7f5] px-4 text-[15px] font-medium tracking-[-0.02em] text-white shadow-[inset_0_3px_0_0_rgba(255,255,255,0.2),0_2px_4px_0_rgba(6,147,255,0.25)] transition-colors hover:bg-[#00b0fa]"
            >
              {form.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-[13px] font-medium text-zinc-600">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="h-11 rounded-xl border border-black/10 px-3 text-[15px] font-normal text-ink outline-none focus:border-accent"
      />
    </label>
  );
}
