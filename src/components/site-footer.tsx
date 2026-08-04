import Link from "next/link";

import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-semibold tracking-tight">
            {SITE.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            {SITE.tagline}. Mobiele service in Noord-Nederland, bij u thuis of
            op locatie.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="text-foreground transition-colors hover:text-accent"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.phoneSven}`}
                className="text-foreground transition-colors hover:text-accent"
              >
                Sven · {SITE.phoneSvenDisplay}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.phoneJeremy}`}
                className="text-foreground transition-colors hover:text-accent"
              >
                Jeremy · {SITE.phoneJeremyDisplay}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
            Bedrijf
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>{SITE.legalName}</li>
            <li>
              {SITE.address.street}, {SITE.address.postalCode}{" "}
              {SITE.address.city}
            </li>
            <li>KVK · volgt</li>
            <li className="pt-2">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy
              </Link>
              <span className="mx-2 text-border">·</span>
              <Link href="/voorwaarden" className="hover:text-foreground">
                Voorwaarden
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 pb-8 pt-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {SITE.fullName}. Alle rechten
          voorbehouden.
        </p>
        <p>
          Gebouwd door{" "}
          <a
            href="https://internet-engineering.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted transition-colors hover:text-accent"
          >
            internet-engineering.com
          </a>
        </p>
      </div>
    </footer>
  );
}
