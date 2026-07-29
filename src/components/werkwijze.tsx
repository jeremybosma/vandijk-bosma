const steps = [
  {
    title: "Aanvraag",
    body: "Kies een pakket en een moment dat u uitkomt via de online planner.",
  },
  {
    title: "Advies",
    body: "Wij bevestigen de afspraak en denken mee over wat uw auto nodig heeft.",
  },
  {
    title: "Op locatie",
    body: "Wij komen bij u langs met professionele apparatuur en producten.",
  },
  {
    title: "Resultaat",
    body: "U krijgt een verzorgde auto terug, zonder zelf weg te hoeven brengen.",
  },
] as const;

export function Werkwijze() {
  return (
    <section className="border-y border-border bg-surface/60 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Werkwijze
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Zo werkt het
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Van afspraak tot eindresultaat: helder, betrouwbaar en zonder
            verrassingen.
          </p>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="font-display text-4xl font-semibold text-accent/35">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
