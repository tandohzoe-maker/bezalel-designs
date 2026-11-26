"use client";

import { useEffect } from "react";

/**
 * Adds `is-revealed` to [data-reveal="view"] elements as they enter the
 * viewport. A MutationObserver picks up elements rendered after client-side
 * navigation. One observer for the whole site.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.documentElement.classList.remove("js");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // 15% visible — or, for very tall elements, a quarter-screen's worth.
          const enough =
            entry.intersectionRatio >= 0.15 || entry.intersectionRect.height >= window.innerHeight * 0.25;
          if (entry.isIntersecting && enough) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px", threshold: [0, 0.05, 0.15] },
    );

    const scan = (root: ParentNode) => {
      root.querySelectorAll?.('[data-reveal="view"]:not(.is-revealed)').forEach((el) => io.observe(el));
    };
    scan(document);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches('[data-reveal="view"]')) io.observe(n);
            scan(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
