const places = [
  { id: "delfzijl", label: "Delfzijl", x: 292, y: 78 },
  { id: "groningen", label: "Groningen", x: 198, y: 132 },
  { id: "haren", label: "Haren", x: 188, y: 168 },
  { id: "hoogezand", label: "Hoogezand", x: 248, y: 178 },
  { id: "winschoten", label: "Winschoten", x: 318, y: 188 },
  { id: "veendam", label: "Veendam", x: 278, y: 218 },
  { id: "zuidlaren", label: "Zuidlaren", x: 168, y: 228 },
  { id: "assen", label: "Assen", x: 148, y: 292 },
] as const;

export function WerkgebiedMap() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-surface">
      <div className="relative aspect-[5/4] w-full sm:aspect-[4/3]">
        <svg
          viewBox="0 0 400 340"
          className="h-full w-full"
          role="img"
          aria-label="Kaart van Noord-Nederland met bedieningsgebied"
        >
          <defs>
            <radialGradient id="map-glow" cx="55%" cy="45%" r="55%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="land-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--surface-2)" />
              <stop offset="100%" stopColor="var(--border)" stopOpacity="0.55" />
            </linearGradient>
          </defs>

          <rect width="400" height="340" fill="var(--surface)" />
          <ellipse cx="220" cy="160" rx="180" ry="140" fill="url(#map-glow)" />

          <path
            d="M86 96
               C104 58, 148 42, 188 48
               C218 52, 248 44, 278 54
               C308 64, 338 78, 352 108
               C364 134, 356 162, 342 188
               C328 214, 318 236, 302 258
               C282 288, 248 308, 208 314
               C168 320, 132 304, 108 274
               C86 248, 74 214, 70 178
               C66 142, 72 118, 86 96 Z"
            fill="url(#land-fill)"
            stroke="var(--border)"
            strokeWidth="1.5"
          />

          <path
            d="M120 140 C150 128, 190 124, 230 136 C260 146, 290 160, 310 180"
            fill="none"
            stroke="var(--muted)"
            strokeOpacity="0.22"
            strokeWidth="1"
          />
          <path
            d="M132 210 C168 198, 210 204, 248 222 C272 236, 292 252, 304 270"
            fill="none"
            stroke="var(--muted)"
            strokeOpacity="0.16"
            strokeWidth="1"
          />

          <circle
            cx="220"
            cy="180"
            r="88"
            fill="var(--accent)"
            fillOpacity="0.07"
            stroke="var(--accent)"
            strokeOpacity="0.28"
            strokeWidth="1"
            strokeDasharray="3 5"
          />

          {places.map((place) => (
            <g key={place.id}>
              <circle
                cx={place.x}
                cy={place.y}
                r="3.25"
                fill="var(--accent)"
                fillOpacity="0.9"
              />
              <text
                x={place.x + 8}
                y={place.y + 3.5}
                fill="var(--foreground)"
                fillOpacity="0.88"
                fontSize="10.5"
                fontFamily="var(--font-body), ui-sans-serif, sans-serif"
              >
                {place.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex items-center gap-2 border-t border-border px-4 py-3 text-xs text-muted sm:px-5">
        <span className="size-2 rounded-full bg-accent" />
        Bedieningsgebied
      </div>
    </div>
  );
}
