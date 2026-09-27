import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, Heart, Info, Play } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { VideoPlayer } from "@/components/video-player";
import { lessons } from "@/lib/course-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Curso de Crochet | Arte en Crochet" },
    { name: "description", content: "Curso gratuito de crochet desde cero: materiales, puntos esenciales, tejido circular y un proyecto final paso a paso." },
    { property: "og:title", content: "Curso de Crochet | Arte en Crochet" },
    { property: "og:description", content: "Diez lecciones de crochet, a tu ritmo, desde la primera cadena hasta tu proyecto final." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

function Index() {
  const [playing,setPlaying]=useState<number|null>(null);
  const [saved,setSaved]=useState(false);
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
        <div className="hero-actions"><Button size="lg" onClick={()=>setPlaying(0)}><Play fill="currentColor"/>Comenzar ahora</Button><Button size="lg" variant="outline" asChild><a href="#curso"><Info/>Más información</a></Button><Button variant="outline" size="icon" aria-label="Guardar curso" aria-pressed={saved} onClick={()=>setSaved(!saved)}><Heart fill={saved?"currentColor":"none"}/></Button></div>
      </div>
      <a href="#curso" className="scroll-cue" aria-label="Explorar el curso"><ChevronDown/></a>
    </section>

    <section id="curso" className="story content-width">
      <span className="eyebrow">Tu próxima historia</span>
      <h2>De la primera cadena<br/><em>a tu propia creación.</em></h2>
      <p>Solo necesitas una aguja y un hilo. Este recorrido reúne los materiales, los fundamentos, las técnicas para tejidos planos y circulares y un proyecto final para que avances con seguridad.</p>
    </section>

    <section id="lecciones" className="lessons-section">
      <div className="content-width lessons-heading"><div><span className="eyebrow">Temporada 1</span><h2>Lecciones</h2></div><div className="progress-copy"><span>2 de 10 completadas</span><div><i /></div></div></div>
      <div className="lesson-rail">
        {lessons.map((lesson,i)=><button className="lesson-card" key={lesson.title} onClick={()=>setPlaying(i)} aria-label={`Reproducir ${lesson.title}`}>
          <div className="poster"><img src={lesson.image} alt={`Lección ${i+1}: ${lesson.title}`} /><span className="number">{String(i+1).padStart(2,"0")}</span>{i<2&&<span className="watched">✓ Vista</span>}<span className="play"><Play fill="currentColor"/></span></div>
          <div className="lesson-meta"><span>Lección {i+1}</span><span>{lesson.duration}</span></div><h3>{lesson.shortTitle}</h3><p>{lesson.description}</p>
        </button>)}
      </div>
    </section>

    <section className="finale"><img src={finale.image} alt="Bufanda con capucha de gato tejida a crochet"/><div className="finale-shade"/><div className="content-width finale-copy"><span className="eyebrow">El gran final</span><h2>Teje una bufanda<br/><em>con alma felina.</em></h2><p>En la última lección aplicarás puntos, aumentos y terminaciones para crear una pieza completa.</p><Button size="lg" onClick={()=>setPlaying(lessons.length-1)}><Play fill="currentColor"/>Ver proyecto final</Button></div></section>
    <footer className="site-footer"><div className="brand"><span className="brand-mark" aria-hidden="true">✧</span><span className="brand-name">Crochet</span><span className="brand-mark" aria-hidden="true">✧</span></div><p>Contenido original de Arte en Crochet.</p><a href="mailto:arteencrochetoficial@gmail.com">arteencrochetoficial@gmail.com</a><Link to="/tutoriales-amigurumis">Tutoriales de Amigurumis</Link></footer>
    {playing!==null&&<VideoPlayer items={lessons} index={playing} onClose={()=>setPlaying(null)} onChange={setPlaying}/>} 
  </main>;
}
