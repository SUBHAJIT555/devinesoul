"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { serviceEnquiry } from "@/lib/whatsapp";
import { Button, Check, WhatsAppIcon } from "@/components/ui";

const primaryButton =
  "inline-flex h-[45px] cursor-pointer items-center justify-center rounded-[16px] bg-[#00a7f5] px-4 text-[15px] font-medium tracking-[-0.02em] text-white shadow-[inset_0_3px_0_0_rgba(255,255,255,0.2),0_2px_4px_0_rgba(6,147,255,0.25)] transition-colors hover:bg-[#00b0fa]";

export function ServiceBook({ title, body, points }: { title: string; body: string; points: string[] }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={() => setOpen(true)} className={primaryButton}>
          Book this service now
        </button>
        <Button href={serviceEnquiry(title)} variant="whatsapp" external>
          <WhatsAppIcon />
          Enquire on WhatsApp
        </Button>
      </div>
      <BookModal title={title} body={body} points={points} open={open} onClose={close} />
    </>
  );
}

function BookModal({
  title,
  body,
  points,
  open,
  onClose,
}: {
  title: string;
  body: string;
  points: string[];
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setSent(false);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const frame = window.requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>("input:not([type='hidden'])")?.focus();
    });
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.cancelAnimationFrame(frame);
    };
  }, [open, onClose]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  function trap(event: ReactKeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab" || !panelRef.current) return;
    const items = panelRef.current.querySelectorAll<HTMLElement>("button, input, textarea, a, select");
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
        >
          <button type="button" tabIndex={-1} aria-label="Close booking" className="absolute inset-0 bg-[#09090b]/45 backdrop-blur-[6px]" onClick={onClose} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onKeyDown={trap}
            className="relative z-10 flex max-h-[min(680px,calc(100vh-48px))] w-full max-w-[480px] flex-col overflow-hidden rounded-[32px] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.22)]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 12 }}
          >
            <div className="flex items-start justify-between gap-4 px-6 pb-2 pt-6">
              <div>
                <h2 id={titleId} className="text-[26px] font-medium tracking-[-0.03em] text-ink">
                  Book {title}
                </h2>
                <p className="mt-1 text-[14px] leading-5 text-zinc-500">The service is already noted.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-mist text-ink transition-colors hover:bg-zinc-200"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                  <path d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {sent ? (
              <div className="px-6 pb-6 pt-3">
                <p className="rounded-[20px] bg-[#dff2fe] px-4 py-4 text-[15px] leading-6 text-ink">
                  Received on this page. Nothing was sent on. Email priyasinha1809@gmail.com or call +91 7668648224 and Priya can pick it up.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex min-h-0 flex-1 flex-col">
                <div data-lenis-prevent className="quiet-scroll min-h-0 flex-1 overflow-y-auto px-6 pb-2 pt-3">
                  <div className="rounded-[24px] bg-mist px-5 py-5">
                    <p className="font-meta text-[12px] leading-[18px] text-zinc-500">Service</p>
                    <p className="mt-1 text-[20px] font-medium tracking-[-0.03em] text-ink">{title}</p>
                    <p className="mt-2 text-[14px] leading-6 text-zinc-600">{body}</p>
                    <ul className="mt-4 space-y-2">
                      {points.map((point) => (
                        <li key={point} className="flex gap-3 text-[14px] leading-6 text-ink">
                          <Check />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-5 grid gap-3.5">
                    <input type="hidden" name="service" value={title} />
                    <Field label="Name" name="name" type="text" required />
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone" name="phone" type="tel" required />
                    <label className="grid gap-1.5">
                      <span className="font-meta text-[12px] leading-[18px] text-zinc-500">Message</span>
                      <textarea
                        name="message"
                        rows={3}
                        placeholder="Anything Priya should know before the session."
                        className="resize-none rounded-2xl bg-mist px-4 py-3 text-[15px] font-normal text-ink outline-none placeholder:text-zinc-400 focus:bg-white focus:shadow-[inset_0_0_0_1.5px_#00a7f5]"
                      />
                    </label>
                  </div>
                </div>
                <div className="flex justify-end px-6 pb-6 pt-3">
                  <button type="submit" className={primaryButton}>
                    Submit your request
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

function Field({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <label className="grid gap-1.5">
      <span className="font-meta text-[12px] leading-[18px] text-zinc-500">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-12 rounded-2xl bg-mist px-4 text-[15px] font-normal text-ink outline-none focus:bg-white focus:shadow-[inset_0_0_0_1.5px_#00a7f5]"
      />
    </label>
  );
}
