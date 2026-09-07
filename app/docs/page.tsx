import type { Metadata } from "next";
import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { Arrow, LocalNav, PageHeader, SectionHeading } from "@/components/ui";

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

const DOC_SECTIONS = [
  { id: "principles", label: "Principles" },
  { id: "wire", label: "The wire" },
  { id: "components", label: "Components" },
  { id: "runtime", label: "Runtime" },
] as const;

export default function DocsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Specification / v0.1"
        title="The wire, defined."
        description={
          <p>
          Loop only owns the wire. Never renders, never owns your framework, never looks
          inside your function. It samples sources, carries packets, and hands values to
          sinks or your own code.
          </p>
        }
      >
        <div className="flex flex-wrap gap-5 font-mono text-xs">
          <Link href="/docs/api" className="text-foreground hover:text-accent">
            Public API <Arrow />
          </Link>
          <Link href="/install#mcp" className="text-muted hover:text-accent">
            Use with AI assistants <Arrow />
          </Link>
        </div>
      </PageHeader>

      <div className="grid gap-10 pt-10 lg:grid-cols-[13rem_minmax(0,44rem)] lg:gap-14">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <LocalNav items={DOC_SECTIONS} />
        </aside>

        <article className="min-w-0 divide-y divide-border">
          <section id="principles" className="scroll-mt-24 pb-12">
            <SectionHeading index="01" title="Principles" />
            <ol className="grid gap-px bg-border sm:grid-cols-2">
              {[
                ["Everything is a component", "Source, transform, and sink share one primitive."],
                ["One contract on the wire", "Every packet is value, frame, or typed data."],
                ["Bind first", "Attach live software output handles to elements you own."],
                ["Same-device first", "v0.1 runs in one browser tab and stays offline."],
              ].map(([title, detail], index) => (
                <li key={title} className="bg-panel p-5">
                  <span className="font-mono text-[0.65rem] text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-6 font-medium text-foreground">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="wire" className="scroll-mt-24 py-12">
            <SectionHeading index="02" title="The wire">
              Every component communicates through the same discriminated packet shape.
            </SectionHeading>
            <CodeBlock code={PACKET} label="packet.ts" />
            <div className="mt-6 overflow-x-auto border border-border">
              <table className="w-full min-w-[36rem] text-left text-sm">
                <thead className="bg-panel-raised font-mono text-[0.65rem] tracking-[0.1em] text-subtle uppercase">
                  <tr>
                    <th className="border-r border-border p-3 font-medium">Kind</th>
                    <th className="border-r border-border p-3 font-medium">Carries</th>
                    <th className="p-3 font-medium">Normalization</th>
                  </tr>
                </thead>
                <tbody className="text-muted">
                  {[
                    ["value", "scalar or vector", "scalars 0–1; bipolar axes −1–1"],
                    ["frame", "pixel buffer", "resolution-independent"],
                    ["data", "text, events, JSON", "tagged by type"],
                  ].map(([kind, carries, normalization]) => (
                    <tr key={kind} className="border-t border-border">
                      <td className="border-r border-border p-3 font-mono text-accent">{kind}</td>
                      <td className="border-r border-border p-3">{carries}</td>
                      <td className="p-3">{normalization}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="components" className="scroll-mt-24 py-12">
            <SectionHeading index="03" title="Components">
              A source reads, a transform processes, and a sink renders. Pipe validates each
              adjacent pair at wiring time.
            </SectionHeading>
            <CodeBlock code={COMPONENTS} label="component surface" />
            <p className="mt-5 border-l border-accent pl-4 text-sm leading-6 text-muted">
              <code className="font-mono text-foreground">emits(N)</code> must be accepted by{" "}
              <code className="font-mono text-foreground">accepts(N+1)</code>.
            </p>
          </section>

          <section id="runtime" className="scroll-mt-24 pt-12">
            <SectionHeading index="04" title="Runtime" />
            <p className="leading-7 text-muted">
              One <code className="font-mono text-foreground">requestAnimationFrame</code> tick
              samples sources, flows transforms, and delivers to sinks and bound handles. Pull is
              the default for render loops; push via{" "}
              <code className="font-mono text-foreground">on(&quot;change&quot;)</code> handles
              discrete events.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
