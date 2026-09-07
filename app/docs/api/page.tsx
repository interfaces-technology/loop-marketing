import type { Metadata } from "next";

import { CodeBlock } from "@/components/code-block";
import { LocalNav, PageHeader, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "API",
  description: "Loop v0.1 public API — source, pipe, input, tick.",
};

const SURFACE = `loop.source  loop.transform  loop.sink  loop.component
loop.pipe    loop.connect
loop.input   loop.output     loop.tick
handle.value  handle.on  handle.bind`;

const PIPE = `loop.pipe(...stages)
loop.connect(a, b)   // two-item pipe`;

const HANDLES = `loop.input(name): Handle
loop.output(name): Sink
loop.tick(fn): () => void`;

const API_SECTIONS = [
  { id: "stages", label: "Stage registration" },
  { id: "pipe", label: "Pipe" },
  { id: "handles", label: "Input and tick" },
] as const;

export default function ApiPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Reference / v0.1"
        title="Small surface. One contract."
        description={
          <p>
          v0.1 surface. <code className="font-mono text-foreground">layout</code>,{" "}
          <code className="font-mono text-foreground">filter</code>, and{" "}
          <code className="font-mono text-foreground">capture</code> are stubs until slice 4+.
          </p>
        }
      >
        <div className="max-w-2xl">
          <CodeBlock code={SURFACE} label="public surface" />
        </div>
      </PageHeader>

      <div className="grid gap-10 pt-10 lg:grid-cols-[13rem_minmax(0,44rem)] lg:gap-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <LocalNav items={API_SECTIONS} />
        </aside>
        <article className="min-w-0 divide-y divide-border">
          <section id="stages" className="scroll-mt-24 pb-12">
            <SectionHeading index="01" title="source / transform / sink" />
            <p className="leading-7 text-muted">
          Register a stage. <code className="font-mono text-foreground">component()</code> dispatches
          on whether the def has <code className="font-mono text-foreground">read</code>,{" "}
          <code className="font-mono text-foreground">process</code>, or{" "}
          <code className="font-mono text-foreground">render</code>.
            </p>
          </section>

          <section id="pipe" className="scroll-mt-24 py-12">
            <SectionHeading index="02" title="pipe">
              Type-checks adjacent stages, then returns a pipeline with{" "}
              <code className="font-mono text-foreground">start()</code> and{" "}
              <code className="font-mono text-foreground">stop()</code>.
            </SectionHeading>
            <CodeBlock code={PIPE} label="wiring" />
          </section>

          <section id="handles" className="scroll-mt-24 pt-12">
            <SectionHeading index="03" title="input / tick">
              Built-in inputs are{" "}
              <code className="font-mono text-foreground">keyboard</code>,{" "}
              <code className="font-mono text-foreground">dpad</code>, and{" "}
              <code className="font-mono text-foreground">sliders</code>. Bind the handle to your
              own element. Hardware sinks come later.
            </SectionHeading>
            <CodeBlock code={HANDLES} label="handles" />
          </section>
        </article>
      </div>
    </div>
  );
}
