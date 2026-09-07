import type { ReactNode } from "react";

import { Breadcrumb, Eyebrow } from "@/components/ui";

export function DemoPage({
  title,
  description,
  signal,
  children,
}: {
  title: string;
  description: ReactNode;
  signal: string;
  children: ReactNode;
}) {
  return (
    <div>
      <Breadcrumb parent="Examples" parentHref="/examples" current={title} />
      <header className="mt-8 grid gap-8 border-b border-border pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <Eyebrow>Live example</Eyebrow>
          <h1 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">{title}</h1>
          <div className="mt-4 max-w-2xl leading-7 text-muted">{description}</div>
        </div>
        <div className="w-fit border border-border bg-panel px-4 py-3 font-mono text-[0.65rem] tracking-[0.1em] uppercase">
          <p className="text-subtle">Signal path</p>
          <p className="mt-1 text-signal">{signal}</p>
        </div>
      </header>

      <section className="mt-10 overflow-hidden border border-border bg-panel">
        <div className="flex items-center justify-between border-b border-border bg-panel-raised px-4 py-3 font-mono text-[0.65rem] tracking-[0.1em] uppercase">
          <span className="text-muted">runtime.preview</span>
          <span className="flex items-center gap-2 text-signal">
            <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
            Active
          </span>
        </div>
        <div className="min-h-[28rem] p-6 sm:p-10">{children}</div>
      </section>
    </div>
  );
}
