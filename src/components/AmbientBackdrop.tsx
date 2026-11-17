export function AmbientBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top-right photonic cyan aura */}
      <div className="absolute -top-36 -right-32 w-[560px] h-[560px] rounded-full bg-sky-500/[0.10] dark:bg-sky-400/[0.11] blur-[140px]" />

      {/* Mid-left indigo/violet hardware aura */}
      <div className="absolute top-[38%] -left-40 w-[520px] h-[520px] rounded-full bg-indigo-500/[0.08] dark:bg-indigo-500/[0.10] blur-[150px]" />

      {/* Bottom-right cyan/teal telemetry aura */}
      <div className="absolute -bottom-40 right-[10%] w-[540px] h-[480px] rounded-full bg-cyan-500/[0.08] dark:bg-cyan-400/[0.09] blur-[140px]" />

      {/* Architectural CAD Triangle Wireframes */}
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        className="absolute inset-0 w-full h-full opacity-[0.07] dark:opacity-[0.08] text-sky-600 dark:text-sky-300"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="1220" cy="220" r="320" stroke="currentColor" strokeWidth="1" strokeDasharray="6 12" />
        <polygon points="1220,20 1480,460 960,460" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        <circle cx="180" cy="720" r="260" stroke="currentColor" strokeWidth="1" strokeDasharray="4 10" />
        <polygon points="180,520 390,880 -30,880" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <line x1="0" y1="450" x2="1440" y2="450" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 16" opacity="0.5" />
      </svg>

      {/* Ultra-fine film-grain / anodized micro-texture */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
