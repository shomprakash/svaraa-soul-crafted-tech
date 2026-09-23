export function SvaraaEmblem({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M50 9C58 20 59 31 50 43C41 31 42 20 50 9Z" />
        <path d="M50 91C42 80 41 69 50 57C59 69 58 80 50 91Z" />
        <path d="M9 50C20 42 31 41 43 50C31 59 20 58 9 50Z" />
        <path d="M91 50C80 58 69 59 57 50C69 41 80 42 91 50Z" />
        <path d="M21 21C34 23 42 30 45 43C32 40 24 33 21 21Z" />
        <path d="M79 79C66 77 58 70 55 57C68 60 76 67 79 79Z" />
        <path d="M79 21C77 34 70 42 57 45C60 32 67 24 79 21Z" />
        <path d="M21 79C23 66 30 58 43 55C40 68 33 76 21 79Z" />
        <circle cx="50" cy="50" r="10" />
        <circle cx="50" cy="50" r="4" fill="currentColor" stroke="none" />
      </g>
    </svg>
  );
}

export function Brand({ reverse = false }: { reverse?: boolean }) {
  return (
    <span className={`brand-lockup ${reverse ? "brand-lockup-reverse" : ""}`}>
      <SvaraaEmblem className="brand-emblem" />
      <span className="brand-word">svaraa</span>
    </span>
  );
}