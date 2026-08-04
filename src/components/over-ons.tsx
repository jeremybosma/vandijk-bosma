import { Icons } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/site";

const values = [
  {
    title: "Frisse cabine",
    body: "Schoon, neutraal en aangenaam om in te stappen. Zo voelt elke rit meteen beter.",
    icon: "Wind" as const,
  },
  {
    title: "Minder gedoe",
    body: "Wij komen bij u langs, ook 's avonds of in het weekend. U hoeft nergens heen.",
    icon: "House" as const,
  },
  {
    title: "Strak afgewerkt",
    body: "Professionele producten en netjes tot in de details, alsof het onze eigen auto is.",
    icon: "Sparkles" as const,
  },
] as const;

export function OverOns() {
  return (
    <section className="border-t border-border px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          icon="Sofa"
          eyebrow="Over ons"
          title="Gemaakt voor prettig rijden"
          description={
            <>
              {SITE.fullName} is opgericht door {SITE.owners[0]} en{" "}
              {SITE.owners[1]}. U zit er elke dag in. Dan mag het ook fris,
              rustig en schoon aanvoelen. Wij brengen die rust terug bij u thuis
              of op locatie, zonder poespas.
            </>
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((value) => {
            const Icon = Icons[value.icon];
            return (
              <div key={value.title} className="border-t border-border pt-5">
                <h3 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
                  <Icon className="text-accent" size={18} />
                  <span>{value.title}</span>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
