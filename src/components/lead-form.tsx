"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ContactsContent, OfferingKind } from "@/lib/types";

const fieldClass =
  "h-12 w-full rounded-2xl bg-mist px-4 text-[15px] font-normal text-ink outline-none focus:bg-white focus:shadow-[inset_0_0_0_1.5px_#00a7f5]";

export function LeadForm({
  form,
  offering,
  kind,
  choices,
}: {
  form: ContactsContent["form"];
  offering: string;
  kind: OfferingKind;
  choices?: string[];
}) {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [same, setSame] = useState(false);
  const [selected, setSelected] = useState(offering);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.p
          key="success"
          className="rounded-2xl bg-[#dff2fe] px-4 py-4 text-[15px] leading-6 text-ink"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
        >
          {form.success}
        </motion.p>
      ) : (
        <motion.form
          key="form"
          className="grid gap-4"
          onSubmit={onSubmit}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
        >
          {choices?.length ? (
            <label className="grid gap-1.5">
              <span className="font-meta text-[12px] leading-[18px] text-zinc-500">
                {kind === "course" ? "Course" : "Service"}
              </span>
              <select
                name={kind}
                value={selected}
                onChange={(event) => setSelected(event.target.value)}
                className={`${fieldClass} appearance-none`}
              >
                {choices.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <>
              <input type="hidden" name={kind} value={offering} />
              <div className="rounded-2xl bg-mist px-4 py-3">
                <p className="font-meta text-[12px] leading-[18px] text-zinc-500">{kind === "course" ? "Course" : "Service"}</p>
                <p className="mt-1 text-[16px] font-medium tracking-[-0.02em] text-ink">{offering}</p>
              </div>
            </>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className="font-meta text-[12px] leading-[18px] text-zinc-500">
                Name <span className="text-ink">*</span>
              </span>
              <input name="name" type="text" required className={fieldClass} />
            </label>
            <label className="grid gap-1.5">
              <span className="font-meta text-[12px] leading-[18px] text-zinc-500">Email</span>
              <input name="email" type="email" className={fieldClass} />
            </label>
            <label className="grid gap-1.5">
              <span className="font-meta text-[12px] leading-[18px] text-zinc-500">
                Contact number <span className="text-ink">*</span>
              </span>
              <input
                name="phone"
                type="tel"
                required
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                  if (same) setWhatsapp(event.target.value);
                }}
                className={fieldClass}
              />
            </label>
            <label className="grid gap-1.5">
              <span className="font-meta text-[12px] leading-[18px] text-zinc-500">WhatsApp number</span>
              <input
                name="whatsapp"
                type="tel"
                value={whatsapp}
                readOnly={same}
                onChange={(event) => setWhatsapp(event.target.value)}
                className={`${fieldClass} ${same ? "text-zinc-500" : ""}`}
              />
            </label>
          </div>
          <label className="flex cursor-pointer items-center gap-3 text-[14px] leading-5 text-ink">
            <input
              type="checkbox"
              name="whatsappSame"
              checked={same}
              onChange={(event) => {
                setSame(event.target.checked);
                if (event.target.checked) setWhatsapp(phone);
              }}
              className="peer sr-only"
            />
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-mist text-white shadow-[inset_0_0_0_1.5px_rgba(24,24,27,0.12)] peer-checked:bg-[#00a7f5] peer-checked:shadow-none peer-focus-visible:shadow-[inset_0_0_0_1.5px_#00a7f5]">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <path d="M3 8.5 6.2 12 13 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            WhatsApp number is the same as the contact number
          </label>
          <label className="grid gap-1.5">
            <span className="font-meta text-[12px] leading-[18px] text-zinc-500">Message</span>
            <textarea
              name="message"
              rows={5}
              placeholder={kind === "course" ? "Anything Priya should know before the course." : "Anything Priya should know before the sitting."}
              className="resize-none rounded-2xl bg-mist px-4 py-3 text-[15px] font-normal text-ink outline-none placeholder:text-zinc-400 focus:bg-white focus:shadow-[inset_0_0_0_1.5px_#00a7f5]"
            />
          </label>
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              className="inline-flex h-[45px] cursor-pointer items-center justify-center rounded-[16px] bg-[#00a7f5] px-4 text-[15px] font-medium tracking-[-0.02em] text-white shadow-[inset_0_3px_0_0_rgba(255,255,255,0.2),0_2px_4px_0_rgba(6,147,255,0.25)] transition-colors hover:bg-[#00b0fa]"
            >
              {form.submit}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
