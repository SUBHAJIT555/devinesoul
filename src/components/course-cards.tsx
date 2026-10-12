"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Course } from "@/lib/types";
import { courseEnquiry } from "@/lib/whatsapp";
import { Button, Reveal, WhatsAppIcon } from "@/components/ui";

const wash: Record<Course["tone"], string> = {
  blue: "bg-[#dff2fe]",
  orange: "bg-[#ffedd4]",
  violet: "bg-[#ece9fe]",
  mist: "bg-mist",
};

export function CourseCards({ items }: { items: Course[] }) {
  const [course, setCourse] = useState<Course | null>(null);
  const close = useCallback(() => setCourse(null), []);

  return (
    <>
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <article id={`course-${item.id}`} className={`scroll-mt-32 flex h-full flex-col rounded-[30px] p-3 ${wash[item.tone]}`}>
              <div className="relative aspect-[3/2] w-full overflow-hidden rounded-[22px]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col px-4 pb-5 pt-6">
                <h3 className="text-[26px] font-medium leading-[1.2] tracking-[-0.04em] text-ink">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-6 text-zinc-600">{item.summary}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setCourse(item)}
                    className="inline-flex h-[45px] cursor-pointer items-center justify-center rounded-[16px] bg-[#00a7f5] px-4 text-[15px] font-medium tracking-[-0.02em] text-white shadow-[inset_0_3px_0_0_rgba(255,255,255,0.2),0_2px_4px_0_rgba(6,147,255,0.25)] transition-colors hover:bg-[#00b0fa]"
                  >
                    Free Enroll Now
                  </button>
                  <Button href={courseEnquiry(item.title)} variant="whatsapp" external>
                    <WhatsAppIcon />
                    Enquire on WhatsApp
                  </Button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <EnrollModal course={course} onClose={close} />
    </>
  );
}

function EnrollModal({ course, onClose }: { course: Course | null; onClose: () => void }) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!course) return;
    setSent(false);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
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
  }, [course, onClose]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  function trap(event: KeyboardEvent<HTMLDivElement>) {
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
      {course ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
        >
          <button type="button" tabIndex={-1} aria-label="Close enrollment" className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onKeyDown={trap}
            data-lenis-prevent
            className="quiet-scroll relative max-h-[min(720px,calc(100vh-32px))] w-full max-w-lg overflow-y-auto rounded-[28px] bg-white p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)] sm:p-8"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 12 }}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id={titleId} className="text-[28px] font-medium tracking-[-0.03em] text-ink">
                Free Enroll Now
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="inline-flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-mist text-ink"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                  <path d="M3.5 3.5 12.5 12.5M12.5 3.5 3.5 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-[15px] leading-6 text-zinc-600">The course is already noted. Add your details and submit.</p>
            <div className="mt-6 rounded-2xl bg-mist px-4 py-4">
              <p className="text-[13px] font-medium text-zinc-500">{course.level}</p>
              <p className="mt-1 text-[18px] font-medium tracking-[-0.03em] text-ink">{course.title}</p>
              <p className="mt-2 text-[14px] leading-6 text-zinc-600">{course.summary}</p>
            </div>
            {sent ? (
              <p className="mt-6 rounded-2xl bg-[#dff2fe] px-4 py-4 text-[15px] leading-6 text-ink">
                Received on this page. Nothing was sent on. Email priyasinha1809@gmail.com or call +91 7668648224 and Priya can pick it up.
              </p>
            ) : (
              <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
                <input type="hidden" name="course" value={course.title} />
                <Field label="Name" name="name" type="text" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" required />
                <label className="grid gap-2 text-[13px] font-medium text-zinc-600">
                  Message
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Anything Priya should know before the course."
                    className="rounded-xl border border-black/10 px-3 py-3 text-[15px] font-normal text-ink outline-none placeholder:text-zinc-400 focus:border-accent"
                  />
                </label>
                <div className="mt-2 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex h-[45px] cursor-pointer items-center justify-center rounded-[16px] bg-[#00a7f5] px-4 text-[15px] font-medium tracking-[-0.02em] text-white shadow-[inset_0_3px_0_0_rgba(255,255,255,0.2),0_2px_4px_0_rgba(6,147,255,0.25)] transition-colors hover:bg-[#00b0fa]"
                  >
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
