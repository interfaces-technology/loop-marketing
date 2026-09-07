import type { Metadata } from "next";
import Link from "next/link";

import { LAB_ORG, LIBRARY_REPO } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: "Loop is the wire for Interfaces Lab. The library is not a platform.",
};

export default function AboutPage() {
  return (
    <article className="flex max-w-2xl flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-medium tracking-tight">About</h1>
        <p className="leading-7 text-muted">
          Loop is made by{" "}
          <a href={LAB_ORG} className="text-foreground underline" target="_blank" rel="noreferrer">
            Interfaces Lab
          </a>
          . The library is MIT. This site is marketing, docs, and live examples — not the
          package itself.
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">What Loop is</h2>
        <p className="leading-7 text-muted">
          The wire. You author the two ends; Loop carries a normalized packet between them
          and never renders anything itself.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">What Loop is not (v0.1)</h2>
        <ul className="list-disc space-y-2 pl-5 leading-7 text-muted">
          <li>Cross-device relay</li>
          <li>A marketplace or publisher</li>
          <li>An AI composer</li>
          <li>A visual canvas</li>
          <li>Accounts or hosting</li>
        </ul>
        <p className="leading-7 text-muted">Those are platform concerns, out of scope here.</p>
      </section>

      <p className="text-sm text-muted">
        Library:{" "}
        <a href={LIBRARY_REPO} className="text-foreground underline" target="_blank" rel="noreferrer">
          github.com/interfaces-technology/loop
        </a>
        . Spec: <Link href="/docs" className="text-foreground underline">docs</Link>.
      </p>
    </article>
  );
}
