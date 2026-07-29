import { SITE } from "@/lib/site";

export function Werkgebied() {
  return (
    <section id="werkgebied" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Werkgebied
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Actief in Noord-Nederland
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Gevestigd in Hoogezand. In de opstartfase bedienen wij de volgende
            regio&apos;s. Twijfelt u of wij bij u kunnen komen? Neem contact op.
          </p>
        </div>

        <ul className="mt-10 flex flex-wrap gap-2.5">
          {SITE.area.map((city) => (
            <li
              key={city}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm"
            >
              {city}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
