import { createHash, timingSafeEqual } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";

type AdminSession = { unlocked?: boolean };

function sessionConfig() {
  return {
    password: process.env["SVARAA_SESSION_SECRET"]!,
    name: "svaraa-admin",
    maxAge: 60 * 60 * 8,
    cookie: { httpOnly: true, secure: process.env["NODE_ENV"] === "production", sameSite: "lax" as const, path: "/" },
  };
}

function safeMatch(value: string, expected: string) {
  const a = createHash("sha256").update(value).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

export const unlockAdmin = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ pin: z.string().regex(/^\d{4}$/) }).parse(input))
  .handler(async ({ data }) => {
    const pins = (process.env["SVARAA_ADMIN_PINS"] ?? "").split(",");
    const valid = pins.some((pin) => safeMatch(data.pin, pin));
    if (!valid) return { ok: false as const };
    const session = await useSession<AdminSession>(sessionConfig());
    await session.update({ unlocked: true });
    return { ok: true as const };
  });

export const getAdminLeads = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  if (!session.data.unlocked) return { unlocked: false as const, leads: [] };
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.from("waitlist_leads").select("id,name,phone,email,created_at").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return { unlocked: true as const, leads: data ?? [] };
});

export const lockAdmin = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<AdminSession>(sessionConfig());
  await session.clear();
  return { ok: true };
});