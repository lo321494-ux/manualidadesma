import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";

type GateSession = { unlocked?: boolean; previewStart?: number };
const PREVIEW_MS = 10_000;

function sessionConfig() {
  return {
    password: process.env["SESSION_SECRET"]!,
    name: "crochet-access",
    maxAge: 60 * 60 * 24 * 30,
    cookie: { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" },
  };
}

function matches(input: string, expected: string) {
  const a = createHash("sha256").update(input, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export const getAccess = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<GateSession>(sessionConfig());
  if (session.data.unlocked) return { unlocked: true as const, remaining: 0 };
  let start = session.data.previewStart;
  if (!start) { start = Date.now(); await session.update({ ...session.data, previewStart: start }); }
  return { unlocked: false as const, remaining: Math.max(0, start + PREVIEW_MS - Date.now()) };
});

export const hasAccess = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<GateSession>(sessionConfig());
  return { unlocked: !!session.data.unlocked };
});

export const signIn = createServerFn({ method: "POST" })
  .inputValidator((d) => z.object({ user: z.string().trim().min(1).max(100), password: z.string().min(1).max(200) }).parse(d))
  .handler(async ({ data }) => {
    const user = process.env["SITE_USER"];
    const pass = process.env["SITE_PASSWORD"];
    if (!user || !pass) return { ok: false as const };
    const okUser = matches(data.user.toLowerCase(), user.trim().toLowerCase());
    const okPass = matches(data.password, pass);
    if (!(okUser && okPass)) return { ok: false as const };
    const session = await useSession<GateSession>(sessionConfig());
    await session.update({ ...session.data, unlocked: true });
    return { ok: true as const };
  });

export const signOut = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<GateSession>(sessionConfig());
  await session.update({ unlocked: false, previewStart: 1 });
  return { ok: true as const };
});
