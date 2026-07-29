import { SITE } from "@/lib/site";

const values = [
  {
    title: "Kwaliteit boven kwantiteit",
    body: "Iedere auto krijgt de aandacht die nodig is voor een goed resultaat.",
  },
  {
    title: "Betrouwbaarheid",
    body: "Wij komen afspraken na en communiceren eerlijk en transparant.",
  },
  {
    title: "Klantgericht",
    body: "Persoonlijk advies en service op maat, alsof het onze eigen auto is.",
  },
] as const;

export function OverOns() {
  return (
    <section className="border-t border-border px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Over ons
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Gebouwd op zorg voor auto&apos;s
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {SITE.fullName} is opgericht door {SITE.owners[0]} en{" "}
            {SITE.owners[1]}. Wij geloven dat een auto meer is dan een
            vervoermiddel. Daarom behandelen wij iedere auto met dezelfde zorg
            alsof deze van onszelf is.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="border-t border-border pt-5">
              <h3 className="text-lg font-semibold tracking-tight">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
