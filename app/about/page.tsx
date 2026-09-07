import type { Metadata } from "next";
import Link from "next/link";

import { Arrow, PageHeader, SectionHeading } from "@/components/ui";
import { LAB_ORG, LIBRARY_REPO } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Loop is the wire for Interfaces Lab. The library is not a platform.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Manifest / scope"
        title="A small wire, on purpose."
        description={
          <p>
          Loop is made by{" "}
          <a href={LAB_ORG} className="text-foreground underline underline-offset-4 hover:text-accent" target="_blank" rel="noreferrer">
            Interfaces Lab
          </a>
          . The library is MIT. This site is marketing, docs, and live examples — not the
          package itself.
          </p>
        }
      />

      <article className="grid gap-12 pt-12 lg:grid-cols-2 lg:gap-20">
        <section>
          <SectionHeading index="01" title="What Loop is">
            The wire. You author the two ends; Loop carries a normalized packet between them and
            never renders anything itself.
          </SectionHeading>
          <div className="mt-8 border border-border bg-panel p-5 font-mono text-sm">
            <p><span className="text-accent">source</span><span className="text-subtle"> / read</span></p>
            <div className="my-3 ml-5 h-6 w-px bg-accent" aria-hidden="true" />
            <p><span className="text-signal">packet</span><span className="text-subtle"> / normalize</span></p>
            <div className="my-3 ml-5 h-6 w-px bg-accent" aria-hidden="true" />
            <p><span className="text-accent">sink</span><span className="text-subtle"> / render</span></p>
          </div>
        </section>

        <section>
          <SectionHeading index="02" title="What Loop is not (v0.1)">
            Platform concerns stay out of this version.
          </SectionHeading>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {[
              "Cross-device relay",
              "A marketplace or publisher",
              "An AI composer",
              "A visual canvas",
              "Accounts or hosting",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 py-3 font-mono text-xs text-muted">
                <span className="text-accent" aria-hidden="true">×</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </article>

      <div className="mt-16 flex flex-wrap gap-6 border-t border-border pt-8 font-mono text-xs">
        <a href={LIBRARY_REPO} className="text-foreground hover:text-accent" target="_blank" rel="noreferrer">
          Library repository <span aria-hidden="true">↗</span>
        </a>
        <Link href="/docs" className="text-muted hover:text-accent">
          Read the spec <Arrow />
        </Link>
      </div>
    </div>
  );
}
