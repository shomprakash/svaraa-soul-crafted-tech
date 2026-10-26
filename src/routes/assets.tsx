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
        <section className="relative overflow-hidden border-b border-border bg-champagne py-20 lg:py-28">
          <div aria-hidden className="jali absolute inset-0 opacity-60" />
          <div className="page-shell relative">
            <p className="eyebrow">Official library · September 2026</p>
            <h1 className="mt-5 max-w-[900px] text-6xl leading-[.98] text-primary sm:text-7xl lg:text-[6rem]">svaraa brand assets</h1>
            <p className="mt-7 max-w-[670px] text-xl leading-[1.7] text-foreground/80">
              Transparent identity files and presentation-ready artwork for considered, consistent use of svaraa.
            </p>
          </div>
        </section>

        <section className="section-pad">
          <div className="page-shell">
            <div className="max-w-[760px]">
              <p className="numeral">01</p>
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
              <p className="numeral">02</p>
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