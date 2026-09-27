import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Heart, Info, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollRail } from "@/components/scroll-rail";
import { VideoPlayer } from "@/components/video-player";
import { useCinemaEffects } from "@/hooks/use-cinema-effects";
import { lessons } from "@/lib/course-data";

const WATCHED_KEY = "crochet-watched-lessons";

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): { v?: number } => {
    const v = Number(s.v);
    return Number.isInteger(v) && v >= 0 && v < lessons.length ? { v } : {};
  },
  head: () => ({ meta: [
    { title: "Curso de Crochet desde cero | Crochet" },
    { name: "description", content: "Curso gratuito de crochet desde cero: materiales, puntos esenciales, tejido circular y un proyecto final paso a paso." },
    { property: "og:title", content: "Curso de Crochet desde cero | Crochet" },
    { property: "og:description", content: "Diez lecciones de crochet, a tu ritmo, desde la primera cadena hasta tu proyecto final." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  useCinemaEffects();
  const { v } = Route.useSearch();
  const navigate = Route.useNavigate();
  const playing = v ?? null;
  const setPlaying = (i: number | null) => navigate({ search: i === null ? {} : { v: i }, replace: true, resetScroll: false });
  const [saved, setSaved] = useState(false);
  const [watched, setWatched] = useState<number[]>([]);
  useEffect(() => {
    try { setWatched(JSON.parse(localStorage.getItem(WATCHED_KEY) ?? "[]")); } catch { /* ignore */ }
    setSaved(localStorage.getItem("crochet-saved") === "1");
  }, []);
  useEffect(() => {
    if (playing === null) return;
    setWatched((w) => { if (w.includes(playing)) return w; const next = [...w, playing]; localStorage.setItem(WATCHED_KEY, JSON.stringify(next)); return next; });
  }, [playing]);
  const toggleSaved = () => { const next = !saved; setSaved(next); localStorage.setItem("crochet-saved", next ? "1" : "0"); };
  const nextLesson = lessons.findIndex((_, i) => !watched.includes(i));
  const finale = lessons.at(-1);
  if (!finale) return null;
  return <main>
    <SiteHeader />
    <section id="inicio" className="hero">
      <img className="hero-image" src="https://tejidoa.lovable.app/assets/hero-crochet-Dl1cDNvW.jpg" alt="Manos tejiendo crochet con hilo natural" />
      <div className="hero-shade" />
      <div className="hero-content">
        <span className="eyebrow">✣ Curso original</span>
        <h1>Curso de <em>crochet</em></h1>
        <p>Aprende paso a paso el arte del crochet desde cero: materiales, puntos esenciales y su aplicación en una creación completa.</p>
        <div className="hero-meta"><strong>100% para principiantes</strong><span>2026</span><span>10 lecciones</span><span className="rating">Todo público</span></div>
        <div className="hero-actions">
          <Button size="lg" onClick={() => setPlaying(nextLesson === -1 ? 0 : nextLesson)}><Play fill="currentColor" />{watched.length && nextLesson !== -1 ? `Continuar lección ${nextLesson + 1}` : "Comenzar ahora"}</Button>
          <Button size="lg" variant="outline" asChild><a href="#curso"><Info />Más información</a></Button>
          <Button variant="outline" size="icon" aria-label={saved ? "Quitar de guardados" : "Guardar curso"} aria-pressed={saved} onClick={toggleSaved}><Heart fill={saved ? "currentColor" : "none"} /></Button>
        </div>
      </div>
      <a href="#curso" className="scroll-cue" aria-label="Explorar el curso"><ChevronDown /></a>
    </section>

    <section id="curso" className="story content-width" data-reveal>
      <span className="eyebrow">Tu próxima historia</span>
      <h2>De la primera cadena<br /><em>a tu propia creación.</em></h2>
      <p>Solo necesitas una aguja y un hilo. Este recorrido reúne los materiales, los fundamentos, las técnicas para tejidos planos y circulares y un proyecto final para que avances con seguridad.</p>
    </section>

    <section id="lecciones" className="lessons-section" data-reveal>
      <div className="content-width lessons-heading"><div><span className="eyebrow">Temporada 1</span><h2>Lecciones</h2></div><div className="progress-copy"><span>{watched.length} de {lessons.length} completadas</span><div><i style={{ width: `${(watched.length / lessons.length) * 100}%` }} /></div></div></div>
      <ScrollRail className="lesson-rail" label="Lecciones">
        {lessons.map((lesson, i) => <button role="listitem" className="lesson-card" key={lesson.title} onClick={() => setPlaying(i)} aria-label={`Reproducir ${lesson.title}`}>
          <div className="poster" data-tilt><img src={lesson.image} alt={`Lección ${i + 1}: ${lesson.title}`} loading="lazy" /><span className="number">{String(i + 1).padStart(2, "0")}</span>{watched.includes(i) && <span className="watched">✓ Vista</span>}<span className="play"><Play fill="currentColor" /></span></div>
          <div className="lesson-meta"><span>Lección {i + 1}</span><span>{lesson.duration}</span></div><h3>{lesson.shortTitle}</h3><p>{lesson.description}</p>
        </button>)}
      </ScrollRail>
    </section>

    <section className="finale" data-reveal><img src={finale.image} alt="Bufanda con capucha de gato tejida a crochet" loading="lazy" /><div className="finale-shade" /><div className="content-width finale-copy"><span className="eyebrow">El gran final</span><h2>Teje una bufanda<br /><em>con alma felina.</em></h2><p>En la última lección aplicarás puntos, aumentos y terminaciones para crear una pieza completa.</p><Button size="lg" onClick={() => setPlaying(lessons.length - 1)}><Play fill="currentColor" />Ver proyecto final</Button></div></section>
    <SiteFooter />
    {playing !== null && <VideoPlayer items={lessons} index={playing} onClose={() => setPlaying(null)} onChange={setPlaying} />}
  </main>;
}
