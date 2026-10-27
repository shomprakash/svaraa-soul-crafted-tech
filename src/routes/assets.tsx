import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Download } from "lucide-react";
import { Brand } from "@/components/Brand";
import introSlide from "@/assets/brand-library/slide-01-product-introduction-pendant.png.asset.json";
import featureSlide from "@/assets/brand-library/slide-02-product-features-pendant.png.asset.json";
import sevenSlide from "@/assets/brand-library/slide-03-seven-modes-pendant.png.asset.json";
import logoLight from "@/assets/brand-library/svaraa-logo-for-light.png.asset.json";
import logoDark from "@/assets/brand-library/svaraa-logo-for-dark.png.asset.json";
import emblemLight from "@/assets/brand-library/svaraa-emblem-for-light.png.asset.json";
import emblemDark from "@/assets/brand-library/svaraa-emblem-for-dark.png.asset.json";
import wordmarkLight from "@/assets/brand-library/svaraa-wordmark-for-light.png.asset.json";
import wordmarkDark from "@/assets/brand-library/svaraa-wordmark-for-dark.png.asset.json";
import light01 from "@/assets/brand-library/colour-sets/svaraa-logo-light-01-maroon-antique-gold.png.asset.json";
import light02 from "@/assets/brand-library/colour-sets/svaraa-logo-light-02-oxblood-monotone.png.asset.json";
import light03 from "@/assets/brand-library/colour-sets/svaraa-logo-light-03-bronze-and-gold.png.asset.json";
import light04 from "@/assets/brand-library/colour-sets/svaraa-logo-light-04-wine-with-gold-centre.png.asset.json";
import light05 from "@/assets/brand-library/colour-sets/svaraa-logo-light-05-ink-plum-deep-gold.png.asset.json";
import dark01 from "@/assets/brand-library/colour-sets/svaraa-logo-dark-01-gold-leaf.png.asset.json";
import dark02 from "@/assets/brand-library/colour-sets/svaraa-logo-dark-02-champagne-rose-gold.png.asset.json";
import dark03 from "@/assets/brand-library/colour-sets/svaraa-logo-dark-03-blush-and-gold.png.asset.json";
import dark04 from "@/assets/brand-library/colour-sets/svaraa-logo-dark-04-ivory-gold-centre.png.asset.json";
import dark05 from "@/assets/brand-library/colour-sets/svaraa-logo-dark-05-gold-and-ivory.png.asset.json";

type ColourSet = {
  title: string;
  src: string;
  fileName: string;
  /** Sample surface the logo is shown on; brand asset data, not UI theming. */
  surface: { name: string; hex: string };
  /** Logo inks, listed for designers and printers. */
  inks: { name: string; hex: string }[];
  use: string;
};

const fileOf = (a: { original_filename: string }) => a.original_filename;

const lightSets: ColourSet[] = [
  { title: "Maroon and antique gold", src: light01.url, fileName: fileOf(light01), surface: { name: "Ivory", hex: "#F6F0E6" }, inks: [{ name: "Maroon", hex: "#5C1A2B" }, { name: "Antique gold", hex: "#A07A34" }], use: "The everyday choice for ivory, cream and paper." },
  { title: "Oxblood monotone", src: light02.url, fileName: fileOf(light02), surface: { name: "Sand", hex: "#EFE3CF" }, inks: [{ name: "Oxblood", hex: "#6A1E2C" }], use: "For warm beige and sand, where gold would fade." },
  { title: "Bronze and gold", src: light03.url, fileName: fileOf(light03), surface: { name: "White", hex: "#FFFFFF" }, inks: [{ name: "Bronze", hex: "#5E3F1C" }, { name: "Gold", hex: "#B08532" }], use: "For bright white, packaging and product cards." },
  { title: "Wine with a gold centre", src: light04.url, fileName: fileOf(light04), surface: { name: "Blush", hex: "#F4E6E2" }, inks: [{ name: "Wine", hex: "#7A2638" }, { name: "Gold centre", hex: "#B08532" }], use: "For blush and soft rose, invitations and gifting." },
  { title: "Ink plum and deep gold", src: light05.url, fileName: fileOf(light05), surface: { name: "Champagne stone", hex: "#E9DCC4" }, inks: [{ name: "Ink plum", hex: "#24111D" }, { name: "Deep gold", hex: "#86642A" }], use: "Highest contrast, for stone, textured or busy light surfaces." },
];

const darkSets: ColourSet[] = [
  { title: "Gold leaf monotone", src: dark01.url, fileName: fileOf(dark01), surface: { name: "Deep aubergine", hex: "#2A0F22" }, inks: [{ name: "Gold leaf", hex: "#D2AE62" }], use: "The signature evening version, for aubergine and black." },
  { title: "Champagne and rose gold", src: dark02.url, fileName: fileOf(dark02), surface: { name: "Charcoal", hex: "#1B1416" }, inks: [{ name: "Champagne", hex: "#F2E4C9" }, { name: "Rose gold", hex: "#D6A07E" }], use: "For charcoal, black and night photography." },
  { title: "Blush and gold", src: dark03.url, fileName: fileOf(dark03), surface: { name: "Maroon", hex: "#4A1424" }, inks: [{ name: "Blush", hex: "#EED3CE" }, { name: "Gold", hex: "#C9A04E" }], use: "Made for maroon and wine surfaces." },
  { title: "Ivory with a gold centre", src: dark04.url, fileName: fileOf(dark04), surface: { name: "Bronze", hex: "#3B2A1E" }, inks: [{ name: "Ivory", hex: "#FBF6EC" }, { name: "Gold centre", hex: "#D2AE62" }], use: "For brown, bronze and warm wood tones." },
  { title: "Gold word, ivory emblem", src: dark05.url, fileName: fileOf(dark05), surface: { name: "Plum", hex: "#3D1A3A" }, inks: [{ name: "Gold", hex: "#D8B66E" }, { name: "Ivory", hex: "#F4EAD8" }], use: "For plum and violet, where the name should lead." },
];

function ColourSetCard({ set }: { set: ColourSet }) {
  return (
    <article className="flex flex-col">
      <div
        className="grid aspect-[16/9] place-items-center overflow-hidden border border-border"
        style={{ backgroundColor: set.surface.hex }}
      >
        <img src={set.src} alt={`svaraa logo, ${set.title}, on ${set.surface.name.toLowerCase()}`} className="max-h-[62%] max-w-[76%] object-contain" loading="lazy" />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[1.6rem] leading-tight text-primary">{set.title}</h3>
          <p className="mt-1 font-ui text-[15px] leading-relaxed text-muted-foreground">{set.use}</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-ui text-[13px] text-foreground/70">
            {set.inks.map((ink) => (
              <li key={ink.name} className="flex items-center gap-2">
                <span aria-hidden className="size-3.5 rounded-full border border-border" style={{ backgroundColor: ink.hex }} />
                {ink.name} <span className="tracking-wide text-muted-foreground">{ink.hex}</span>
              </li>
            ))}
          </ul>
        </div>
        <a href={set.src} download={set.fileName} aria-label={`Download ${set.title}`} title={`Download ${set.fileName}`} className="round-btn shrink-0">
          <Download size={20} />
        </a>
      </div>
    </article>
  );
}


export const Route = createFileRoute("/assets")({
  head: () => ({
    meta: [
      { title: "svaraa | Brand assets" },
      { name: "description", content: "Official svaraa logos, emblems, wordmarks and presentation artwork." },
      { property: "og:title", content: "svaraa | Brand assets" },
      { property: "og:description", content: "Official svaraa logos, emblems, wordmarks and presentation artwork." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "/assets" }],
  }),
  component: AssetsPage,
});

type Asset = {
  title: string;
  note: string;
  src: string;
  fileName: string;
  dark?: boolean;
  contain?: boolean;
};

const identityAssets: Asset[] = [
  { title: "Complete logo · light backgrounds", note: "Transparent PNG · 1218 × 456", src: logoLight.url, fileName: "svaraa-logo-for-light.png", contain: true },
  { title: "Complete logo · dark backgrounds", note: "Transparent PNG · 1218 × 456", src: logoDark.url, fileName: "svaraa-logo-for-dark.png", dark: true, contain: true },
  { title: "Emblem · light backgrounds", note: "Transparent PNG · 456 × 456", src: emblemLight.url, fileName: "svaraa-emblem-for-light.png", contain: true },
  { title: "Emblem · dark backgrounds", note: "Transparent PNG · 456 × 456", src: emblemDark.url, fileName: "svaraa-emblem-for-dark.png", dark: true, contain: true },
  { title: "Wordmark · light backgrounds", note: "Transparent PNG · 766 × 253", src: wordmarkLight.url, fileName: "svaraa-wordmark-for-light.png", contain: true },
  { title: "Wordmark · dark backgrounds", note: "Transparent PNG · 766 × 253", src: wordmarkDark.url, fileName: "svaraa-wordmark-for-dark.png", dark: true, contain: true },
];

const slides: Asset[] = [
  { title: "01 · Product introduction", note: "PNG · 1920 × 1080 · 16:9", src: introSlide.url, fileName: "slide-01-product-introduction-pendant.png" },
  { title: "02 · Product features", note: "PNG · 1920 × 1080 · 16:9", src: featureSlide.url, fileName: "slide-02-product-features-pendant.png" },
  { title: "03 · The seven modes", note: "PNG · 1920 × 1080 · 16:9", src: sevenSlide.url, fileName: "slide-03-seven-modes-pendant.png" },
];

function AssetCard({ asset }: { asset: Asset }) {
  return (
    <article className="border-t border-border pt-5">
      <div className={`grid aspect-[16/9] place-items-center overflow-hidden ${asset.dark ? "bg-aubergine-deep" : "bg-pearl"}`}>
        <img
          src={asset.src}
          alt={`${asset.title} preview`}
          className={asset.contain ? "max-h-[72%] max-w-[78%] object-contain" : "size-full object-cover"}
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-5">
        <div>
          <h3 className="text-2xl leading-tight text-primary">{asset.title}</h3>
          <p className="mt-1 font-ui text-[15px] text-muted-foreground">{asset.note}</p>
        </div>
        <a
          href={asset.src}
          download={asset.fileName}
          aria-label={`Download ${asset.title}`}
          title={`Download ${asset.fileName}`}
          className="round-btn shrink-0"
        >
          <Download size={20} />
        </a>
      </div>
    </article>
  );
}

function AssetsPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background">
        <div className="page-shell flex min-h-[88px] items-center justify-between gap-6 py-4">
          <Brand />
          <Link to="/" className="btn btn-ghost">
            <ArrowLeft size={18} /> Back to svaraa
          </Link>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-border bg-champagne py-14 lg:py-16">
          <div aria-hidden className="jali absolute inset-0 opacity-60" />
          <div className="page-shell relative">
            <p className="eyebrow">Official library · October 2026</p>
            <h1 className="mt-4 max-w-[900px] text-5xl leading-[.98] text-primary sm:text-6xl lg:text-[4.75rem]">svaraa brand assets</h1>
            <p className="mt-5 max-w-[670px] text-xl leading-[1.7] text-foreground/80">
              Transparent identity files and presentation-ready artwork for considered, consistent use of svaraa.
            </p>
          </div>
        </section>

        <section id="colour-sets" className="section-pad">
          <div className="page-shell">
            <div className="max-w-[820px]">
              <p className="numeral">01</p>
              <p className="eyebrow mt-2">Logo colour sets</p>
              <h2 className="mt-5 text-5xl leading-[1.05] text-primary lg:text-7xl">One logo. Ten ways to sit well.</h2>
              <p className="mt-6 text-xl text-foreground/75">
                The same emblem, the same lettering, the same proportions. Only the maroon and gold tones change, so the logo stays clear on every surface. Each file is a transparent PNG at 1218 × 456.
              </p>
            </div>

            <div className="mt-16 flex items-baseline justify-between gap-6 border-t border-border pt-6">
              <h3 className="font-display text-3xl italic text-primary">For light backgrounds</h3>
              <p className="font-ui text-[13px] uppercase tracking-[0.18em] text-muted-foreground">Five sets</p>
            </div>
            <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {lightSets.map((set) => <ColourSetCard key={set.fileName} set={set} />)}
            </div>

            <div className="mt-20 flex items-baseline justify-between gap-6 border-t border-border pt-6">
              <h3 className="font-display text-3xl italic text-primary">For dark backgrounds</h3>
              <p className="font-ui text-[13px] uppercase tracking-[0.18em] text-muted-foreground">Five sets</p>
            </div>
            <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {darkSets.map((set) => <ColourSetCard key={set.fileName} set={set} />)}
            </div>
          </div>
        </section>

        <section className="section-pad border-t border-border">
          <div className="page-shell">
            <div className="max-w-[760px]">
              <p className="numeral">02</p>
              <p className="eyebrow mt-2">Identity</p>
              <h2 className="mt-5 text-5xl leading-[1.05] text-primary lg:text-7xl">Logo, emblem and wordmark.</h2>
              <p className="mt-6 text-xl text-foreground/75">Choose the version made for the background it will sit on. Every file has a transparent background.</p>
            </div>
            <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
              {identityAssets.map((asset) => <AssetCard key={asset.fileName} asset={asset} />)}
            </div>
          </div>
        </section>

        <section className="section-pad border-t border-border bg-pearl">
          <div className="page-shell">
            <div className="max-w-[840px]">
              <p className="numeral">03</p>
              <p className="eyebrow mt-2">Presentation artwork</p>
              <h2 className="mt-5 text-5xl leading-[1.05] text-primary lg:text-7xl">Three stories, ready to stand alone.</h2>
              <p className="mt-6 text-xl text-foreground/75">Each 16:9 master is composed at 1920 × 1080 for presentations, advertising and future video inserts.</p>
            </div>
            <div className="mt-16 grid gap-14">
              {slides.map((asset) => <AssetCard key={asset.fileName} asset={asset} />)}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-aubergine-deep py-12 text-primary-foreground">
        <div className="page-shell flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div><Brand reverse /><p className="mt-4 font-display text-2xl italic text-gold-light">Sound. Stillness. Self.</p></div>
          <p className="font-ui text-[15px] text-primary-foreground/60">© 2026 svaraa</p>
        </div>
      </footer>
    </div>
  );
}