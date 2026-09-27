import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { VideoPlayer } from "@/components/video-player";
import { amigurumis } from "@/lib/course-data";

export const Route = createFileRoute("/tutoriales-amigurumis")({
  head: () => ({ meta: [
    { title: "Tutoriales de Amigurumis | Arte en Crochet" },
    { name: "description", content: "Aprende a tejer amigurumis paso a paso con tutoriales fáciles, videos y patrones." },
    { property: "og:title", content: "Tutoriales de Amigurumis | Arte en Crochet" },
    { property: "og:description", content: "Proyectos de amigurumi para principiantes y niveles más avanzados, reunidos en una experiencia audiovisual." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: AmigurumisPage,
});

function AmigurumisPage(){
  const [playing,setPlaying]=useState<number|null>(null);
  const featured=amigurumis[0];
  const withVideo=useMemo(()=>amigurumis.filter(x=>x.videoIds.length>0),[]);
  const patterns=useMemo(()=>amigurumis.filter(x=>x.videoIds.length===0),[]);
  if (!featured) return null;
  return <main className="amigurumi-page"><SiteHeader/>
    <section className="catalog-hero"><img src={featured.image} alt={featured.title}/><div className="catalog-shade"/><div className="catalog-intro"><span className="eyebrow">Colección original</span><h1>Tutoriales de <em>Amigurumis</em></h1><p>Aprende a tejer amigurumis paso a paso con nuestros tutoriales en video y guías detalladas. Encuentra patrones fáciles, proyectos para principiantes y creaciones más avanzadas para que puedas tejer tus personajes favoritos desde cero.</p><button className="cinema-cta" onClick={()=>setPlaying(0)}><Play fill="currentColor"/>Ver tutorial destacado</button></div></section>
    <section className="catalog-section"><div className="catalog-title"><span className="eyebrow">Reproducción cinematográfica</span><h2>Tutoriales en video</h2><p>Disfruta cada paso sin salir de esta página.</p></div><div className="cinema-rail">{withVideo.map((item)=>{const index=amigurumis.indexOf(item);return <button className="cinema-card" key={item.title} onClick={()=>setPlaying(index)}><img src={item.image} alt={item.title}/><span className="cinema-glow"/><span className="cinema-play"><Play fill="currentColor"/></span><span className="cinema-info"><small>{item.videoIds.length>1?`${item.videoIds.length} partes`:"Video tutorial"}</small><strong>{item.shortTitle}</strong></span></button>})}</div></section>
    <section className="catalog-section all-tutorials"><div className="catalog-title"><span className="eyebrow">Colección completa</span><h2>Todos los Amigurumis</h2><p>23 proyectos organizados para explorar a tu ritmo.</p></div><div className="tutorial-grid">{amigurumis.map((item,i)=><button key={item.title} className="tutorial-card" onClick={()=>setPlaying(i)}><div className="tutorial-image"><img src={item.image} alt={item.title}/><span><Play fill="currentColor"/></span></div><div><small>{item.date??"Tutorial paso a paso"}</small><h3>{item.title}</h3><p>{item.description}</p></div></button>)}</div></section>
    <footer className="site-footer"><div className="brand"><span className="brand-mark">✺</span><span>ATELIER</span></div><p>Contenido original de Arte en Crochet.</p><a href="mailto:arteencrochetoficial@gmail.com">arteencrochetoficial@gmail.com</a></footer>
    {playing!==null&&<VideoPlayer items={amigurumis} index={playing} onClose={()=>setPlaying(null)} onChange={setPlaying}/>} 
  </main>
}