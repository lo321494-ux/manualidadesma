import { Clapperboard, MessageCircle, KeyRound, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { LoginForm } from "@/components/login-form";

const WHATSAPP = `https://wa.me/573202271894?text=${encodeURIComponent("Hola, quiero obtener mi acceso a la plataforma Crochet.")}`;

/** Free 10-second preview for new visitors; then the platform locks and asks for access. */
export function PreviewGate({ unlocked, remaining }: { unlocked: boolean; remaining: number }) {
  const [left, setLeft] = useState(Math.ceil(remaining / 1000));
  const [done, setDone] = useState(false);
  const [tab, setTab] = useState<"new" | "member">("new");
  useEffect(() => {
    if (unlocked) return;
    const end = Date.now() + remaining;
    const tick = () => setLeft(Math.max(0, Math.ceil((end - Date.now()) / 1000)));
    tick();
    const t = setInterval(tick, 250);
    return () => clearInterval(t);
  }, [unlocked, remaining]);
  const locked = !unlocked && !done && left <= 0;
  useEffect(() => { document.body.style.overflow = locked ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [locked]);
  if (unlocked || done) return null;
  if (!locked) return <div className="preview-pill" role="status"><Sparkles aria-hidden="true" />Vista previa gratuita · <strong>{left}s</strong></div>;
  return <div className="gate-overlay" role="dialog" aria-modal="true" aria-labelledby="gate-title">
    <div className="gate-card">
      <div className="brand login-brand"><span className="brand-mark" aria-hidden="true">✧</span><span className="brand-name">Crochet</span><span className="brand-mark" aria-hidden="true">✧</span></div>
      <h2 id="gate-title">Tu vista previa terminó</h2>
      <p>Continúa disfrutando de toda la plataforma: cursos, lecciones y tutoriales en video.</p>
      <div className="gate-tabs" role="tablist">
        <a role="tab" aria-selected={tab === "new"} href={WHATSAPP} target="_blank" rel="noopener noreferrer" onClick={() => setTab("new")}><Clapperboard />Soy nuevo</a>
        <button type="button" role="tab" aria-selected={tab === "member"} onClick={() => setTab("member")}><KeyRound />Ya tengo acceso</button>
      </div>
      {tab === "new"
        ? <div className="gate-new"><p>Obtén tu acceso para ver todos los cursos y tutoriales sin límites, desde cualquier dispositivo.</p><a className="login-submit gate-cta" href={WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle />Escríbenos por WhatsApp</a><button type="button" className="gate-link" onClick={() => setTab("member")}>Ya recibí mi usuario y contraseña</button></div>
        : <LoginForm onDone={() => setDone(true)} />}
    </div>
  </div>;
}
