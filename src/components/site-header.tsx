import { Link, useNavigate } from "@tanstack/react-router";
import { Film, Menu, Play, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { amigurumis, lessons } from "@/lib/course-data";

type Result =
  | { kind: "section"; label: string; detail: string; to: "/" | "/tutoriales-amigurumis"; hash?: string }
  | { kind: "lesson" | "amigurumi"; label: string; detail: string; image: string; index: number };

const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const sections: Result[] = [
  { kind: "section", label: "Inicio", detail: "Portada del curso", to: "/", hash: "inicio" },
  { kind: "section", label: "Curso", detail: "De la primera cadena a tu propia creación", to: "/", hash: "curso" },
  { kind: "section", label: "Lecciones", detail: "Las 10 lecciones del curso", to: "/", hash: "lecciones" },
  { kind: "section", label: "Tutoriales de Amigurumis", detail: "Catálogo completo de amigurumis", to: "/tutoriales-amigurumis" },
];
const allResults: Result[] = [
  ...sections,
  ...lessons.map((l, i) => ({ kind: "lesson" as const, label: l.title, detail: `Lección ${i + 1} · ${l.shortTitle} · ${l.description}`, image: l.image, index: i })),
  ...amigurumis.map((a, i) => ({ kind: "amigurumi" as const, label: a.title, detail: `Amigurumi · ${a.description}`, image: a.image, index: i })),
];

function SiteSearch({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  useEffect(() => { input.current?.focus(); document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = ""; }; }, []);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);
  const results = useMemo(() => {
    const words = normalize(q.trim()).split(/\s+/).filter(Boolean);
    if (!words.length) return allResults;
    return allResults.filter((r) => { const text = normalize(`${r.label} ${r.detail}`); return words.every((w) => text.includes(w)); });
  }, [q]);
  const go = (r: Result) => {
    onClose();
    if (r.kind === "section") navigate({ to: r.to, hash: r.hash });
    else if (r.kind === "lesson") navigate({ to: "/", search: { v: r.index } });
    else navigate({ to: "/tutoriales-amigurumis", search: { v: r.index } });
  };
  return <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Buscar" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
    <div className="search-panel">
      <div className="search-bar">
        <Search aria-hidden="true" />
        <input ref={input} value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && results[0]) go(results[0]); }} placeholder="Busca lecciones, puntos o amigurumis…" aria-label="Buscar en el sitio" />
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar buscador"><X /></Button>
      </div>
      <p className="search-count">{q.trim() ? `${results.length} resultado${results.length === 1 ? "" : "s"}` : "Explora todo el contenido"}</p>
      <ul className="search-results">
        {results.map((r) => <li key={`${r.kind}-${r.label}`}>
          <button type="button" onClick={() => go(r)}>
            {r.kind === "section" ? <span className="search-icon"><Film /></span> : <span className="search-thumb"><img src={r.image} alt="" loading="lazy" /><Play fill="currentColor" /></span>}
            <span className="search-text"><small>{r.kind === "section" ? "Sección" : r.kind === "lesson" ? "Lección" : "Amigurumi"}</small><strong>{r.label}</strong><span>{r.detail}</span></span>
          </button>
        </li>)}
        {results.length === 0 && <li className="search-empty">No encontramos resultados para “{q}”. Prueba con otra palabra, como “punto”, “gato” u “oveja”.</li>}
      </ul>
    </div>
  </div>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const close = () => setOpen(false);
  return <header className="site-header">
    <Link to="/" hash="inicio" className="brand" aria-label="Crochet, inicio"><span className="brand-mark" aria-hidden="true">✧</span><span className="brand-name">Crochet</span><span className="brand-mark" aria-hidden="true">✧</span></Link>
    <nav className="desktop-nav" aria-label="Navegación principal">
      <Link to="/" hash="inicio">Inicio</Link><Link to="/" hash="curso">Curso</Link><Link to="/" hash="lecciones">Lecciones</Link><Link to="/tutoriales-amigurumis">Tutoriales de Amigurumis</Link>
    </nav>
    <div className="header-actions">
      <Button variant="ghost" size="icon" aria-label="Buscar" onClick={() => { setOpen(false); setSearching(true); }}><Search /></Button>
      <Button variant="ghost" size="icon" className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open}>{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <nav className="mobile-nav" aria-label="Menú">
      <Link to="/" hash="inicio" onClick={close}>Inicio</Link><Link to="/" hash="curso" onClick={close}>Curso</Link><Link to="/" hash="lecciones" onClick={close}>Lecciones</Link><Link to="/tutoriales-amigurumis" onClick={close}>Tutoriales de Amigurumis</Link>
      <button type="button" onClick={() => { close(); setSearching(true); }}><Search />Buscar</button>
    </nav>}
    {searching && <SiteSearch onClose={() => setSearching(false)} />}
  </header>;
}
