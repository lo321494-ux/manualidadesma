import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { hasAccess, signIn } from "@/lib/gate.functions";

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
  const router = useRouter();
  const login = useServerFn(signIn);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError(false);
    const f = new FormData(e.currentTarget);
    try {
      const { ok } = await login({ data: { user: String(f.get("user") ?? ""), password: String(f.get("password") ?? "") } });
      if (ok) await router.navigate({ to: "/" }); else setError(true);
    } catch { setError(true); } finally { setBusy(false); }
  }
  return <main className="login-page">
    <img className="login-bg" src="https://tejidoa.lovable.app/assets/hero-crochet-Dl1cDNvW.jpg" alt="" />
    <div className="login-shade" />
    <form className="login-card" onSubmit={onSubmit}>
      <div className="brand login-brand"><span className="brand-mark" aria-hidden="true">✧</span><span className="brand-name">Crochet</span><span className="brand-mark" aria-hidden="true">✧</span></div>
      <h1>Bienvenida a tu clase</h1>
      <p>Ingresa con el usuario y la contraseña que recibiste.</p>
      <label className="login-field"><User aria-hidden="true" /><input name="user" autoComplete="username" placeholder="Usuario" aria-label="Usuario" required /></label>
      <label className="login-field"><Lock aria-hidden="true" /><input name="password" type={show ? "text" : "password"} autoComplete="current-password" placeholder="Contraseña" aria-label="Contraseña" required />
        <button type="button" className="login-eye" onClick={() => setShow(!show)} aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}>{show ? <EyeOff /> : <Eye />}</button></label>
      {error && <p className="login-error" role="alert">Usuario o contraseña incorrectos.</p>}
      <Button size="lg" type="submit" disabled={busy} className="login-submit">{busy ? "Ingresando…" : "Ingresar"}</Button>
    </form>
  </main>;
}
