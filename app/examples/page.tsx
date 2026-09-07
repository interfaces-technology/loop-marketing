import type { Metadata } from "next";

import { ExampleCard, PageHeader } from "@/components/ui";
import { EXAMPLES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Examples",
  description: "Live Loop slices — text, D-pad, sliders cube.",
};

export default function ExamplesPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Runtime / examples"
        title="Three complete signals."
        description={
          <p>
          Three vertical slices from the v0.1 spec. Each demo runs the library in the
          browser, on this device.
          </p>
        }
      />
      <section className="grid gap-px bg-border pt-px md:grid-cols-3">
        {EXAMPLES.map((example) => (
          <ExampleCard
            key={example.slug}
            href={example.href}
            title={example.title}
            blurb={example.blurb}
            index={EXAMPLES.indexOf(example)}
          />
        ))}
      </section>
    </div>
  );
}
