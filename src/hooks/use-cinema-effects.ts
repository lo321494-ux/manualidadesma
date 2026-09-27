import { useEffect } from "react";

/** Scroll reveals, hero parallax and pointer-driven 3D tilt for [data-tilt] elements. */
export function useCinemaEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    root.classList.add("fx-ready");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { threshold: 0, rootMargin: "0px 0px 10% 0px" });
    const safety = window.setTimeout(() => document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in")), 1800);
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    let frame = 0;
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => root.style.setProperty("--scroll", String(Math.min(window.scrollY, 1200)))); };
    window.addEventListener("scroll", onScroll, { passive: true });

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-tilt]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--rx", `${(-y * 9).toFixed(2)}deg`);
      el.style.setProperty("--ry", `${(x * 11).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${((x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${((y + 0.5) * 100).toFixed(1)}%`);
    };
    const onOut = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-tilt]");
      if (!el || (e.relatedTarget instanceof Node && el.contains(e.relatedTarget))) return;
      el.style.removeProperty("--rx"); el.style.removeProperty("--ry");
    };
    if (fine) { document.addEventListener("pointermove", onMove); document.addEventListener("pointerout", onOut); }
    return () => {
      io.disconnect(); cancelAnimationFrame(frame); clearTimeout(safety);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("pointermove", onMove); document.removeEventListener("pointerout", onOut);
    };
  }, []);
}
