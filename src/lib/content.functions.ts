import { createServerFn } from "@tanstack/react-start";
import { useSession } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";
import { credentialsMatch } from "./cms-auth";
import { contentKeys, defaultContent, MAX_CONTENT_LENGTH } from "./site-content";

type CmsSession = { editor?: boolean };

function sessionConfig() {
  return {
    password: process.env["SVARAA_SESSION_SECRET"]!,
    name: "svaraa-cms",
    maxAge: 60 * 60 * 12,
    cookie: { httpOnly: true, secure: process.env["NODE_ENV"] === "production", sameSite: "lax" as const, path: "/" },
  };
}

function publicClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

async function readOverrides(): Promise<Record<string, string>> {
  const { data, error } = await publicClient().from("site_content").select("key,value");
  if (error) {
    console.error("[site_content] read failed", error.message);
    return {};
  }
  return Object.fromEntries((data ?? []).map((row) => [row.key, row.value]));
}

/** Public: saved homepage text. Falls back to defaults when the read fails. */
export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  return { overrides: await readOverrides() };
});

export const getEditorState = createServerFn({ method: "GET" }).handler(async () => {
  const session = await useSession<CmsSession>(sessionConfig());
  if (!session.data.editor) return { signedIn: false as const, overrides: {} as Record<string, string> };
  return { signedIn: true as const, overrides: await readOverrides() };
});

export const signInEditor = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ user: z.string().max(100), password: z.string().max(200) }).parse(input))
  .handler(async ({ data }) => {
    const ok = credentialsMatch(data.user, data.password, process.env["SVARAA_CMS_USER"], process.env["SVARAA_CMS_PASSWORD"]);
    if (!ok) {
      await new Promise((r) => setTimeout(r, 600));
      return { ok: false as const };
    }
    const session = await useSession<CmsSession>(sessionConfig());
    await session.update({ editor: true });
    return { ok: true as const };
  });

export const signOutEditor = createServerFn({ method: "POST" }).handler(async () => {
  const session = await useSession<CmsSession>(sessionConfig());
  await session.clear();
  return { ok: true as const };
});

export const saveSiteContent = createServerFn({ method: "POST" })
  .inputValidator((input) =>
    z.object({ changes: z.record(z.string(), z.string().max(MAX_CONTENT_LENGTH)) }).parse(input),
  )
  .handler(async ({ data }) => {
    const session = await useSession<CmsSession>(sessionConfig());
    if (!session.data.editor) throw new Error("Please sign in again.");

    const upserts: { key: string; value: string; updated_at: string }[] = [];
    const resets: string[] = [];
    const now = new Date().toISOString();
    for (const [key, value] of Object.entries(data.changes)) {
      if (!contentKeys.has(key)) continue;
      if (value.trim() === "" || value === defaultContent[key]) resets.push(key);
      else upserts.push({ key, value, updated_at: now });
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    if (upserts.length) {
      const { error } = await supabaseAdmin.from("site_content").upsert(upserts, { onConflict: "key" });
      if (error) throw new Error("Could not save. Please try again.");
    }
    if (resets.length) {
      const { error } = await supabaseAdmin.from("site_content").delete().in("key", resets);
      if (error) throw new Error("Could not save. Please try again.");
    }
    return { ok: true as const, overrides: await readOverrides() };
  });
