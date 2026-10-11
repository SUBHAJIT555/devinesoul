"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function HashScroll() {
  const pathname = usePathname();

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

    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    let frame = 0;
    let frames = 0;
    let stopped = false;

    const finish = () => {
      root.style.scrollBehavior = previous;
    };

    const stop = () => {
      stopped = true;
    };

    window.addEventListener("wheel", stop, { passive: true });
    window.addEventListener("touchmove", stop, { passive: true });

    const tick = () => {
      if (stopped) {
        finish();
        return;
      }

      const target = document.getElementById(id);
      if (target) {
        root.style.scrollBehavior = "auto";
        target.scrollIntoView({ block: "start", behavior: "auto" });
      }

      frames += 1;
      if (frames < 48) {
        frame = window.requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    frame = window.requestAnimationFrame(tick);

    return () => {
      stopped = true;
      window.cancelAnimationFrame(frame);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchmove", stop);
      finish();
    };
  }, [pathname]);

  return null;
}
