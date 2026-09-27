import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/gate.functions";

export function LoginForm({ onDone }: { onDone?: () => void }) {
  const router = useRouter();
  const login = useServerFn(signIn);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); if (window.location.search) window.history.replaceState(null, "", window.location.pathname); }, []);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setError(false);
    const f = new FormData(e.currentTarget);
    try {
      const { ok } = await login({ data: { user: String(f.get("user") ?? ""), password: String(f.get("password") ?? "") } });
      if (ok) { if (onDone) { onDone(); await router.invalidate(); } else await router.navigate({ to: "/" }); }
      else setError(true);
    } catch { setError(true); } finally { setBusy(false); }
  }
  return <form className="login-form" method="post" autoComplete="off" onSubmit={onSubmit}>
    <label className="login-field"><User aria-hidden="true" /><input name="user" autoComplete="off" autoCapitalize="none" spellCheck={false} placeholder="Usuario" aria-label="Usuario" required maxLength={100} /></label>
    <label className="login-field"><Lock aria-hidden="true" /><input name="password" type={show ? "text" : "password"} autoComplete="off" data-lpignore="true" placeholder="Contraseña" aria-label="Contraseña" required maxLength={200} />
      <button type="button" className="login-eye" onClick={() => setShow(!show)} aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}>{show ? <EyeOff /> : <Eye />}</button></label>
    {error && <p className="login-error" role="alert">Usuario o contraseña incorrectos.</p>}
    <Button size="lg" type="submit" disabled={busy || !ready} className="login-submit">{busy ? "Ingresando…" : "Ingresar"}</Button>
  </form>;
}
