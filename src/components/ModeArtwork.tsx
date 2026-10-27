import type { CSSProperties, ReactNode } from "react";

const C = 200;
const pt = (r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [+(C + r * Math.cos(a)).toFixed(2), +(C + r * Math.sin(a)).toFixed(2)] as const;
};
const d = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

/** Shared instrument frame: tick ring, dashed orbit and cardinal marks. */
function Frame() {
  return (
    <g aria-hidden>
      <circle cx={C} cy={C} r={192} className="fill-none stroke-gold-light/25" strokeWidth={1} />
      <g className="ma-spin">
        {Array.from({ length: 72 }, (_, i) => {
          const long = i % 6 === 0;
          const [x1, y1] = pt(long ? 170 : 176, i * 5);
          const [x2, y2] = pt(184, i * 5);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={long ? "stroke-gold-light/60" : "stroke-gold-light/25"} strokeWidth={1} />;
        })}
      </g>
      <circle cx={C} cy={C} r={156} className="ma-spin-rev fill-none stroke-gold/30" strokeWidth={1} strokeDasharray="2 7" />
      {[0, 90, 180, 270].map((deg) => {
        const [x, y] = pt(192, deg);
        return <rect key={deg} x={x - 3.5} y={y - 3.5} width={7} height={7} transform={`rotate(45 ${x} ${y})`} className="fill-gold-light" />;
      })}
    </g>
  );
}

function Recite() {
  const beads = 27;
  return (
    <g>
      {[0, 1500, 3000].map((ms) => <circle key={ms} cx={C} cy={C} r={128} className="ma-ripple fill-none stroke-gold-light/70" strokeWidth={1} style={d(ms)} />)}
      {Array.from({ length: beads }, (_, i) => {
        const [x, y] = pt(118, (360 / beads) * i);
        return <circle key={i} cx={x} cy={y} r={4.5} className="fill-none stroke-gold/70" strokeWidth={1} />;
      })}
      <g className="ma-count">
        <circle cx={pt(118, 0)[0]} cy={pt(118, 0)[1]} r={6.5} className="fill-gold-light" />
      </g>
      <circle cx={C} cy={C} r={34} className="fill-none stroke-gold-light/50" strokeWidth={1} />
      {Array.from({ length: 8 }, (_, i) => (
        <ellipse key={i} cx={C} cy={C - 18} rx={6} ry={16} transform={`rotate(${i * 45} ${C} ${C})`} className="fill-none stroke-gold-light/80" strokeWidth={1} />
      ))}
      <circle cx={C} cy={C} r={4} className="fill-gold-light" />
    </g>
  );
}

function Respond() {
  const heights = [18, 34, 58, 40, 76, 102, 64, 118, 64, 102, 76, 40, 58, 34, 18];
  return (
    <g>
      {[1, 2, 3].map((n) => (
        <g key={n}>
          <path d={`M ${C - 70 - n * 18} ${C - 40 - n * 14} A ${70 + n * 24} ${70 + n * 24} 0 0 0 ${C - 70 - n * 18} ${C + 40 + n * 14}`} className="ma-pulse-a fill-none stroke-gold-light/60" strokeWidth={1} style={d(n * 160)} />
          <path d={`M ${C + 70 + n * 18} ${C - 40 - n * 14} A ${70 + n * 24} ${70 + n * 24} 0 0 1 ${C + 70 + n * 18} ${C + 40 + n * 14}`} className="ma-pulse-b fill-none stroke-gold-light/60" strokeWidth={1} style={d(n * 160)} />
        </g>
      ))}
      {heights.map((h, i) => (
        <rect key={i} x={C - 78.4 + i * 11.2 - 2} y={C - h / 2} width={4} height={h} rx={2} className="ma-bar fill-gold-light" style={d(i * 90)} />
      ))}
      <line x1={C - 130} y1={C} x2={C + 130} y2={C} className="stroke-gold/25" strokeWidth={1} />
    </g>
  );
}

function Remind() {
  const marks = [40, 150, 255];
  return (
    <g>
      <circle cx={C} cy={C} r={124} className="fill-none stroke-gold-light/40" strokeWidth={1} />
      {Array.from({ length: 12 }, (_, i) => {
        const [x1, y1] = pt(i % 3 === 0 ? 104 : 110, i * 30);
        const [x2, y2] = pt(118, i * 30);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-gold-light/80" strokeWidth={i % 3 === 0 ? 2 : 1} />;
      })}
      <g transform={`rotate(-90 ${C} ${C})`}><circle cx={C} cy={C} r={136} pathLength={1} className="ma-sweep fill-none stroke-gold-light/70" strokeWidth={1.5} /></g>
      {marks.map((deg, i) => {
        const [x, y] = pt(136, deg);
        return (
          <g key={deg}>
            <circle cx={x} cy={y} r={11} className="ma-halo fill-gold/20" style={d(i * 1300)} />
            <circle cx={x} cy={y} r={4.5} className="fill-gold-light" />
          </g>
        );
      })}
      <line x1={C} y1={C} x2={C} y2={C - 60} className="ma-hour stroke-gold-light" strokeWidth={3} strokeLinecap="round" />
      <line x1={C} y1={C + 14} x2={C} y2={C - 92} className="ma-minute stroke-gold-light/90" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={C} cy={C} r={6} className="fill-gold-light" />
    </g>
  );
}

function Person({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={22} className="fill-aubergine-deep stroke-gold-light/70" strokeWidth={1} />
      <circle cx={x} cy={y - 6} r={5} className="fill-none stroke-gold-light" strokeWidth={1.2} />
      <path d={`M ${x - 10} ${y + 12} Q ${x} ${y - 2} ${x + 10} ${y + 12}`} className="fill-none stroke-gold-light" strokeWidth={1.2} strokeLinecap="round" />
    </g>
  );
}

function Rescue() {
  const people = [300, 60, 180].map((deg) => pt(128, deg));
  return (
    <g>
      {people.map(([x, y], i) => (
        <line key={i} x1={C} y1={C} x2={x} y2={y} className="ma-flow stroke-gold-light/80" strokeWidth={1.2} strokeDasharray="3 11" style={d(i * 200)} />
      ))}
      {[0, 1200, 2400].map((ms) => <circle key={ms} cx={C} cy={C} r={92} className="ma-ripple fill-none stroke-gold/70" strokeWidth={1} style={d(ms)} />)}
      {people.map(([x, y], i) => <Person key={i} x={x} y={y} />)}
      <circle cx={C} cy={C} r={34} className="fill-aubergine-deep stroke-gold-light" strokeWidth={1.2} />
      <path d={`M ${C} ${C - 18} L ${C + 15} ${C - 11} L ${C + 15} ${C + 2} Q ${C + 15} ${C + 14} ${C} ${C + 20} Q ${C - 15} ${C + 14} ${C - 15} ${C + 2} L ${C - 15} ${C - 11} Z`} className="fill-none stroke-gold-light" strokeWidth={1.2} strokeLinejoin="round" />
      <path d={`M ${C - 6} ${C + 1} L ${C - 1} ${C + 6} L ${C + 7} ${C - 4}`} className="ma-tick fill-none stroke-gold-light" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
    </g>
  );
}

function Recall() {
  const nodes: [number, number][] = [[200, 200], [128, 128], [262, 112], [302, 214], [238, 296], [140, 280], [92, 196], [196, 84], [318, 300]];
  const links: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 6], [1, 7], [2, 7], [3, 8], [4, 8], [5, 6]];
  return (
    <g>
      {links.map(([a, b], i) => (
        <line key={i} x1={nodes[a]![0]} y1={nodes[a]![1]} x2={nodes[b]![0]} y2={nodes[b]![1]} pathLength={1} className="ma-draw stroke-gold-light/55" strokeWidth={1} style={d(200 + i * 110)} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 0 ? 20 : 11} className="ma-glow fill-gold/25" style={d(i * 420)} />
          <circle cx={x} cy={y} r={i === 0 ? 7 : 3.5} className="fill-gold-light" />
        </g>
      ))}
      <circle cx={C} cy={C} r={20} className="fill-none stroke-gold-light/70" strokeWidth={1} />
    </g>
  );
}

function Repository() {
  const rings: { r: number; dash: string; cls: string }[] = [
    { r: 46, dash: "18 8", cls: "ma-spin-fast" },
    { r: 72, dash: "34 10", cls: "ma-spin-rev-fast" },
    { r: 98, dash: "6 6", cls: "ma-spin-mid" },
    { r: 124, dash: "52 14", cls: "ma-spin-rev-mid" },
  ];
  return (
    <g>
      {rings.map(({ r, dash, cls }) => (
        <circle key={r} cx={C} cy={C} r={r} className={`${cls} fill-none stroke-gold-light/70`} strokeWidth={r === 98 ? 6 : 1.4} strokeDasharray={dash} />
      ))}
      <g className="ma-scan">
        <line x1={C} y1={C} x2={C} y2={C - 140} className="stroke-gold-light" strokeWidth={1.2} />
        <circle cx={C} cy={C - 140} r={4} className="fill-gold-light" />
        <path d={`M ${C} ${C} L ${C} ${C - 140} A 140 140 0 0 0 ${pt(140, -24)[0]} ${pt(140, -24)[1]} Z`} className="fill-gold/15" />
      </g>
      <rect x={C - 14} y={C - 18} width={28} height={36} rx={2} className="fill-aubergine-deep stroke-gold-light" strokeWidth={1.2} />
      {[-8, 0, 8].map((dy) => <line key={dy} x1={C - 8} y1={C + dy} x2={C + 8} y2={C + dy} className="stroke-gold-light/80" strokeWidth={1} />)}
    </g>
  );
}

function Riddle() {
  return (
    <g>
      <g className="ma-orbit">
        {[0, 90, 180, 270].map((deg) => {
          const [x, y] = pt(132, deg);
          return <circle key={deg} cx={x} cy={y} r={4} className="fill-gold-light" />;
        })}
      </g>
      <circle cx={C} cy={C} r={132} className="fill-none stroke-gold/30" strokeWidth={1} />
      <rect x={C - 80} y={C - 80} width={160} height={160} className="ma-star-a fill-none stroke-gold-light/80" strokeWidth={1.2} />
      <rect x={C - 80} y={C - 80} width={160} height={160} className="ma-star-b fill-none stroke-gold-light/80" strokeWidth={1.2} />
      <circle cx={C} cy={C} r={56} className="fill-aubergine-deep stroke-gold-light/60" strokeWidth={1} />
      <text x={C} y={C + 22} textAnchor="middle" className="fill-gold-light font-display" fontSize={64} fontStyle="italic">?</text>
    </g>
  );
}

const scenes: Record<string, () => ReactNode> = { recite: Recite, respond: Respond, remind: Remind, rescue: Rescue, recall: Recall, repository: Repository, riddle: Riddle };

/** Animated line artwork for one pendant mode. Decorative: the mode text carries the meaning. */
export function ModeArtwork({ mode, className }: { mode: string; className?: string | undefined }) {
  const Scene = scenes[mode] ?? Recite;
  return (
    <svg viewBox="-10 -10 420 420" className={`mode-art ${className ?? ""}`} aria-hidden focusable="false">
      <Frame />
      <g key={mode} className="ma-enter"><Scene /></g>
    </svg>
  );
}

/** Small matching glyph for the mode selector. */
export function ModeGlyph({ mode, className }: { mode: string; className?: string | undefined }) {
  const s = "fill-none stroke-current";
  const glyphs: Record<string, ReactNode> = {
    recite: <><circle cx={20} cy={20} r={3} className="fill-current" /><circle cx={20} cy={20} r={9} className={s} /><circle cx={20} cy={20} r={15} className={`${s} opacity-50`} /></>,
    respond: <>{[8, 14, 20, 26, 32].map((x, i) => { const h = [8, 16, 24, 16, 8][i]!; return <line key={x} x1={x} y1={20 - h / 2} x2={x} y2={20 + h / 2} className={s} strokeLinecap="round" />; })}</>,
    remind: <><circle cx={20} cy={20} r={14} className={s} /><path d="M20 11 V20 L26 24" className={s} strokeLinecap="round" /></>,
    rescue: <><line x1={20} y1={20} x2={9} y2={10} className={s} /><line x1={20} y1={20} x2={31} y2={10} className={s} /><line x1={20} y1={20} x2={20} y2={33} className={s} /><circle cx={20} cy={20} r={4} className="fill-current" /><circle cx={9} cy={10} r={2.5} className="fill-current" /><circle cx={31} cy={10} r={2.5} className="fill-current" /><circle cx={20} cy={33} r={2.5} className="fill-current" /></>,
    recall: <><path d="M8 26 L16 12 L26 18 L32 8 M16 12 L20 30 L26 18" className={s} /><circle cx={16} cy={12} r={2.5} className="fill-current" /><circle cx={26} cy={18} r={2.5} className="fill-current" /><circle cx={20} cy={30} r={2.5} className="fill-current" /></>,
    repository: <><circle cx={20} cy={20} r={5} className={s} /><circle cx={20} cy={20} r={10} className={s} strokeDasharray="5 3" /><circle cx={20} cy={20} r={15} className={s} strokeDasharray="9 4" /></>,
    riddle: <><rect x={10} y={10} width={20} height={20} className={s} /><rect x={10} y={10} width={20} height={20} className={s} transform="rotate(45 20 20)" /></>,
  };
  return <svg viewBox="0 0 40 40" className={className} strokeWidth={1.3} aria-hidden focusable="false">{glyphs[mode]}</svg>;
}
