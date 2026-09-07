import Link from "next/link";

import { CodeBlock } from "@/components/code-block";
import { EXAMPLES } from "@/lib/site";

const INSTALL = `npm install @theinterfaces-lab/loop`;

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16">
      <section className="flex max-w-2xl flex-col gap-6">
        <p className="text-xs tracking-[0.14em] text-muted uppercase">@theinterfaces-lab/loop</p>
        <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">Loop is the wire.</h1>
        <p className="text-lg leading-8 text-muted">
          You author the two ends; Loop carries a normalized packet between them and never
          renders anything itself.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/examples"
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
          >
            Try examples
          </Link>
          <Link
            href="/docs"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-panel"
          >
            Read the spec
          </Link>
          <Link
            href="/install"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:bg-panel"
          >
            Install
          </Link>
        </div>
      </section>

      <CodeBlock code={INSTALL} />

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
