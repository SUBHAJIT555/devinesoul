"use client";

import { useLenis } from "lenis/react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HashScroll() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash === "#") return;

    let id = "";
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return;
    }
    if (!id || id === "content") return;

    let frame = 0;
    let frames = 0;
    let stopped = false;

    const stop = () => {
      stopped = true;
    };

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchmove", stop, { passive: true });

    const tick = () => {
      if (stopped) return;

      const target = document.getElementById(id);
      if (target) {
        if (lenis) lenis.scrollTo(target, { duration: 1.15 });
        else target.scrollIntoView({ block: "start", behavior: "auto" });
        return;
      }

      frames += 1;
      if (frames < 48) frame = window.requestAnimationFrame(tick);
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      stopped = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
    };
  }, [pathname, lenis]);

  return null;
}
