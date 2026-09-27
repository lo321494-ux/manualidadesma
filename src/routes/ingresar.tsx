import { createFileRoute, redirect } from "@tanstack/react-router";
import { LoginForm } from "@/components/login-form";
import { hasAccess } from "@/lib/gate.functions";

export const Route = createFileRoute("/ingresar")({
  beforeLoad: async () => { const { unlocked } = await hasAccess(); if (unlocked) throw redirect({ to: "/" }); },
  head: () => ({ meta: [
    { title: "Ingresar | Crochet" },
    { name: "description", content: "Accede a la plataforma de clases de crochet y tutoriales de amigurumis." },
    { property: "og:title", content: "Ingresar | Crochet" },
    { property: "og:description", content: "Accede a la plataforma educativa de crochet." },
    { name: "robots", content: "noindex" },
  ]}),
  component: Login,
});

function Login() {
  return <main className="login-page">
    <img className="login-bg" src="https://tejidoa.lovable.app/assets/hero-crochet-Dl1cDNvW.jpg" alt="" />
    <div className="login-shade" />
    <div className="login-card">
      <div className="brand login-brand"><span className="brand-mark" aria-hidden="true">✧</span><span className="brand-name">Crochet</span><span className="brand-mark" aria-hidden="true">✧</span></div>
      <span className="eyebrow login-eyebrow">Plataforma educativa cinematográfica</span>
      <h1>Aprende a tejer como nunca antes</h1>
      <p>Cursos, lecciones y tutoriales en video, disponibles en cualquier dispositivo. Ingresa con tu usuario y contraseña.</p>
      <LoginForm />
    </div>
  </main>;
}
