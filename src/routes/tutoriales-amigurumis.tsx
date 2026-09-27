import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollRail } from "@/components/scroll-rail";
import { VideoPlayer } from "@/components/video-player";
import { useCinemaEffects } from "@/hooks/use-cinema-effects";
import { amigurumis } from "@/lib/course-data";

export const Route = createFileRoute("/tutoriales-amigurumis")({
  validateSearch: (s: Record<string, unknown>): { v?: number } => {
    const v = Number(s.v);
    return Number.isInteger(v) && v >= 0 && v < amigurumis.length ? { v } : {};
  },
  head: () => ({ meta: [
    { title: "Tutoriales de Amigurumis | Crochet" },
    { name: "description", content: "Aprende a tejer amigurumis paso a paso con tutoriales fáciles, videos y patrones." },
    { property: "og:title", content: "Tutoriales de Amigurumis | Crochet" },
    { property: "og:description", content: "Proyectos de amigurumi para principiantes y niveles más avanzados, reunidos en una experiencia audiovisual." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: AmigurumisPage,
});

function AmigurumisPage() {
  useCinemaEffects();
  const { v } = Route.useSearch();
  const navigate = Route.useNavigate();
  const playing = v ?? null;
  const setPlaying = (i: number | null) => navigate({ search: i === null ? {} : { v: i }, replace: true, resetScroll: false });
  const [filter, setFilter] = useState<"all" | "video">("all");
  const featured = amigurumis[0];
  const withVideo = useMemo(() => amigurumis.filter((x) => x.videoIds.length > 0), []);
  const shown = filter === "video" ? withVideo : amigurumis;
  if (!featured) return null;
  return <main className="amigurumi-page"><SiteHeader />
    <section className="catalog-hero"><img className="hero-image" src={featured.image} alt={featured.title} /><div className="catalog-shade" /><div className="catalog-intro"><span className="eyebrow">Colección original</span><h1>Tutoriales de <em>Amigurumis</em></h1><p>Aprende a tejer amigurumis paso a paso con nuestros tutoriales en video y guías detalladas. Encuentra patrones fáciles, proyectos para principiantes y creaciones más avanzadas para que puedas tejer tus personajes favoritos desde cero.</p><button className="cinema-cta" onClick={() => setPlaying(0)}><Play fill="currentColor" />Ver tutorial destacado: {featured.shortTitle}</button></div></section>
    <section className="catalog-section" data-reveal><div className="catalog-title"><span className="eyebrow">Reproducción cinematográfica</span><h2>Tutoriales en video</h2><p>Disfruta cada paso sin salir de esta página.</p></div>
      <ScrollRail className="cinema-rail" label="Tutoriales en video">{withVideo.map((item) => { const index = amigurumis.indexOf(item); return <button role="listitem" className="cinema-card" data-tilt key={item.title} onClick={() => setPlaying(index)} aria-label={`Reproducir ${item.title}`}><img src={item.image} alt={item.title} loading="lazy" /><span className="cinema-glow" /><span className="cinema-play"><Play fill="currentColor" /></span><span className="cinema-info"><small>{item.videoIds.length > 1 ? `${item.videoIds.length} partes` : "Video tutorial"}</small><strong>{item.shortTitle}</strong></span></button>; })}</ScrollRail>
    </section>
    <section className="catalog-section all-tutorials" data-reveal><div className="catalog-title catalog-title-row"><div><span className="eyebrow">Colección completa</span><h2>Todos los Amigurumis</h2><p>{shown.length} proyectos organizados para explorar a tu ritmo.</p></div>
      <div className="filter-chips" role="group" aria-label="Filtrar tutoriales"><button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>Todos</button><button type="button" aria-pressed={filter === "video"} onClick={() => setFilter("video")}>Con video</button></div></div>
      <div className="tutorial-grid">{shown.map((item) => { const i = amigurumis.indexOf(item); return <button key={item.title} className="tutorial-card" onClick={() => setPlaying(i)}><div className="tutorial-image" data-tilt><img src={item.image} alt={item.title} loading="lazy" /><span><Play fill="currentColor" /></span></div><div><small>{item.date ?? "Tutorial paso a paso"}</small><h3>{item.title}</h3><p>{item.description}</p></div></button>; })}</div>
    </section>
    <SiteFooter />
    {playing !== null && <VideoPlayer items={amigurumis} index={playing} onClose={() => setPlaying(null)} onChange={setPlaying} />}
  </main>;
}
