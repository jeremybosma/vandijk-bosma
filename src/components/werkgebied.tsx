import { SectionHeading } from "@/components/section-heading";
import { SITE } from "@/lib/site";

export function Werkgebied() {
  return (
    <section id="werkgebied" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          icon="Mappin"
          eyebrow="Werkgebied"
          title="Actief in Noord-Nederland"
          description="Gevestigd in Hoogezand. In de opstartfase bedienen wij de volgende regio's. Twijfelt u of wij bij u kunnen komen? Neem contact op."
        />

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
