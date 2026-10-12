"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ContactsContent } from "@/lib/types";

const fieldClass =
  "h-12 w-full rounded-2xl bg-mist px-4 text-[15px] font-normal text-ink outline-none focus:bg-white focus:shadow-[inset_0_0_0_1.5px_#00a7f5]";

export function ContactForm({
  form,
  services,
  courses,
  products,
}: {
  form: ContactsContent["form"];
  services: string[];
  courses: string[];
  products: string[];
}) {
  const reduce = useReducedMotion();
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [same, setSame] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  function onPhone(value: string) {
    setPhone(value);
    if (same) setWhatsapp(value);
  }

  function onSame(checked: boolean) {
    setSame(checked);
    if (checked) setWhatsapp(phone);
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
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" type="text" required />
              <Field label="Email" name="email" type="email" />
              <Field label="Contact number" name="phone" type="tel" required value={phone} onChange={onPhone} />
              <Field
                label="WhatsApp number"
                name="whatsapp"
                type="tel"
                value={whatsapp}
                readOnly={same}
                onChange={setWhatsapp}
              />
            </div>
            <label className="flex cursor-pointer items-center gap-3 text-[14px] leading-5 text-ink">
              <input
                type="checkbox"
                name="whatsappSame"
                checked={same}
                onChange={(event) => onSame(event.target.checked)}
                className="peer sr-only"
              />
              <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-mist text-white shadow-[inset_0_0_0_1.5px_rgba(24,24,27,0.12)] peer-checked:bg-[#00a7f5] peer-checked:shadow-none peer-focus-visible:shadow-[inset_0_0_0_1.5px_#00a7f5]">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                  <path d="M5 12.5 9.2 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              WhatsApp number is the same as the contact number
            </label>
            <div className="grid gap-4 lg:grid-cols-3">
              <Menu label="Services" name="service" options={services} open={openMenu === "service"} onOpen={() => setOpenMenu("service")} onClose={() => setOpenMenu(null)} />
              <Menu label="Courses" name="course" options={courses} open={openMenu === "course"} onOpen={() => setOpenMenu("course")} onClose={() => setOpenMenu(null)} />
              <Menu label="Products" name="product" options={products} open={openMenu === "product"} onOpen={() => setOpenMenu("product")} onClose={() => setOpenMenu(null)} />
            </div>
            <label className="grid gap-1.5">
              <span className="font-meta text-[12px] leading-[18px] text-zinc-500">Message</span>
              <textarea
                name="message"
                rows={5}
                placeholder="Anything Priya should know."
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

function Field({
  label,
  name,
  type,
  required,
  value,
  readOnly,
  onChange,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  value?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="font-meta text-[12px] leading-[18px] text-zinc-500">
        {label}
        {required ? <span className="text-ink"> *</span> : null}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        readOnly={readOnly}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        className={`${fieldClass} ${readOnly ? "text-zinc-500" : ""}`}
      />
    </label>
  );
}

function Menu({
  label,
  name,
  options,
  open,
  onOpen,
  onClose,
}: {
  label: string;
  name: string;
  options: string[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const [value, setValue] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) onClose();
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div ref={rootRef} className="relative grid gap-1.5">
      <span id={`${name}-label`} className="font-meta text-[12px] leading-[18px] text-zinc-500">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${name}-label`}
        onClick={() => (open ? onClose() : onOpen())}
        className={`${fieldClass} flex items-center justify-between gap-3 text-left ${open ? "bg-white shadow-[inset_0_0_0_1.5px_#00a7f5]" : ""}`}
      >
        <span className={`truncate ${value ? "text-ink" : "text-zinc-400"}`}>{value || "Choose one"}</span>
        <svg viewBox="0 0 24 24" className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <input type="hidden" name={name} value={value} />
      {open ? (
        <ul
          role="listbox"
          aria-labelledby={`${name}-label`}
          className="absolute top-[calc(100%+8px)] z-30 w-max min-w-full rounded-[20px] border border-black/6 bg-white p-1.5 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
        >
          {options.map((option) => {
            const selected = value === option;

            return (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    setValue(option);
                    onClose();
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left text-[15px] leading-5 text-ink ${selected ? "bg-[#dff2fe]" : "hover:bg-mist"}`}
                >
                  <span className="whitespace-nowrap">{option}</span>
                  {selected ? (
                    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-[#00a7f5]" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                      <path d="M5 12.5 9.2 17 19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
