import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Brand, SvaraaEmblem } from "@/components/Brand";
import { supabase } from "@/integrations/supabase/client";
import hero from "@/assets/svaraa-hero.jpg";
import products from "@/assets/svaraa-products.jpg";
import founder01 from "@/assets/founder-01.jpg";
import founder02 from "@/assets/founder-02.jpg";
import recite from "@/assets/feature-recite.jpg";
import respond from "@/assets/feature-respond.jpg";
import remind from "@/assets/feature-remind.jpg";
import rescue from "@/assets/feature-rescue.jpg";
import recall from "@/assets/feature-recall.jpg";
import repository from "@/assets/feature-repository.jpg";
import riddle from "@/assets/feature-riddle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "svaraa | Wear the stillness you seek" },
      { name: "description", content: "svaraa is a sacred wearable companion for prayer, connection, memory and peace of mind, crafted in India." },
      { property: "og:title", content: "svaraa | Wear the stillness you seek" },
      { property: "og:description", content: "A mala pendant and wristband that carry your practice, your family's voice and quiet protection through every day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const features = [
  { name: "Recite", dev: "पाठ", line: "Sacred rhythm, on your hours.", body: "Morning slokas, pooja chants and evening mantras begin at the time you choose, shaped around your own practice and tradition.", image: recite },
  { name: "Respond", dev: "उत्तर", line: "A familiar voice, always near.", body: "Ask about the weather, the day or anything on your mind. svaraa answers in the warmth of a voice you already love.", image: respond },
  { name: "Remind", dev: "स्मरण", line: "Care that arrives gently.", body: "Spoken prompts for medicine, water, appointments and the small routines that help a day flow well.", image: remind },
  { name: "Rescue", dev: "रक्षा", line: "Quiet protection, when it matters.", body: "Fall detection and a spoken call for help reach family at once. No phone to find, no small button to press.", image: rescue },
  { name: "Recall", dev: "स्मृति", line: "A second memory for life's details.", body: "Keep the moments that matter close, from a grandchild's birthday to the last darshan at Tirupati.", image: recall },
  { name: "Repository", dev: "कोश", line: "The world, ready to be heard.", body: "Scripture, cricket, cinema and the news, spoken aloud. Your personal and health records, always within reach.", image: repository },
  { name: "Riddle", dev: "पहेली", line: "A sharper mind, through play.", body: "Daily spoken riddles, word games and trivia bring a little challenge and a great deal of joy.", image: riddle },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } }), { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Home() {
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [fontScale, setFontScale] = useState(100);
  const glow = useRef<HTMLDivElement>(null);
  useReveal();

  useEffect(() => {
    const move = (e: PointerEvent) => { if (glow.current) glow.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`; };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  const feature = features[active] ?? features[0]!;
  const go = (d: number) => setActive((a) => (a + d + 7) % 7);

  async function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formEl = event.currentTarget;
    setStatus("sending");
    const form = new FormData(formEl);
    const payload = { name: String(form.get("name") ?? "").trim(), phone: String(form.get("phone") ?? "").trim(), email: String(form.get("email") ?? "").trim() };
    if (payload.name.length < 2 || payload.phone.length < 7 || !/^\S+@\S+\.\S+$/.test(payload.email)) { setStatus("error"); return; }
    const { error } = await supabase.from("waitlist_leads").insert(payload);
    if (error) { setStatus("error"); return; }
    formEl.reset(); setStatus("done");
  }

  const nav = [["#companion", "The companion"], ["#why", "Why svaraa"], ["#seven", "Seven svaraas"], ["#makers", "Makers"]];

  return (
    <div style={{ fontSize: `${fontScale}%` }} className="relative">
      <div ref={glow} aria-hidden className="pointer-glow" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="page-shell flex h-[76px] items-center justify-between">
          <a href="#top" aria-label="svaraa home"><Brand /></a>
          <nav className="hidden items-center gap-9 font-ui text-[15px] lg:flex" aria-label="Main">
            {nav.map(([h, l]) => <a key={h} href={h} className="link-sweep">{l}</a>)}
          </nav>
          <div className="hidden items-center gap-6 lg:flex">
            <div className="flex items-baseline gap-2.5 font-ui text-[15px]" role="group" aria-label="Text size">
              {[100, 112.5, 125].map((s, i) => <button key={s} onClick={() => setFontScale(s)} aria-pressed={fontScale === s} className={fontScale === s ? "text-primary underline decoration-gold underline-offset-4" : "text-muted-foreground"}>A{"+".repeat(i)}</button>)}
            </div>
            <a href="#waitlist" className="btn btn-primary">Join the waitlist</a>
          </div>
          <button className="flex items-center gap-2 font-ui lg:hidden" aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}Menu</button>
        </div>
        {menu && <nav className="flex flex-col border-t border-border bg-background px-6 pb-6 font-ui text-lg lg:hidden">{[...nav, ["#waitlist", "Join the waitlist"]].map(([h, l]) => <a key={h} className="border-b border-border py-4" href={h} onClick={() => setMenu(false)}>{l}</a>)}</nav>}
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden bg-background pt-[76px]">
          <div aria-hidden className="jali absolute inset-0 opacity-60" />
          <span aria-hidden className="devanagari pointer-events-none absolute -right-10 top-24 select-none text-[22rem] leading-none text-gold/10 lg:text-[30rem]">स्वर</span>
          <div className="page-shell relative grid min-h-[calc(100svh-76px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
            <div>
              <p className="eyebrow reveal">A wearable practice <span className="mx-2 text-gold">|</span> Made in India</p>
              <h1 className="reveal mt-7 text-[3.6rem] leading-[.92] text-primary sm:text-[5rem] lg:text-[6.4rem]" style={{ animationDelay: "80ms" }}>
                Wear the<br /><em className="font-light text-gold-deep">stillness</em><br />you seek.
              </h1>
              <div className="hairline reveal mt-10 w-40" style={{ animationDelay: "160ms" }} />
              <p className="reveal mt-8 max-w-[520px] text-xl leading-[1.7] text-foreground/85 lg:text-[1.35rem]" style={{ animationDelay: "240ms" }}>
                A sacred companion worn as a rudraksha mala or a wristband. It keeps your prayers on time, your family's voice close and help within a word.
              </p>
              <div className="reveal mt-10 flex flex-wrap items-center gap-5" style={{ animationDelay: "320ms" }}>
                <a href="#waitlist" className="btn btn-primary">Reserve your svaraa</a>
                <a href="#seven" className="btn btn-ghost">See the seven svaraas <ArrowRight size={18} /></a>
              </div>
            </div>
            <div className="reveal relative mx-auto w-full max-w-[520px]" style={{ animationDelay: "200ms" }}>
              <div className="arch-outline absolute -inset-4" aria-hidden />
              <img src={hero} alt="A woman in an ivory kurta wearing the svaraa pendant in a sunlit courtyard" width={1536} height={1152} className="arch relative aspect-[4/5] w-full object-cover object-[70%_center]" />
              <div className="absolute -bottom-6 -left-6 hidden border border-border bg-background/95 px-6 py-5 shadow-[0_20px_50px_-20px_var(--primary)] backdrop-blur sm:block">
                <p className="font-ui text-[15px] text-muted-foreground">Battery</p>
                <p className="font-display text-4xl text-primary">7 days</p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <div className="border-y border-border bg-champagne">
          <div className="page-shell grid grid-cols-2 gap-y-6 py-8 text-center md:grid-cols-4">
            {[["IP68", "Wear it to the ghat"], ["7 days", "On a single charge"], ["No screen", "Nothing to learn"], ["Hindi + 9", "Indian languages"]].map(([a, b]) => (
              <div key={a} className="md:border-r md:border-border md:last:border-0"><p className="font-display text-3xl text-primary">{a}</p><p className="font-ui text-[15px] text-muted-foreground">{b}</p></div>
            ))}
          </div>
        </div>

        {/* COMPANION */}
        <section id="companion" className="section-pad">
          <div className="page-shell">
            <div data-reveal className="grid items-end gap-8 lg:grid-cols-2">
              <div><p className="numeral">01</p><p className="eyebrow mt-2">One companion, two forms</p><h2 className="mt-5 text-5xl leading-[1.05] text-primary lg:text-7xl">Made to belong,<br />not to be learned.</h2></div>
              <p className="max-w-[520px] text-xl text-foreground/80 lg:justify-self-end">No screens, no menus, no charging cables tangled on the bedside table. You speak, svaraa listens. That is the whole manual.</p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
              <div data-reveal className="group relative overflow-hidden rounded-[4px]"><img src={products} alt="svaraa mala pendant and wristband on carved sandstone" width={1408} height={1408} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03]" /></div>
              <div className="grid gap-8">
                {[["The mala", "A rudraksha mala with a bronze-set pendant that rests close to the voice and heart. Worn to the temple, the dinner table and to sleep."], ["The wristband", "Soft woven strap, the same quiet dial. For those who prefer it at the wrist, or wear both."]].map(([t, d], i) => (
                  <article data-reveal key={t} className="lift-card flex flex-col justify-between border border-border bg-pearl p-8 lg:p-10" style={{ transitionDelay: `${i * 80}ms` }}>
                    <p className="font-ui text-[15px] text-gold-deep">Form {i + 1}</p>
                    <div><h3 className="mt-6 text-4xl text-primary">{t}</h3><p className="mt-3 text-foreground/75">{d}</p></div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section id="why" className="section-pad relative overflow-hidden bg-pearl">
          <SvaraaEmblem className="absolute -left-40 top-1/2 size-[560px] -translate-y-1/2 text-gold opacity-[.07]" />
          <div className="page-shell relative">
            <div data-reveal className="max-w-[980px]">
              <p className="numeral">02</p><p className="eyebrow mt-2">Why svaraa</p>
              <h2 className="mt-5 text-5xl leading-[1.05] text-primary lg:text-[5.2rem]">Distance should never<br />feel like <em className="text-gold-deep">absence.</em></h2>
            </div>
            <div className="mt-20 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              {[["For parents", "who have earned their independence and intend to keep it. Their rituals, their pace, their home."], ["For their children", "in Pune, Dubai or Boston, who want to be near without hovering. A voice at the right hour. A call when it counts."], ["For the young seeker", "who wants discipline to live somewhere quieter than an app. Practice that stays on the body, not the phone."]].map(([t, d], i) => (
                <div data-reveal key={t} className="bg-pearl p-8 lg:p-12" style={{ transitionDelay: `${i * 80}ms` }}>
                  <p className="font-display text-6xl italic text-gold">{["i", "ii", "iii"][i]}</p>
                  <h3 className="mt-6 text-3xl text-primary">{t}</h3>
                  <p className="mt-3 text-foreground/75">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEVEN */}
        <section id="seven" className="section-pad">
          <div className="page-shell mb-12 flex flex-wrap items-end justify-between gap-8" data-reveal>
            <div><p className="numeral">03</p><p className="eyebrow mt-2">The seven svaraas</p><h2 className="mt-5 text-5xl leading-[1.05] text-primary lg:text-7xl">Seven notes.<br />One quiet day.</h2></div>
            <div className="flex items-center gap-4">
              <span className="font-ui text-lg text-muted-foreground"><span className="text-primary">0{active + 1}</span> / 07</span>
              <button onClick={() => go(-1)} aria-label="Previous svaraa" className="round-btn"><ArrowLeft /></button>
              <button onClick={() => go(1)} aria-label="Next svaraa" className="round-btn round-btn-solid"><ArrowRight /></button>
            </div>
          </div>

          <div className="relative h-[78svh] min-h-[560px] w-full overflow-hidden bg-aubergine-deep">
            {features.map((f, i) => (
              <img key={f.name} src={f.image} alt={`${f.name}: ${f.line}`} width={1200} height={800} loading="lazy" className={`slide-img absolute inset-0 size-full object-cover ${i === active ? "is-active" : ""}`} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-aubergine-deep/90 via-aubergine-deep/40 to-transparent" />
            <div className="page-shell relative flex h-full items-end pb-14 lg:items-center lg:pb-0">
              <div key={feature.name} className="reveal max-w-[560px] text-primary-foreground">
                <p className="devanagari text-3xl text-gold-light">{feature.dev}</p>
                <h3 className="mt-2 text-7xl leading-none lg:text-[7.5rem]">{feature.name}</h3>
                <p className="mt-5 font-display text-3xl italic text-gold-light">{feature.line}</p>
                <p className="mt-5 text-lg leading-[1.7] text-primary-foreground/85 lg:text-xl">{feature.body}</p>
              </div>
            </div>
          </div>

          <div className="page-shell mt-6 grid grid-cols-4 gap-3 sm:grid-cols-7" role="tablist" aria-label="Choose a svaraa">
            {features.map((f, i) => (
              <button key={f.name} role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={`thumb group text-left ${i === active ? "is-active" : ""}`}>
                <span className="block overflow-hidden rounded-[2px]"><img src={f.image} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover" /></span>
                <span className="mt-3 flex items-baseline gap-2 font-ui text-[15px]"><span className="text-gold-deep">0{i + 1}</span><span className="text-foreground">{f.name}</span></span>
              </button>
            ))}
          </div>
        </section>

        {/* TECH (deep band) */}
        <section className="section-pad relative overflow-hidden bg-aubergine-deep text-primary-foreground">
          <div aria-hidden className="jali jali-dark absolute inset-0" />
          <div className="page-shell relative grid gap-16 lg:grid-cols-2">
            <div data-reveal>
              <p className="numeral !text-gold-light">04</p><p className="eyebrow mt-2 !text-gold-light">Quietly advanced</p>
              <h2 className="mt-5 text-5xl leading-[1.05] lg:text-7xl">Ancient rhythm.<br /><em className="text-gold-light">Frontier</em> intelligence.</h2>
            </div>
            <div data-reveal className="self-end">
              <p className="text-xl leading-[1.7] text-primary-foreground/85">Powered by the world's leading frontier models and trained for life in a post-AI world. It listens, remembers and answers with precision, while everything you feel stays unmistakably human.</p>
              <div className="mt-10 grid grid-cols-3 border-t border-gold/40 pt-8">
                {[["< 1s", "to answer"], ["24/7", "fall watch"], ["10", "languages"]].map(([a, b]) => <div key={a}><p className="font-display text-4xl text-gold-light">{a}</p><p className="font-ui text-[15px] text-primary-foreground/70">{b}</p></div>)}
              </div>
            </div>
          </div>
        </section>

        {/* MAKERS */}
        <section id="makers" className="section-pad">
          <div className="page-shell grid gap-16 lg:grid-cols-[.9fr_1.1fr]">
            <div data-reveal>
              <p className="numeral">05</p><p className="eyebrow mt-2">Built by</p>
              <h2 className="mt-5 text-5xl leading-[1.08] text-primary lg:text-6xl">Two Indian-origin graduates, building from their Ivy League dorms.</h2>
              <p className="mt-6 max-w-[460px] text-xl text-foreground/80">Raised on bhajans at dawn, trained on the hardest problems in computing. svaraa is where both halves meet.</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              {[[founder01, "Founder 01"], [founder02, "Founder 02"]].map(([img, name], i) => (
                <article data-reveal key={name} className="lift-card" style={{ transitionDelay: `${i * 80}ms` }}>
                  <img src={img} alt={`Symbolic avatar for ${name}`} width={816} height={816} loading="lazy" className="arch aspect-[4/5] w-full object-cover" />
                  <h3 className="mt-6 text-3xl text-primary">{name}</h3>
                  <p className="font-ui text-[15px] text-muted-foreground">Full introduction coming soon</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="section-pad border-t border-border bg-champagne">
          <div className="page-shell grid gap-14 lg:grid-cols-2 lg:gap-24">
            <div data-reveal>
              <p className="numeral">06</p><p className="eyebrow mt-2">An early invitation</p>
              <h2 className="mt-5 text-5xl leading-[1.05] text-primary lg:text-7xl">Be among the first to wear svaraa.</h2>
              <p className="mt-6 max-w-[480px] text-xl text-foreground/80">Early access, a private demonstration at home and first word at launch. Reserving one for your parents? Add your own details and we will guide you through the gift.</p>
            </div>
            <form data-reveal onSubmit={submitWaitlist} noValidate className="grid gap-6 border border-border bg-background p-8 lg:p-12">
              <label className="font-ui text-[15px] text-foreground">Your name<input name="name" required maxLength={100} autoComplete="name" className="field" /></label>
              <label className="font-ui text-[15px] text-foreground">Phone number
                <span className="mt-2 flex"><span className="flex h-14 items-center border border-r-0 border-input bg-pearl px-4 text-lg">+91</span><input name="phone" type="tel" required maxLength={20} autoComplete="tel" className="field !mt-0" /></span>
              </label>
              <label className="font-ui text-[15px] text-foreground">Email address<input name="email" type="email" required maxLength={255} autoComplete="email" className="field" /></label>
              <button type="submit" disabled={status === "sending"} className="btn btn-primary mt-2 w-full justify-center">{status === "sending" ? "Reserving" : "Reserve my place"}</button>
              {status === "done" && <p role="status" className="text-primary">Thank you. You are on the list, and we will be in touch personally.</p>}
              {status === "error" && <p role="alert" className="text-destructive">Please check your name, number and email, then try once more.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-aubergine-deep py-16 text-primary-foreground">
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-10 border-b border-gold/30 pb-12 md:flex-row md:items-end">
            <div><Brand reverse /><p className="mt-5 font-display text-2xl italic text-gold-light">Sound. Stillness. Self.</p></div>
            <nav className="flex flex-wrap gap-8 font-ui text-[15px] text-primary-foreground/80">{nav.map(([h, l]) => <a key={h} href={h}>{l}</a>)}</nav>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-8 font-ui text-[15px] text-primary-foreground/60 md:flex-row">
            <p>© 2026 svaraa. All rights reserved.</p>
            <p><a href="/admin" className="mr-6">Admin</a><a href="https://superstar.wtf/shawm" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary-foreground/80">Tech by Shawm at Superstar Tech Inc <ArrowUpRight size={15} /></a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
