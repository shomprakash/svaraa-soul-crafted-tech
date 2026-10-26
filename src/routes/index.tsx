import { createFileRoute } from "@tanstack/react-router";
import { Activity, ArrowLeft, ArrowRight, ArrowUpRight, BatteryMedium, Droplets, Languages, Menu, Radio, ShieldCheck, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Brand, SvaraaEmblem } from "@/components/Brand";
import { PendantPicture } from "@/components/PendantPicture";
import { supabase } from "@/integrations/supabase/client";
import { pendantImages, pendantOgImage } from "@/lib/pendant-images";
import productFilmAsset from "@/assets/svaraa-product-film.webm.asset.json";
import productFilmPosterAsset from "@/assets/svaraa-product-film-poster.jpg.asset.json";
import founder01 from "@/assets/founder-01.jpg";
import founder02 from "@/assets/founder-02.jpg";

const pageTitle = "svaraa | A screenless pendant for everyday care";
const pageDescription = "Meet the svaraa pendant: a screenless rudraksha mala designed for everyday care, voice assistance and family connection.";
const ogImageAlt = "The svaraa pendant on a rudraksha mala, resting on a sandstone plinth in warm light";

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "svaraa pendant",
  brand: { "@type": "Brand", name: "svaraa" },
  description: "A screenless pendant for everyday care, voice assistance and family connection, worn on a rudraksha mala.",
  image: pendantOgImage,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      { property: "og:image", content: pendantOgImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: ogImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      { name: "twitter:image", content: pendantOgImage },
      { name: "twitter:image:alt", content: ogImageAlt },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(productSchema) }],
  }),
  component: Home,
});

const features = [
  { name: "Recite", dev: "पाठ", line: "Your daily practice, on time.", body: "Bring prayer and reflection into your routine with familiar audio, played through your svaraa pendant at your chosen times.", image: pendantImages.modeRecite, focus: "61% 66%", alt: "svaraa pendant on a rudraksha mala resting on draped ivory silk" },
  { name: "Respond", dev: "उत्तर", line: "Answers, simply spoken.", body: "Speak to your svaraa pendant for everyday questions and spoken answers in supported languages.", image: pendantImages.modeRespond, focus: "65% 60%", alt: "svaraa pendant leaning against carved travertine in warm light" },
  { name: "Remind", dev: "स्मरण", line: "Care that arrives gently.", body: "Let your pendant offer gentle spoken reminders for the routines and appointments you have set.", image: pendantImages.modeRemind, focus: "65% 60%", alt: "svaraa pendant and rudraksha mala draped over curved ivory stone" },
  { name: "Rescue", dev: "रक्षा", line: "Support, closer at hand.", body: "The pendant is designed to recognise possible falls and support alerts to connected family members. Voice assistance helps make asking for support more accessible.", image: pendantImages.modeRescue, focus: "71% 66%", alt: "svaraa pendant on a rudraksha mala against a deep plum backdrop" },
  { name: "Recall", dev: "स्मृति", line: "A second memory for life's details.", body: "Use your pendant's voice features to revisit the personal details and moments you have chosen to save.", image: pendantImages.modeRecall, focus: "65% 75%", alt: "svaraa pendant and rudraksha beads on a plain ivory surface" },
  { name: "Repository", dev: "कोश", line: "Information, ready to be heard.", body: "Access supported audio content and information through your pendant, with spoken interaction at the centre of the experience.", image: pendantImages.modeRepository, focus: "66% 52%", alt: "Close view of the svaraa pendant's floral face on travertine" },
  { name: "Riddle", dev: "पहेली", line: "A little curiosity, every day.", body: "Enjoy spoken riddles, trivia and word games through your pendant, bringing moments of curiosity into the day.", image: pendantImages.modeRiddle, focus: "65% 66%", alt: "svaraa pendant on a sandstone plinth, with arches softly behind" },
];

const careViews = [
  { label: "Wellbeing", icon: Activity, value: "Gentle awareness", note: "Everyday wellbeing awareness, shared with the family members you choose, without turning care into surveillance." },
  { label: "Fall watch", icon: ShieldCheck, value: "Designed to notice", note: "The pendant is designed to recognise possible falls, check in with the wearer and support alerts to chosen family contacts." },
  { label: "Family alerts", icon: Radio, value: "Chosen contacts", note: "Supported updates and safety alerts can reach the people who need to know, wherever they are." },
  { label: "Power", icon: BatteryMedium, value: "Up to 7 days", note: "A long-lasting charge keeps the pendant present through daily routines, nights and travel." },
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
  const [active, setActive] = useState(3);
  const [careView, setCareView] = useState(0);
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const glow = useRef<HTMLDivElement>(null);
  const productFilm = useRef<HTMLVideoElement>(null);
  useReveal();

  useEffect(() => {
    const move = (e: PointerEvent) => { if (glow.current) glow.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`; };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      const film = productFilm.current;
      if (!film) return;
      if (preference.matches) film.pause();
      else void film.play().catch(() => undefined);
    };
    applyPreference();
    preference.addEventListener("change", applyPreference);
    return () => preference.removeEventListener("change", applyPreference);
  }, []);

  const feature = features[active] ?? features[3] ?? features[0]!;
  const selectedCareView = careViews[careView] ?? careViews[0]!;
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

  const nav = [["#product", "The pendant"], ["#seven", "Seven modes"], ["#why", "Why svaraa"], ["#makers", "Makers"]];

  return (
    <div className="relative">
      <div ref={glow} aria-hidden className="pointer-glow" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="page-shell flex h-[76px] items-center justify-between">
          <a href="#top" aria-label="svaraa home"><Brand /></a>
          <nav className="hidden items-center gap-9 font-ui text-[15px] lg:flex" aria-label="Main">
            {nav.map(([h, l]) => <a key={h} href={h} className="link-sweep">{l}</a>)}
          </nav>
          <div className="hidden lg:flex">
            <a href="#waitlist" className="btn btn-primary">Join the waitlist</a>
          </div>
          <button className="flex items-center gap-2 font-ui lg:hidden" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}Menu</button>
        </div>
        {menu && <nav className="flex flex-col border-t border-border bg-background px-6 pb-6 font-ui text-lg lg:hidden" aria-label="Mobile">{[...nav, ["#waitlist", "Join the waitlist"]].map(([h, l]) => <a key={h} className="border-b border-border py-4" href={h} onClick={() => setMenu(false)}>{l}</a>)}</nav>}
      </header>

      <main id="top">
        {/* PRODUCT FILM */}
        <section className="film-hero" aria-labelledby="film-heading">
          <video
            ref={productFilm}
            className="film-hero-media"
            src={productFilmAsset.url}
            poster={productFilmPosterAsset.url}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="film-hero-overlay" aria-hidden />
          <div className="film-hero-frame" aria-hidden />
          <div className="page-shell film-hero-content">
            <h1 id="film-heading">Wear the stillness you seek</h1>
            <p className="film-hero-sub">A screenless pendant for everyday care, connection and stillness.</p>
            <div className="film-hero-actions">
              <a href="#product" className="btn btn-hero-light">Discover the pendant</a>
              <a href="#waitlist" className="btn btn-hero-outline">Join the waitlist</a>
            </div>
          </div>
        </section>

        {/* PRODUCT OVERVIEW */}
        <section id="product" className="product-overview relative overflow-hidden bg-pearl">
          <div aria-hidden className="jali absolute inset-0 opacity-45" />
          <div className="page-shell relative py-20 lg:py-28">
            <div data-reveal className="mx-auto max-w-[900px] text-center">
              <p className="numeral">01</p>
              <p className="eyebrow mt-2">A screenless pendant for everyday care</p>
              <h2 className="mt-5 text-5xl leading-[1.02] text-primary sm:text-6xl lg:text-[5.5rem]">Know they are well.<br /><em className="text-gold-deep">Wherever you are.</em></h2>
              <p className="mx-auto mt-7 max-w-[720px] text-xl leading-[1.7] text-foreground/80">Worn around the neck on a rudraksha mala, the svaraa pendant brings wellbeing awareness, voice assistance and family connection into everyday life. A familiar presence, without another screen to manage.</p>
            </div>

            <div data-reveal className="product-console mt-14 lg:mt-20">
              <div className="product-console-visual">
                <PendantPicture image={pendantImages.pendantStillness} alt="svaraa pendant with rudraksha beads resting on ivory silk" sizes="(min-width: 1024px) 620px, 100vw" className="size-full object-cover object-[60%_62%]" />
                <div className="product-console-caption">
                  <span className="status-pulse" aria-hidden />
                  <span>Illustrative care view</span>
                </div>
              </div>

              <div className="product-console-panel">
                <div className="flex items-start justify-between gap-5 border-b border-border pb-7">
                  <div><p className="font-ui text-[15px] uppercase text-gold-deep">Care view, illustrated</p><h3 className="mt-2 text-4xl text-primary">Close to them.<br />Clear for you.</h3></div>
                  <SvaraaEmblem className="size-12 shrink-0 text-gold" />
                </div>

                <div className="care-tabs mt-7" role="tablist" aria-label="Explore svaraa pendant care views">
                  {careViews.map((view, index) => {
                    const Icon = view.icon;
                    return <button key={view.label} type="button" role="tab" aria-selected={careView === index} onClick={() => setCareView(index)} className={`care-tab ${careView === index ? "is-active" : ""}`}><Icon size={19} /><span>{view.label}</span></button>;
                  })}
                </div>

                <div key={selectedCareView.label} className="care-readout reveal mt-8" role="tabpanel">
                  <p className="font-ui text-[15px] text-muted-foreground">{selectedCareView.label}</p>
                  <p className="mt-2 font-display text-[2.6rem] leading-none text-primary">{selectedCareView.value}</p>
                  <div className="care-signal" aria-hidden><span /><span /><span /><span /><span /></div>
                  <p className="mt-5 max-w-[490px] text-foreground/75">{selectedCareView.note}</p>
                </div>

                <div className="mt-8 grid grid-cols-3 border-t border-border pt-7">
                  <div><Droplets className="mb-2 text-gold-deep" size={21} /><p className="font-display text-2xl text-primary">IP68</p><p className="font-ui text-[15px] text-muted-foreground">Water resistant</p></div>
                  <div><BatteryMedium className="mb-2 text-gold-deep" size={21} /><p className="font-display text-2xl text-primary">7 days</p><p className="font-ui text-[15px] text-muted-foreground">Battery life</p></div>
                  <div><Languages className="mb-2 text-gold-deep" size={21} /><p className="font-display text-2xl text-primary">Indian</p><p className="font-ui text-[15px] text-muted-foreground">Languages</p></div>
                </div>
                <p className="mt-6 font-ui text-[15px] leading-relaxed text-muted-foreground">Designed for wellbeing awareness and timely assistance, not medical diagnosis. Views shown here are illustrative, not real wearer data.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <div className="border-y border-border bg-champagne">
          <div className="page-shell grid grid-cols-2 gap-y-6 py-8 text-center md:grid-cols-4">
            {[["Screenless", "Voice-first design"], ["IP68", "Water resistant"], ["7 days", "Battery life"], ["Indian", "Languages"]].map(([a, b]) => (
              <div key={a} className="md:border-r md:border-border md:last:border-0"><p className="font-display text-3xl text-primary">{a}</p><p className="font-ui text-[15px] text-muted-foreground">{b}</p></div>
            ))}
          </div>
        </div>

        {/* PENDANT SHOWCASE */}
        <section id="pendant" className="section-pad">
          <div className="page-shell">
            <div data-reveal className="grid items-end gap-8 lg:grid-cols-2">
              <div><p className="eyebrow">The svaraa pendant</p><h2 className="mt-5 text-5xl leading-[1.05] text-primary lg:text-7xl">Familiar in form.<br />Thoughtful in purpose.</h2></div>
              <p className="max-w-[520px] text-xl text-foreground/80 lg:justify-self-end">A bronze-set pendant on a rudraksha mala, with a deep-plum face and delicate floral detail. Designed to bring quiet technology into a form that feels personal and familiar.</p>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-[1.25fr_1fr]">
              <div data-reveal className="pendant-stage">
                <PendantPicture image={pendantImages.pendantProduct} alt="The complete svaraa rudraksha mala with its pendant, laid flat on ivory" sizes="(min-width: 1024px) 680px, 100vw" className="size-full object-contain" />
              </div>
              <div className="flex flex-col gap-8">
                <div data-reveal className="overflow-hidden rounded-[2px]">
                  <PendantPicture image={pendantImages.pendantDetail} alt="Close view of the svaraa pendant on carved travertine beside a bowl of white flowers" sizes="(min-width: 1024px) 540px, 100vw" className="aspect-[4/3] w-full object-cover object-[52%_60%]" />
                </div>
                <ul data-reveal className="pendant-details">
                  {[["Rudraksha mala", "Natural beads with fine gold spacers, worn like a familiar necklace."], ["Bronze-set pendant", "A deep-plum face held in warm bronze, finished with a floral emblem."], ["Screenless interaction", "Spoken, simple and calm. Nothing to tap, swipe or learn."]].map(([t, d]) => (
                    <li key={t}><h3 className="text-3xl text-primary">{t}</h3><p className="mt-1 text-foreground/75">{d}</p></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SEVEN */}
        <section id="seven" className="section-pad">
          <div className="page-shell mb-12 flex flex-wrap items-end justify-between gap-8" data-reveal>
            <div><p className="numeral">02</p><p className="eyebrow mt-2">Seven modes, one pendant</p><h2 className="mt-5 text-5xl leading-[1.05] text-primary lg:text-7xl">Everyday support.<br />Within easy reach.</h2></div>
            <div className="flex items-center gap-4">
              <span className="font-ui text-lg text-muted-foreground"><span className="text-primary">0{active + 1}</span> / 07</span>
              <button onClick={() => go(-1)} aria-label="Previous mode" className="round-btn"><ArrowLeft /></button>
              <button onClick={() => go(1)} aria-label="Next mode" className="round-btn round-btn-solid"><ArrowRight /></button>
            </div>
          </div>

          <div className="relative h-[78svh] min-h-[560px] w-full overflow-hidden bg-aubergine-deep">
            {features.map((f, i) => (
              <PendantPicture key={f.name} image={f.image} alt={i === active ? f.alt : ""} sizes="100vw" className={`slide-img absolute inset-0 size-full object-cover ${i === active ? "is-active" : ""}`} style={{ objectPosition: f.focus }} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-aubergine-deep/95 via-aubergine-deep/45 to-transparent lg:bg-gradient-to-r lg:from-aubergine-deep/90 lg:via-aubergine-deep/40" />
            <div className="page-shell relative flex h-full items-end pb-14 lg:items-center lg:pb-0">
              <div key={feature.name} className="reveal max-w-[560px] text-primary-foreground" aria-live="polite">
                <p className="devanagari text-3xl text-gold-light">{feature.dev}</p>
                <h3 className="mt-2 text-7xl leading-none lg:text-[7.5rem]">{feature.name}</h3>
                <p className="mt-5 font-display text-3xl italic text-gold-light">{feature.line}</p>
                <p className="mt-5 text-lg leading-[1.7] text-primary-foreground/85 lg:text-xl">{feature.body}</p>
              </div>
            </div>
          </div>

          <div className="page-shell mt-6 grid grid-cols-4 gap-3 sm:grid-cols-7" role="tablist" aria-label="Choose a pendant mode">
            {features.map((f, i) => (
              <button key={f.name} role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={`thumb group text-left ${i === active ? "is-active" : ""}`}>
                <span className="block overflow-hidden rounded-[2px]"><PendantPicture image={f.image} alt="" sizes="180px" className="aspect-[4/3] w-full object-cover" style={{ objectPosition: f.focus }} /></span>
                <span className="mt-3 flex items-baseline gap-2 font-ui text-[15px]"><span className="text-gold-deep">0{i + 1}</span><span className="text-foreground">{f.name}</span></span>
              </button>
            ))}
          </div>
        </section>

        {/* WHY */}
        <section id="why" className="section-pad relative overflow-hidden bg-pearl">
          <SvaraaEmblem className="absolute -left-40 top-1/2 size-[560px] -translate-y-1/2 text-gold opacity-[.07]" />
          <div className="page-shell relative">
            <div data-reveal className="max-w-[980px]">
              <p className="numeral">03</p><p className="eyebrow mt-2">Why svaraa</p>
              <h2 className="mt-5 text-5xl leading-[1.05] text-primary lg:text-[5.2rem]">Care should preserve<br /><em className="text-gold-deep">independence.</em></h2>
            </div>
            <div className="mt-20 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
              {[["For parents", "A familiar pendant that fits into personal routines and keeps everyday assistance close."], ["For their children", "A thoughtful way to stay connected through supported updates and alerts, while respecting a parent's independence."], ["For daily stillness", "Prayer, reflection and spoken interaction in a pendant that asks for less screen time."]].map(([t, d], i) => (
                <div data-reveal key={t} className="bg-pearl p-8 lg:p-12" style={{ transitionDelay: `${i * 80}ms` }}>
                  <p className="font-display text-6xl italic text-gold">{["i", "ii", "iii"][i]}</p>
                  <h3 className="mt-6 text-3xl text-primary">{t}</h3>
                  <p className="mt-3 text-foreground/75">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNOLOGY (deep section) */}
        <section className="section-pad relative overflow-hidden bg-aubergine-deep text-primary-foreground">
          <div aria-hidden className="jali jali-dark absolute inset-0" />
          <div className="page-shell relative grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
            <div data-reveal>
              <p className="numeral !text-gold-light">04</p><p className="eyebrow mt-2 !text-gold-light">Quietly advanced</p>
              <h2 className="mt-5 text-5xl leading-[1.05] lg:text-7xl">Quiet technology.<br /><em className="text-gold-light">Thoughtfully</em> held.</h2>
              <p className="mt-8 max-w-[560px] text-xl leading-[1.7] text-primary-foreground/85">The svaraa pendant brings supported voice, memory, wellbeing and family-alert features together in one screenless device. The experience is designed around simple spoken interaction and everyday familiarity.</p>
              <div className="mt-10 grid max-w-[560px] grid-cols-3 border-t border-gold/40 pt-8">
                {[["Screenless", "by design"], ["Spoken", "interaction"], ["Family", "alert support"]].map(([a, b]) => <div key={a}><p className="font-display text-3xl text-gold-light lg:text-4xl">{a}</p><p className="font-ui text-[15px] text-primary-foreground/70">{b}</p></div>)}
              </div>
            </div>
            <div data-reveal className="tech-frame">
              <PendantPicture image={pendantImages.pendantTechnology} alt="svaraa pendant on a rudraksha mala against a deep plum backdrop" sizes="(min-width: 1024px) 480px, 100vw" className="arch aspect-[4/5] w-full object-cover object-[12%_60%]" />
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
              <h2 className="mt-5 text-5xl leading-[1.05] text-primary lg:text-[4.2rem]">Be among the first to discover the svaraa pendant.</h2>
              <p className="mt-6 max-w-[480px] text-xl text-foreground/80">Join the early-access list for launch updates and demonstration details. Exploring svaraa for a parent? Leave your contact details and our team will help you take the next step.</p>
              <div className="mt-10 hidden overflow-hidden rounded-[2px] md:block">
                <PendantPicture image={pendantImages.pendantInvitation} alt="svaraa pendant and rudraksha mala draped over curved ivory stone" sizes="(min-width: 1024px) 560px, 90vw" className="aspect-[16/10] w-full object-cover object-[43%_64%]" />
              </div>
            </div>
            <form data-reveal onSubmit={submitWaitlist} noValidate className="grid content-start gap-6 border border-border bg-background p-8 lg:p-12">
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
            <div>
              <Brand reverse />
              <p className="mt-5 font-display text-2xl italic text-gold-light">Sound. Stillness. Self.</p>
              <p className="mt-3 max-w-[420px] font-ui text-[15px] text-primary-foreground/70">A screenless pendant for everyday care, voice assistance and family connection.</p>
            </div>
            <nav className="flex flex-wrap gap-8 font-ui text-[15px] text-primary-foreground/80" aria-label="Footer">{nav.map(([h, l]) => <a key={h} href={h}>{l}</a>)}</nav>
          </div>
          <div className="flex flex-col justify-between gap-4 pt-8 font-ui text-[15px] text-primary-foreground/60 md:flex-row">
            <p>© 2026 svaraa. All rights reserved.</p>
            <p><a href="https://superstar.wtf/shawm" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary-foreground/80">Tech by Shawm at Superstar Tech Inc <ArrowUpRight size={15} /></a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
