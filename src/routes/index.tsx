import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, Check, Menu, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Brand, SvaraaEmblem } from "@/components/Brand";
import { Button } from "@/components/ui/button";
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
      { name: "description", content: "Svaraa is a sacred wearable companion for prayer, connection, memory and peace of mind." },
      { property: "og:title", content: "svaraa | Wear the stillness you seek" },
      { property: "og:description", content: "An intelligent sacred wearable, crafted like an heirloom and engineered with care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const features = [
  { name: "Recite", line: "Bringing sacred rhythms to daily life.", body: "Morning slokas, pooja chants and evening mantras begin at the time you choose, shaped around your own practice.", image: recite },
  { name: "Respond", line: "A familiar voice, always by your side.", body: "Ask about the weather, the day or anything on your mind. Svaraa responds naturally, with the warmth of a voice you know.", image: respond },
  { name: "Remind", line: "Care that arrives gently.", body: "Spoken prompts for medicine, hydration, appointments and the small routines that help each day flow well.", image: remind },
  { name: "Rescue", line: "Quiet protection when it matters.", body: "Fall detection and a voice-triggered SOS can reach family without searching for a phone or pressing a small button.", image: rescue },
  { name: "Recall", line: "An extended memory for life's details.", body: "Keep important moments and everyday context close, from a family birthday to the last visit to Tirupati.", image: recall },
  { name: "Repository", line: "The world, ready to be heard.", body: "Listen to answers about scripture, sport, cinema and news, while keeping personal records within easy reach.", image: repository },
  { name: "Riddle", line: "A sharper mind, through play.", body: "Daily spoken riddles, word puzzles and trivia bring a little challenge and a great deal of joy.", image: riddle },
];

function Home() {
  const [active, setActive] = useState(0);
  const [menu, setMenu] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [fontScale, setFontScale] = useState(100);
  const feature = features[active] ?? features[0];
  if (!feature) return null;

  async function submitWaitlist(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = { name: String(form.get("name") ?? "").trim(), phone: String(form.get("phone") ?? "").trim(), email: String(form.get("email") ?? "").trim() };
    if (payload.name.length < 2 || payload.phone.length < 7 || !/^\S+@\S+\.\S+$/.test(payload.email)) { setStatus("error"); return; }
    const { error } = await supabase.from("waitlist_leads").insert(payload);
    if (error) { setStatus("error"); return; }
    event.currentTarget.reset(); setStatus("done");
  }

  return (
    <div style={{ fontSize: `${fontScale}%` }}>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-sm">
        <div className="page-shell flex h-[72px] items-center justify-between lg:h-[88px]">
          <a href="#top" aria-label="Svaraa home"><Brand /></a>
          <nav className="hidden items-center gap-7 font-ui text-[14px] uppercase lg:flex" aria-label="Main navigation">
            <a href="#companion">The companion</a><a href="#seven">Seven svaraas</a><a href="#philosophy">Why svaraa</a><a href="#makers">Makers</a>
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <div className="flex items-baseline gap-2 font-ui text-sm" aria-label="Text size">
              {[100,112.5,125].map((size, i) => <button key={size} onClick={() => setFontScale(size)} className={fontScale === size ? "text-gold-deep underline" : "text-muted-foreground"}>A{i ? "+".repeat(i) : ""}</button>)}
            </div>
            <a href="#waitlist" className="svaraa-button svaraa-button-primary inline-flex items-center">Join waitlist</a>
          </div>
          <button className="lg:hidden" aria-label="Open menu" onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
        </div>
        {menu && <nav className="flex flex-col border-t border-border bg-background p-6 font-ui uppercase lg:hidden"><a className="py-4" href="#companion" onClick={()=>setMenu(false)}>The companion</a><a className="py-4" href="#seven" onClick={()=>setMenu(false)}>Seven svaraas</a><a className="py-4" href="#philosophy" onClick={()=>setMenu(false)}>Why svaraa</a><a className="py-4" href="#waitlist" onClick={()=>setMenu(false)}>Join waitlist</a></nav>}
      </header>

      <main id="top">
        <section className="relative min-h-[92vh] overflow-hidden pt-[72px] lg:pt-[88px]">
          <img src={hero} alt="A woman wearing the Svaraa pendant in a sunlit Indian courtyard" width={1536} height={1152} className="absolute inset-0 size-full object-cover object-[65%_center]" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/5" />
          <div className="page-shell relative flex min-h-[calc(92vh-72px)] items-end pb-20 pt-32 lg:min-h-[calc(92vh-88px)] lg:items-center lg:pb-0 lg:pt-0">
            <div className="reveal max-w-[710px]">
              <p className="eyebrow mb-5">A wearable practice</p>
              <h1 className="text-[3.4rem] leading-[.96] text-primary sm:text-7xl lg:text-[5.6rem]">Wear the stillness<br />you seek.</h1>
              <p className="mt-7 max-w-[590px] text-xl leading-relaxed text-foreground lg:text-2xl">A sacred everyday companion for prayer, presence and peace of mind. Crafted like an heirloom. Engineered with care.</p>
              <a href="#companion" className="mt-9 inline-flex items-center gap-3 font-ui text-sm uppercase text-gold-deep">Discover svaraa <ArrowDown size={17} /></a>
            </div>
          </div>
        </section>

        <div className="bg-champagne"><div className="page-shell grid py-6 md:grid-cols-3">
          {["Sacred jewellery, not medical tech", "Waterproof for continuous wear", "Designed in India, for Indian lives"].map((item) => <div key={item} className="flex items-center gap-3 border-border py-3 md:border-r md:px-7 first:pl-0 last:border-0"><Check size={18} className="text-gold-deep"/><span>{item}</span></div>)}
        </div></div>

        <section id="companion" className="section-pad bg-background">
          <div className="page-shell grid items-center gap-16 lg:grid-cols-2">
            <div className="relative"><SvaraaEmblem className="absolute -left-16 -top-14 size-64 text-gold opacity-[.08]"/><img src={products} alt="Svaraa mala pendant and wrist wearable" width={1408} height={1408} loading="lazy" className="arch gold-frame relative aspect-square w-full object-cover"/></div>
            <div><p className="eyebrow">One companion. Two forms.</p><h2 className="mt-4 text-5xl leading-tight text-primary lg:text-6xl">Made to belong in your life.</h2><p className="mt-7 max-w-[610px] text-xl">Wear Svaraa as a sacred mala pendant or an elegant wrist band. Both feel familiar from the first day, with no screen to learn and no routine to interrupt.</p>
              <div className="mt-10 grid gap-8 sm:grid-cols-2"><div className="border-t border-gold pt-5"><h3 className="text-3xl text-primary">Sacred pendant</h3><p className="mt-3 text-muted-foreground">A discreet companion set within a traditional mala, close to the voice and heart.</p></div><div className="border-t border-gold pt-5"><h3 className="text-3xl text-primary">Comfort wrist band</h3><p className="mt-3 text-muted-foreground">Lightweight, waterproof and made for continuous everyday wear.</p></div></div>
            </div>
          </div>
        </section>

        <section id="philosophy" className="section-pad bg-pearl text-center"><div className="page-shell"><p className="eyebrow">Why svaraa</p><h2 className="mx-auto mt-4 max-w-[900px] text-5xl leading-tight text-primary lg:text-7xl">Distance should never feel like absence.</h2><p className="mx-auto mt-7 max-w-[760px] text-xl lg:text-2xl">For parents who value independence. For children who want to remain close. For younger Indians who want spiritual discipline to live beyond an app. Svaraa turns care and ritual into a quiet presence that travels with you.</p></div></section>

        <section id="seven" className="section-pad overflow-hidden bg-background">
          <div className="page-shell mb-12 flex items-end justify-between"><div><p className="eyebrow">The seven svaraas</p><h2 className="mt-4 text-5xl text-primary lg:text-7xl">A fuller rhythm for every day.</h2></div><div className="hidden gap-3 sm:flex"><Button variant="outline" size="icon" aria-label="Previous feature" onClick={()=>setActive((active+6)%7)}><ArrowLeft/></Button><Button variant="primary" size="icon" aria-label="Next feature" onClick={()=>setActive((active+1)%7)}><ArrowRight/></Button></div></div>
          <div className="feature-active relative h-[70vh] min-h-[580px] w-full overflow-hidden bg-aubergine-deep">
            <img key={feature.name} src={feature.image} alt={`${feature.name} by Svaraa`} width={1200} height={800} loading="lazy" className="feature-image absolute inset-0 size-full object-cover"/>
            <div className="absolute inset-0 bg-gradient-to-t from-aubergine-deep via-aubergine-deep/15 to-transparent"/>
            <div className="page-shell absolute inset-x-0 bottom-0 pb-10 text-primary-foreground lg:pb-14"><p className="font-display text-3xl text-gold-light">0{active+1}</p><h3 className="mt-2 text-6xl lg:text-8xl">{feature.name}</h3><p className="mt-2 font-display text-2xl italic text-gold-light lg:text-3xl">{feature.line}</p><p className="mt-4 max-w-[680px] text-lg text-primary-foreground/90">{feature.body}</p><div className="mt-7 flex items-center gap-3 sm:hidden"><Button variant="gold" size="icon" aria-label="Previous feature" onClick={()=>setActive((active+6)%7)}><ArrowLeft/></Button><Button variant="gold" size="icon" aria-label="Next feature" onClick={()=>setActive((active+1)%7)}><ArrowRight/></Button></div></div>
          </div>
          <div className="page-shell mt-6 flex gap-2" aria-label="Select feature">{features.map((item,index)=><button key={item.name} onClick={()=>setActive(index)} className={`h-1 flex-1 ${index===active ? "bg-primary" : "bg-border"}`} aria-label={`Show ${item.name}`}/>)}</div>
        </section>

        <section className="section-pad bg-champagne"><div className="page-shell grid items-center gap-14 lg:grid-cols-[1.15fr_.85fr]"><div><p className="eyebrow">Quietly advanced</p><h2 className="mt-4 text-5xl leading-tight text-primary lg:text-7xl">Ancient rhythms.<br />Frontier intelligence.</h2><p className="mt-7 max-w-[680px] text-xl">Powered by the world's leading frontier models and trained for use in a post-AI world. The technology listens, remembers and responds with precision, while the experience remains unmistakably human.</p></div><div className="border-y border-gold py-10"><p className="font-display text-4xl italic text-primary">Technology should disappear into the ritual, not compete with it.</p></div></div></section>

        <section id="makers" className="section-pad bg-background"><div className="page-shell"><p className="eyebrow">Built by</p><h2 className="mt-4 max-w-[760px] text-5xl leading-tight text-primary lg:text-6xl">Two Indian-origin graduates doing cool things with superior technology in their Ivy League dorms.</h2><div className="mt-14 grid gap-8 md:grid-cols-2">{[[founder01,"Founder 01"],[founder02,"Founder 02"]].map(([img,name])=><article key={name} className="grid items-center gap-7 border border-border bg-pearl p-5 sm:grid-cols-[180px_1fr]"><img src={img} alt={`Symbolic technology avatar for ${name}`} width={816} height={816} loading="lazy" className="aspect-square w-full object-cover"/><div><p className="eyebrow">The makers</p><h3 className="mt-2 text-4xl text-primary">{name}</h3><p className="mt-3 text-muted-foreground">Identity and details to follow.</p></div></article>)}</div></div></section>

        <section id="waitlist" className="section-pad bg-aubergine-deep text-primary-foreground"><div className="page-shell grid gap-16 lg:grid-cols-2"><div><p className="eyebrow !text-gold-light">An early invitation</p><h2 className="mt-4 text-5xl leading-tight lg:text-7xl">Be among the first to wear svaraa.</h2><p className="mt-7 max-w-[580px] text-xl text-primary-foreground/80">Join the waitlist for early access, private demonstrations and launch updates.</p></div><form onSubmit={submitWaitlist} className="grid gap-5" noValidate><label className="font-ui text-sm uppercase">Name<input name="name" required minLength={2} maxLength={100} className="mt-2 h-14 w-full border border-gold-light/50 bg-transparent px-4 font-body text-lg outline-none focus:ring-2 focus:ring-gold-light"/></label><label className="font-ui text-sm uppercase">Phone number<input name="phone" type="tel" required minLength={7} maxLength={20} className="mt-2 h-14 w-full border border-gold-light/50 bg-transparent px-4 font-body text-lg outline-none focus:ring-2 focus:ring-gold-light"/></label><label className="font-ui text-sm uppercase">Email address<input name="email" type="email" required maxLength={255} className="mt-2 h-14 w-full border border-gold-light/50 bg-transparent px-4 font-body text-lg outline-none focus:ring-2 focus:ring-gold-light"/></label><Button variant="gold" type="submit" disabled={status==="sending"}>{status==="sending" ? "Joining..." : "Join the waitlist"}</Button>{status==="done"&&<p role="status" className="text-gold-light">You are on the list. We will be in touch.</p>}{status==="error"&&<p role="alert" className="text-primary-foreground">Please check all three details and try again.</p>}</form></div></section>
      </main>

      <footer className="border-t border-gold/30 bg-aubergine-deep py-12 text-primary-foreground"><div className="page-shell flex flex-col justify-between gap-8 md:flex-row md:items-end"><div><Brand reverse/><p className="mt-4 text-primary-foreground/70">Sound. Stillness. Self.</p></div><div className="text-left md:text-right"><a href="/admin" className="mr-5 text-primary-foreground/60">Admin</a><a href="https://superstar.wtf/shawm" rel="noreferrer" target="_blank" className="text-primary-foreground/70">Tech by Shawm at Superstar Tech Inc</a><p className="mt-3 text-sm text-primary-foreground/50">© 2026 svaraa</p></div></div></footer>
    </div>
  );
}