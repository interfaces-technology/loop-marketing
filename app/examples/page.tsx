import type { Metadata } from "next";
import Link from "next/link";

import { EXAMPLES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Examples",
  description: "Live Loop slices — text, D-pad, sliders cube.",
};

export default function ExamplesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex max-w-2xl flex-col gap-3">
        <h1 className="text-3xl font-medium tracking-tight">Examples</h1>
        <p className="leading-7 text-muted">
          Three vertical slices from the v0.1 spec. Each demo runs the library in the
          browser.
        </p>
      </div>
      <section className="grid gap-4 sm:grid-cols-3">
        {EXAMPLES.map((example) => (
          <Link
            key={example.slug}
            href={example.href}
            className="rounded-xl border border-border bg-panel p-5 hover:border-[#333]"
          >
            <h2 className="font-medium">{example.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{example.blurb}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
