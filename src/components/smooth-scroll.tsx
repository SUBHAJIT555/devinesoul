"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        smoothWheel: true,
        anchors: true,
        autoRaf: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <LenisGuards />
      {children}
    </ReactLenis>
  );
}

function LenisGuards() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const syncLock = () => {
      if (document.body.style.overflow === "hidden") lenis.stop();
      else lenis.start();
    };

    syncLock();
    const observer = new MutationObserver(syncLock);
    observer.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    const keepAnchorSmooth = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest?.("a");
      if (!anchor || anchor.target === "_blank" || !anchor.href) return;

      const url = new URL(anchor.href, window.location.href);
      const here = new URL(window.location.href);
      if (url.origin !== here.origin || url.pathname !== here.pathname || !url.hash || url.hash === "#") return;
      let id = "";
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      if (!id || !document.getElementById(id)) return;

      event.preventDefault();
    };

    window.addEventListener("click", keepAnchorSmooth, true);

    return () => {
      observer.disconnect();
      window.removeEventListener("click", keepAnchorSmooth, true);
    };
  }, [lenis]);

  return null;
}
