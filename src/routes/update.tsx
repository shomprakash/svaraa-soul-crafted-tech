import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Check, LogOut, RotateCcw, Search } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Brand } from "@/components/Brand";
import { getEditorState, saveSiteContent, signInEditor, signOutEditor } from "@/lib/content.functions";
import { contentSections, defaultContent, MAX_CONTENT_LENGTH, resolveContent, type ContentField } from "@/lib/site-content";

export const Route = createFileRoute("/update")({
  loader: () => getEditorState(),
  head: () => ({
    meta: [
      { title: "Text editor | svaraa" },
      { name: "description", content: "Private editor for the text on the svaraa website." },
      { property: "og:title", content: "svaraa text editor" },
      { property: "og:description", content: "Private editor for the text on the svaraa website." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: UpdatePage,
});

function UpdatePage() {
  const state = Route.useLoaderData();
  return state.signedIn ? <Editor initialOverrides={state.overrides} /> : <SignIn />;
}

function SignIn() {
  const router = useRouter();
  const signIn = useServerFn(signInEditor);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError(false);
    const result = await signIn({ data: { user: String(form.get("user") ?? ""), password: String(form.get("password") ?? "") } }).catch(() => ({ ok: false as const }));
    setBusy(false);
    if (!result.ok) { setError(true); return; }
    await router.invalidate();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-pearl p-6">
      <div className="w-full max-w-md border border-border bg-background p-8 sm:p-10">
        <Brand />
        <p className="eyebrow mt-12">Private access</p>
        <h1 className="mt-3 text-5xl text-primary">Text editor</h1>
        <p className="mt-3 text-foreground/75">Sign in to update the words on the svaraa website.</p>
        <form onSubmit={submit} className="mt-8 grid gap-5">
          <label className="font-ui text-[15px]">User ID<input name="user" autoComplete="username" autoCapitalize="none" required className="field" /></label>
          <label className="font-ui text-[15px]">Password<input name="password" type="password" autoComplete="current-password" required className="field" /></label>
          {error && <p role="alert" className="text-destructive">That user ID and password do not match.</p>}
          <button type="submit" disabled={busy} className="btn btn-primary mt-2 w-full justify-center">{busy ? "Signing in" : "Sign in"}</button>
        </form>
      </div>
    </main>
  );
}

function Editor({ initialOverrides }: { initialOverrides: Record<string, string> }) {
  const router = useRouter();
  const save = useServerFn(saveSiteContent);
  const signOut = useServerFn(signOutEditor);
  const [overrides, setOverrides] = useState(initialOverrides);
  const saved = useMemo(() => resolveContent(overrides), [overrides]);
  const [draft, setDraft] = useState<Record<string, string>>(saved);
  const [sectionId, setSectionId] = useState(contentSections[0]!.id);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorText, setErrorText] = useState("");

  const dirtyKeys = useMemo(() => Object.keys(draft).filter((k) => draft[k] !== saved[k]), [draft, saved]);
  const dirty = new Set(dirtyKeys);

  useEffect(() => {
    if (!dirtyKeys.length) return;
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirtyKeys.length]);

  const q = query.trim().toLowerCase();
  const visible = q
    ? contentSections
        .map((s) => ({ ...s, groups: s.groups.map((g) => ({ ...g, fields: g.fields.filter((f) => `${s.title} ${g.title} ${f.label} ${draft[f.key]}`.toLowerCase().includes(q)) })).filter((g) => g.fields.length) }))
        .filter((s) => s.groups.length)
    : contentSections.filter((s) => s.id === sectionId);

  async function saveAll() {
    if (!dirtyKeys.length) return;
    setStatus("saving");
    try {
      const changes = Object.fromEntries(dirtyKeys.map((k) => [k, draft[k] ?? ""]));
      const result = await save({ data: { changes } });
      const next = resolveContent(result.overrides);
      setOverrides(result.overrides);
      setDraft(next);
      setStatus("saved");
      window.setTimeout(() => setStatus((s) => (s === "saved" ? "idle" : s)), 3000);
    } catch (err) {
      setErrorText(err instanceof Error && err.message.includes("sign in") ? "Your session has ended. Please sign in again." : "Could not save. Please try again.");
      setStatus("error");
    }
  }

  async function handleSignOut() {
    if (dirtyKeys.length && !window.confirm("You have unsaved changes. Sign out anyway?")) return;
    await signOut();
    await router.invalidate();
  }

  const countFor = (id: string) => contentSections.find((s) => s.id === id)!.groups.reduce((n, g) => n + g.fields.filter((f) => dirty.has(f.key)).length, 0);
  const editedFor = (id: string) => contentSections.find((s) => s.id === id)!.groups.reduce((n, g) => n + g.fields.filter((f) => overrides[f.key] !== undefined).length, 0);

  return (
    <div className="min-h-screen bg-pearl">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-5"><Brand /><span className="hidden border-l border-border pl-5 font-ui text-[15px] text-muted-foreground sm:inline">Text editor</span></div>
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="/" target="_blank" rel="noreferrer" className="hidden items-center gap-1 font-ui text-[15px] text-primary sm:inline-flex">View site <ArrowUpRight size={15} /></a>
            <button type="button" onClick={handleSignOut} className="inline-flex items-center gap-2 px-3 py-2 font-ui text-[15px] text-foreground/75 hover:text-primary"><LogOut size={16} />Sign out</button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1320px] gap-8 px-5 pb-40 pt-8 sm:px-8 lg:grid-cols-[280px_1fr] lg:pt-12">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <label className="relative block">
            <span className="sr-only">Search all text</span>
            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search all text" className="field !mt-0 !h-12 !pl-11 !text-base" />
          </label>
          <nav aria-label="Sections" className="-mx-5 mt-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
            {contentSections.map((s) => {
              const active = !q && s.id === sectionId;
              const pending = countFor(s.id);
              return (
                <button key={s.id} type="button" onClick={() => { setQuery(""); setSectionId(s.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`flex shrink-0 items-center justify-between gap-3 border px-4 py-3 text-left font-ui text-[15px] transition-colors lg:border-0 lg:border-l-2 ${active ? "border-primary bg-background text-primary lg:border-gold" : "border-border bg-background/60 text-foreground/75 hover:text-primary lg:border-transparent lg:bg-transparent"}`}>
                  <span>{s.title}</span>
                  {pending > 0 ? <span className="size-2 rounded-full bg-gold" aria-label={`${pending} unsaved`} /> : editedFor(s.id) > 0 ? <span className="text-[13px] text-muted-foreground">{editedFor(s.id)} edited</span> : null}
                </button>
              );
            })}
          </nav>
          <p className="mt-8 hidden border-t border-border pt-6 font-ui text-[14px] leading-relaxed text-muted-foreground lg:block">Press Enter for a new line. Put words between asterisks, like *this*, to show them in gold italics.</p>
        </aside>

        <main>
          {visible.length === 0 && <p className="py-20 text-center text-muted-foreground">No text matches "{query}".</p>}
          {visible.map((s) => (
            <section key={s.id} className="mb-12">
              <p className="eyebrow">{q ? "Search results" : "Section"}</p>
              <h1 className="mt-2 text-4xl text-primary sm:text-5xl">{s.title}</h1>
              <p className="mt-2 text-foreground/70">{s.description}</p>
              {s.groups.map((g) => (
                <div key={g.title} className="mt-8 border border-border bg-background">
                  <h2 className="border-b border-border px-6 py-4 font-ui text-[15px] uppercase tracking-wide text-gold-deep">{g.title}</h2>
                  <div className="divide-y divide-border">
                    {g.fields.map((field) => (
                      <FieldEditor key={field.key} field={field} value={draft[field.key] ?? ""} isDirty={dirty.has(field.key)} isEdited={overrides[field.key] !== undefined}
                        onChange={(v) => setDraft((d) => ({ ...d, [field.key]: v }))}
                        onUndo={() => setDraft((d) => ({ ...d, [field.key]: saved[field.key] ?? "" }))}
                        onRestore={() => setDraft((d) => ({ ...d, [field.key]: defaultContent[field.key] ?? "" }))} />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          ))}
        </main>
      </div>

      <div className={`fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur transition-transform duration-500 ${dirtyKeys.length || status !== "idle" ? "translate-y-0" : "translate-y-full"}`}>
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <p className="font-ui text-[15px]" role="status" aria-live="polite">
            {status === "saved" && !dirtyKeys.length ? <span className="inline-flex items-center gap-2 text-primary"><Check size={17} />Saved. The live site now shows your changes.</span>
              : status === "error" ? <span className="text-destructive">{errorText}</span>
              : <span className="text-foreground/80">{dirtyKeys.length} unsaved {dirtyKeys.length === 1 ? "change" : "changes"}</span>}
          </p>
          <div className="flex gap-3">
            {dirtyKeys.length > 0 && <button type="button" onClick={() => { setDraft(saved); setStatus("idle"); }} className="px-4 font-ui text-[15px] text-foreground/70 hover:text-primary">Discard</button>}
            <button type="button" onClick={saveAll} disabled={!dirtyKeys.length || status === "saving"} className="btn btn-primary disabled:opacity-50">{status === "saving" ? "Saving" : "Save and publish"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldEditor({ field, value, isDirty, isEdited, onChange, onUndo, onRestore }: { field: ContentField; value: string; isDirty: boolean; isEdited: boolean; onChange: (v: string) => void; onUndo: () => void; onRestore: () => void }) {
  const id = `f-${field.key}`;
  const isOriginal = value === field.value;
  const rows = Math.min(8, Math.max(2, Math.ceil(value.length / 70) + value.split("\n").length - 1));
  return (
    <div className={`px-6 py-5 ${isDirty ? "bg-champagne/50" : ""}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label htmlFor={id} className="font-ui text-[15px] text-foreground">{field.label}</label>
        <div className="flex items-center gap-4 font-ui text-[13px]">
          {isDirty && <span className="text-gold-deep">Unsaved</span>}
          {!isDirty && isEdited && <span className="text-muted-foreground">Edited</span>}
          {isDirty && <button type="button" onClick={onUndo} className="text-foreground/70 underline-offset-4 hover:underline">Undo</button>}
          {!isOriginal && <button type="button" onClick={onRestore} className="inline-flex items-center gap-1 text-foreground/70 underline-offset-4 hover:underline"><RotateCcw size={13} />Restore original</button>}
        </div>
      </div>
      {field.long ? (
        <textarea id={id} value={value} rows={rows} maxLength={MAX_CONTENT_LENGTH} onChange={(e) => onChange(e.target.value)} className="field !h-auto resize-y py-3 leading-relaxed" />
      ) : (
        <input id={id} value={value} maxLength={300} onChange={(e) => onChange(e.target.value)} className="field" />
      )}
      {value.trim() === "" && <p className="mt-2 font-ui text-[13px] text-muted-foreground">Left empty, the original text will be shown.</p>}
    </div>
  );
}
