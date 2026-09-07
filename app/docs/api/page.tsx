import type { Metadata } from "next";

import { CodeBlock } from "@/components/code-block";

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

export default function ApiPage() {
  return (
    <article className="flex max-w-2xl flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-medium tracking-tight">API</h1>
        <p className="leading-7 text-muted">
          v0.1 surface. <code className="font-mono text-foreground">layout</code>,{" "}
          <code className="font-mono text-foreground">filter</code>, and{" "}
          <code className="font-mono text-foreground">capture</code> are stubs until slice 4+.
        </p>
        <CodeBlock code={SURFACE} />
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">source / transform / sink</h2>
        <p className="leading-7 text-muted">
          Register a stage. <code className="font-mono text-foreground">component()</code> dispatches
          on whether the def has <code className="font-mono text-foreground">read</code>,{" "}
          <code className="font-mono text-foreground">process</code>, or{" "}
          <code className="font-mono text-foreground">render</code>.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">pipe</h2>
        <p className="leading-7 text-muted">
          Type-checks adjacent stages, then returns a pipeline with{" "}
          <code className="font-mono text-foreground">start()</code> /{" "}
          <code className="font-mono text-foreground">stop()</code>.
        </p>
        <CodeBlock code={PIPE} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">input / tick</h2>
        <p className="leading-7 text-muted">
          Built-in inputs: <code className="font-mono text-foreground">keyboard</code>,{" "}
          <code className="font-mono text-foreground">dpad</code>,{" "}
          <code className="font-mono text-foreground">sliders</code>. Bind the handle to your own
          element. Hardware sinks come later.
        </p>
        <CodeBlock code={HANDLES} />
      </section>
    </article>
  );
}
