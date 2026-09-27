import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";

export function ScrollRail({ className, label, children }: { className: string; label: string; children: ReactNode }) {
  const rail = useRef<HTMLDivElement>(null);
  const move = (dir: number) => { const el = rail.current; if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" }); };
  return <div className="rail-wrap">
    <button type="button" className="rail-arrow rail-prev" onClick={() => move(-1)} aria-label={`Anterior en ${label}`}><ChevronLeft /></button>
    <div ref={rail} className={className} role="list" aria-label={label}>{children}</div>
    <button type="button" className="rail-arrow rail-next" onClick={() => move(1)} aria-label={`Siguiente en ${label}`}><ChevronRight /></button>
  </div>;
}
