import { ChevronLeft, ChevronRight, Maximize, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { lessons as lessonsRef, type VideoItem } from "@/lib/course-data";

export function VideoPlayer({items,index,onClose,onChange}:{items:VideoItem[];index:number;onClose:()=>void;onChange:(index:number)=>void}) {
  const item=items[index]; const frame=useRef<HTMLDivElement>(null); const iframe=useRef<HTMLIFrameElement>(null);
  const [part,setPart]=useState(0);
  // started: the video has really begun playing at least once. Until then the shield is
  // removed so phones can use their own first tap to start the video (browsers block
  // sound autoplay without a direct tap on the video).
  const [started,setStarted]=useState(false); const [playing,setPlaying]=useState(false);
  const [origin,setOrigin]=useState("");
  useEffect(()=>{setOrigin(window.location.origin)},[]);
  useEffect(()=>{setPart(0);document.body.style.overflow="hidden";return()=>{document.body.style.overflow=""}},[index]);
  useEffect(()=>{setStarted(false);setPlaying(false)},[index,part]);
  useEffect(()=>{const close=(e:KeyboardEvent)=>e.key==="Escape"&&onClose();window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[onClose]);
  useEffect(()=>{
    const onMsg=(e:MessageEvent)=>{
      if(!/youtube(-nocookie)?\.com$/.test(new URL(e.origin||"http://x").hostname)) return;
      if(e.source!==iframe.current?.contentWindow) return;
      let d:{event?:string;info?:unknown}; try{d=typeof e.data==="string"?JSON.parse(e.data):e.data}catch{return}
      const state=d.event==="onStateChange"?d.info:d.event==="infoDelivery"&&d.info&&typeof d.info==="object"?(d.info as {playerState?:number}).playerState:undefined;
      if(state===1){setStarted(true);setPlaying(true)} else if(state===2||state===0){setPlaying(false)}
    };
    window.addEventListener("message",onMsg);return()=>window.removeEventListener("message",onMsg);
  },[]);
  const send=(func:string,args:unknown[]=[])=>iframe.current?.contentWindow?.postMessage(JSON.stringify({event:"command",func,args}),"*");
  const tune=()=>{const w=iframe.current?.contentWindow;if(!w)return;let n=0;const t=setInterval(()=>{w.postMessage(JSON.stringify({event:"listening",id:1,channel:"widget"}),"*");send("addEventListener",["onStateChange"]);send("unloadModule",["captions"]);send("unloadModule",["cc"]);send("setOption",["captions","track",{}]);send("setPlaybackQuality",["hd1080"]);if(++n>10)clearInterval(t)},600)};
  const toggle=()=>{send(playing?"pauseVideo":"playVideo");setPlaying(!playing)};
  const goFull=()=>{const el=frame.current as (HTMLDivElement & {webkitRequestFullscreen?:()=>void})|null; if(!el) return; if(el.requestFullscreen) el.requestFullscreen().then(()=>{(screen.orientation as ScreenOrientation & {lock?:(o:string)=>Promise<void>}).lock?.("landscape").catch(()=>{})}).catch(()=>{}); else if(el.webkitRequestFullscreen) el.webkitRequestFullscreen(); else { const f=iframe.current as (HTMLIFrameElement & {webkitEnterFullscreen?:()=>void})|null; f?.webkitEnterFullscreen?.(); }};
  if(!item) return null;
  const id=item.videoIds[part] ?? item.videoIds[0];
  return <div className="player-overlay" role="dialog" aria-modal="true" aria-label={item.title} onMouseDown={(e)=>e.target===e.currentTarget&&onClose()}>
    <div className="player-shell">
      <div className="player-top"><p>{items===lessonsRef?`Lección ${index+1} de ${items.length}`:"Tutorial"} <strong>{item.shortTitle}</strong></p><Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar video"><X/></Button></div>
      {id ? <div className="video-frame" ref={frame}>
        {origin && <iframe ref={iframe} key={`${id}-${index}`} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&controls=0&disablekb=1&fs=0&cc_load_policy=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&enablejsapi=1&vq=hd1080&hl=es&cc_lang_pref=none&origin=${encodeURIComponent(origin)}`} title={item.title} allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen onLoad={tune} />}
        {started && <button type="button" className="video-shield" aria-label={playing?"Pausar video":"Reproducir video"} onClick={toggle} onContextMenu={(e)=>e.preventDefault()}>{!playing&&<span className="video-shield-state"><Play/></span>}</button>}
        <Button className="fullscreen-button" variant="secondary" size="icon" aria-label="Ver en pantalla completa" onClick={goFull}><Maximize/></Button>
      </div> : <div className="video-unavailable"><p>Este tutorial incluye el patrón visual, pero no tiene un video disponible para reproducir aquí.</p></div>}
      {id && !started && <p className="video-hint">Si el video no inicia solo, toca el botón de reproducir en el centro del video.</p>}
      <div className="player-details"><div><span className="eyebrow">Ahora viendo</span><h2>{item.title}</h2><p>{item.description}</p>{item.videoIds.length>1&&<div className="parts">{item.videoIds.map((_,i)=><Button key={i} variant={i===part?"default":"outline"} size="sm" onClick={()=>setPart(i)}>Parte {i+1}</Button>)}</div>}</div></div>
      <div className="player-nav"><Button variant="ghost" disabled={index===0} onClick={()=>onChange(index-1)}><ChevronLeft/>Anterior</Button><Button variant="ghost" disabled={index===items.length-1} onClick={()=>onChange(index+1)}>Siguiente<ChevronRight/></Button></div>
    </div>
  </div>;
}
