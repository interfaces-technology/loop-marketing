import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";

export const metadata: Metadata = {
  title: "Docs",
  description: "Loop spec v0.1 — the wire, the packet, the component model.",
};

const PACKET = `type Vec = { x: number; y: number; z?: number };

type Packet =
  | { kind: "value"; value: number | Vec }
  | { kind: "frame"; frame: ImageData }
  | { kind: "data"; type: string; value: unknown };`;

const COMPONENTS = `loop.source(def)
loop.transform(def)
loop.sink(def)
loop.component(def)   // dispatches on read / process / render`;

export default function DocsPage() {
  return (
    <article className="flex max-w-2xl flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-medium tracking-tight">Docs</h1>
        <p className="leading-7 text-muted">
          Loop only owns the wire. Never renders, never owns your framework, never looks
          inside your function. It samples sources, carries packets, and hands values to
          sinks or your own code.
        </p>
        <p>
          <Link href="/docs/api" className="text-sm underline">
            Public API →
          </Link>
        </p>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Principles</h2>
        <ul className="list-disc space-y-2 pl-5 leading-7 text-muted">
          <li>Everything is a component. Source, transform, and sink are the same primitive.</li>
          <li>One contract on the wire: every packet is <code className="font-mono text-foreground">value</code>, <code className="font-mono text-foreground">frame</code>, or <code className="font-mono text-foreground">data</code>.</li>
          <li>Bind-first. Software outputs get a live handle you attach to your own element.</li>
          <li>Same-device first. v0.1 runs in one browser tab. Offline by default.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">The wire</h2>
        <CodeBlock code={PACKET} />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted">
                <th className="py-2 pr-4 font-medium">Kind</th>
                <th className="py-2 pr-4 font-medium">Carries</th>
                <th className="py-2 font-medium">Normalization</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono text-foreground">value</td>
                <td className="py-2 pr-4">scalar or vector</td>
                <td className="py-2">scalars 0–1; bipolar axes −1–1</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 pr-4 font-mono text-foreground">frame</td>
                <td className="py-2 pr-4">pixel buffer</td>
                <td className="py-2">resolution-independent</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono text-foreground">data</td>
                <td className="py-2 pr-4">text, events, JSON</td>
                <td className="py-2">tagged by type</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Components</h2>
        <p className="leading-7 text-muted">
          A source reads, a transform processes, a sink renders. Pipe checks adjacent pairs
          at wiring time: <code className="font-mono text-foreground">emits(N)</code> must be in{" "}
          <code className="font-mono text-foreground">accepts(N+1)</code>.
        </p>
        <CodeBlock code={COMPONENTS} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-medium">Runtime</h2>
        <p className="leading-7 text-muted">
          One <code className="font-mono text-foreground">requestAnimationFrame</code> tick: sample
          sources, flow transforms, deliver to sinks and bound handles. Pull is the default
          for render loops; push via <code className="font-mono text-foreground">on(&quot;change&quot;)</code>{" "}
          for discrete events.
        </p>
      </section>
    </article>
  );
}
