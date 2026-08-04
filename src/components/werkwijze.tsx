import { SectionHeading } from "@/components/section-heading";

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
    body: "U stapt weer in een frisse, verzorgde auto, zonder zelf weg te hoeven brengen.",
  },
] as const;

export function Werkwijze() {
  return (
    <section className="border-y border-border bg-surface/60 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          icon="Checkmark"
          eyebrow="Werkwijze"
          title="Zo werkt het"
          description="Van afspraak tot eindresultaat: helder, betrouwbaar en zonder verrassingen."
        />

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
