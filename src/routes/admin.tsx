import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Brand } from "@/components/Brand";
import { Button } from "@/components/ui/button";
import { getAdminLeads, lockAdmin, unlockAdmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  loader: () => getAdminLeads(),
  head: () => ({ meta: [{ title: "Waitlist | svaraa" }, { name: "description", content: "Private Svaraa waitlist management." }, { property: "og:title", content: "Svaraa waitlist" }, { property: "og:description", content: "Private Svaraa waitlist management." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: Admin,
});

function Admin() {
  const initial = Route.useLoaderData();
  const router = useRouter();
  const unlock = useServerFn(unlockAdmin);
  const lock = useServerFn(lockAdmin);
  const [error, setError] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const pin = String(new FormData(event.currentTarget).get("pin") ?? ""); const result = await unlock({ data: { pin } }).catch(()=>({ok:false as const})); if (!result.ok) { setError(true); return; } await router.invalidate(); }
  if (!initial.unlocked) return <main className="flex min-h-screen items-center justify-center bg-pearl p-6"><div className="w-full max-w-md border border-border bg-background p-8"><Brand/><p className="eyebrow mt-12">Private access</p><h1 className="mt-3 text-5xl text-primary">Waitlist</h1><form onSubmit={submit} className="mt-8"><label className="font-ui text-sm uppercase">Access PIN<input name="pin" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} required className="mt-2 h-14 w-full border border-input bg-background px-4 text-2xl outline-none focus:ring-2 focus:ring-ring"/></label>{error&&<p className="mt-3 text-destructive">That PIN is not recognised.</p>}<Button variant="primary" className="mt-6 w-full">Open waitlist</Button></form></div></main>;
  return <main className="min-h-screen bg-pearl"><header className="border-b border-border bg-background"><div className="page-shell flex h-24 items-center justify-between"><Brand/><Button variant="outline" onClick={async()=>{await lock(); await router.invalidate();}}>Lock</Button></div></header><div className="page-shell section-pad"><p className="eyebrow">Private overview</p><h1 className="mt-3 text-6xl text-primary">Waitlist leads</h1><p className="mt-3 text-muted-foreground">{initial.leads.length} {initial.leads.length===1?"person":"people"} registered</p><div className="mt-10 overflow-x-auto border border-border bg-background"><table className="w-full min-w-[720px] text-left"><thead className="border-b border-border bg-champagne font-ui text-sm uppercase"><tr><th className="p-5">Name</th><th className="p-5">Phone</th><th className="p-5">Email</th><th className="p-5">Joined</th></tr></thead><tbody>{initial.leads.map((lead)=><tr key={lead.id} className="border-b border-border last:border-0"><td className="p-5">{lead.name}</td><td className="p-5">{lead.phone}</td><td className="p-5">{lead.email}</td><td className="p-5">{new Date(lead.created_at).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric"})}</td></tr>)}</tbody></table></div></div></main>;
}