"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { SiteContent } from "@/lib/types";
import { widgetChat, widgetOpen } from "@/lib/whatsapp";

const OPEN_DELAY = 5000;
const ease = [0.22, 1, 0.36, 1] as const;

function WidgetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <g clipPath="url(#wa-widget-clip)">
        <path
          opacity="0.4"
          d="M6.9403 20.6304C8.4303 21.5004 10.1603 22.0005 12.0003 22.0005C17.6303 22.0005 22.3103 17.0305 21.9803 11.4105C21.6403 5.61045 16.3703 1.14045 10.3003 2.14045C6.12029 2.83045 2.77029 6.22045 2.12029 10.4005C1.74029 12.8205 2.24031 15.1104 3.33031 17.0005L2.4403 20.3104C2.2403 21.0604 2.93028 21.7404 3.67028 21.5304L6.9403 20.6304Z"
        />
        <path d="M17 15.1705C17 15.3505 16.96 15.5405 16.87 15.7205C16.78 15.9005 16.67 16.0705 16.53 16.2305C16.28 16.5005 16.01 16.7005 15.71 16.8205C15.41 16.9505 15.08 17.0105 14.73 17.0105C14.22 17.0105 13.67 16.8905 13.1 16.6405C12.52 16.3905 11.95 16.0605 11.38 15.6505C10.8 15.2305 10.26 14.7605 9.73999 14.2505C9.21999 13.7305 8.76003 13.1805 8.34003 12.6105C7.93003 12.0405 7.59999 11.4705 7.35999 10.9005C7.11999 10.3305 7 9.78047 7 9.26047C7 8.92047 7.05999 8.59047 7.17999 8.29047C7.29999 7.98047 7.49001 7.70046 7.76001 7.45046C8.08001 7.13046 8.42999 6.98047 8.79999 6.98047C8.93999 6.98047 9.08002 7.01047 9.21002 7.07047C9.34002 7.13047 9.45999 7.22046 9.54999 7.35046L10.7 9.00047C10.79 9.13047 10.86 9.24046 10.9 9.35046C10.95 9.46046 10.97 9.56047 10.97 9.66047C10.97 9.78047 10.93 9.90046 10.86 10.0205C10.79 10.1405 10.7 10.2605 10.58 10.3805L10.2 10.7805C10.14 10.8405 10.12 10.9005 10.12 10.9805C10.12 11.0205 10.13 11.0605 10.14 11.1005C10.16 11.1405 10.17 11.1705 10.18 11.2005C10.27 11.3705 10.43 11.5805 10.65 11.8405C10.88 12.1005 11.12 12.3705 11.38 12.6305C11.65 12.9005 11.91 13.1405 12.18 13.3705C12.44 13.5905 12.66 13.7405 12.83 13.8305C12.86 13.8405 12.89 13.8605 12.92 13.8705C12.96 13.8905 13 13.8905 13.05 13.8905C13.14 13.8905 13.2 13.8605 13.26 13.8005L13.64 13.4205C13.77 13.2905 13.89 13.2005 14 13.1405C14.12 13.0705 14.23 13.0305 14.36 13.0305C14.46 13.0305 14.56 13.0505 14.67 13.1005C14.78 13.1505 14.9 13.2105 15.02 13.3005L16.68 14.4805C16.81 14.5705 16.9 14.6805 16.96 14.8005C16.97 14.9105 17 15.0305 17 15.1705Z" />
      </g>
      <defs>
        <clipPath id="wa-widget-clip">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export function WhatsAppWidget({ site }: { site: SiteContent }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [message, setMessage] = useState("");
  const dismissedRef = useRef(false);
  const copy = site.whatsappWidget;
  const href = widgetChat(message.trim() || copy.emptyMessage);
  const chatHref = widgetOpen();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    if (!media.matches) return;

    const timer = window.setTimeout(() => {
      if (!dismissedRef.current) setOpen(true);
    }, OPEN_DELAY);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function closePanel() {
    dismissedRef.current = true;
    setDismissed(true);
    setOpen(false);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="pointer-events-none fixed right-8 bottom-[6.5rem] z-40 hidden flex-col items-end gap-3 lg:flex">
      <AnimatePresence>
        {open ? (
          <motion.div
            key="panel"
            className="pointer-events-auto w-[320px] overflow-hidden rounded-[22px] bg-white shadow-[0_2px_40px_rgba(0,0,0,0.18)]"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.36, ease }}
            style={{ transformOrigin: "bottom right" }}
          >
            <div className="flex items-start justify-between gap-3 bg-nav px-4 py-3.5 text-white">
              <div>
                <p className="text-[15px] font-medium tracking-[-0.02em]">{copy.title}</p>
                <p className="mt-1 text-[13px] leading-5 text-white/70">{copy.body}</p>
              </div>
              <button
                type="button"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Close message"
                onClick={closePanel}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <form className="flex flex-col gap-3 p-3.5" onSubmit={onSubmit}>
              <label className="sr-only" htmlFor="wa-widget-message">
                {copy.placeholder}
              </label>
              <textarea
                id="wa-widget-message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder={copy.placeholder}
                rows={3}
                className="min-h-[84px] w-full resize-none rounded-2xl bg-mist px-4 py-3 text-[15px] leading-6 text-ink outline-none placeholder:text-zinc-400 focus:bg-white focus:shadow-[inset_0_0_0_1.5px_#00a7f5]"
              />
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[45px] items-center justify-center gap-[7px] rounded-2xl bg-[#25D366] px-4 text-[15px] font-medium text-white shadow-[inset_0_3px_0_0_rgba(255,255,255,0.25),0_2px_4px_0_rgba(18,140,126,0.35)] hover:bg-[#20bd5a]"
              >
                <WidgetIcon />
                {copy.cta}
              </a>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {dismissed ? (
        <motion.a
          href={chatHref}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)]"
          aria-label="WhatsApp"
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
        >
          <WidgetIcon />
        </motion.a>
      ) : (
        <motion.button
          type="button"
          className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)]"
          aria-label={open ? "WhatsApp is open" : "Open WhatsApp"}
          aria-expanded={open}
          onClick={() => setOpen(true)}
          initial={reduce ? false : { opacity: 0, scale: 0.86 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.32, ease }}
          whileHover={reduce ? undefined : { scale: 1.04 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
        >
          <WidgetIcon />
        </motion.button>
      )}
    </div>
  );
}
