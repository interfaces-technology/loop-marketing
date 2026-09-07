import Link from "next/link";
import type { ReactNode } from "react";

export const primaryActionClass =
  "inline-flex min-h-10 items-center justify-center gap-2 border border-accent bg-accent px-4 py-2 font-mono text-xs font-semibold tracking-[0.08em] text-background uppercase transition-colors hover:bg-foreground hover:border-foreground";

export const secondaryActionClass =
  "inline-flex min-h-10 items-center justify-center gap-2 border border-border-strong bg-panel px-4 py-2 font-mono text-xs font-semibold tracking-[0.08em] text-foreground uppercase transition-colors hover:border-accent hover:text-accent";

export function Arrow() {
  return <span aria-hidden="true">-&gt;</span>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[0.68rem] font-medium tracking-[0.16em] text-accent uppercase">
      <span className="mr-2 text-subtle" aria-hidden="true">
        {"//"}
      </span>
      {children}
    </p>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-border pb-8 sm:pb-10">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="mt-5 max-w-3xl text-4xl font-medium tracking-[-0.04em] text-balance sm:text-5xl">
        {title}
      </h1>
      <div className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">{description}</div>
      {children ? <div className="mt-6">{children}</div> : null}
    </header>
  );
}

export function SectionHeading({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mb-5">
      <p className="font-mono text-[0.68rem] tracking-[0.14em] text-subtle uppercase">
        [{index}]
      </p>
      <h2 className="mt-2 text-2xl font-medium tracking-tight">{title}</h2>
      {children ? <div className="mt-3 max-w-2xl leading-7 text-muted">{children}</div> : null}
    </div>
  );
}

export function LocalNav({
  label = "On this page",
  items,
}: {
  label?: string;
  items: readonly { id: string; label: string }[];
}) {
  return (
    <nav aria-label={label} className="border border-border bg-panel p-4">
      <p className="font-mono text-[0.65rem] tracking-[0.14em] text-subtle uppercase">{label}</p>
      <ol className="mt-4 space-y-2">
        {items.map((item, index) => (
          <li key={item.id}>
            <Link
              href={`#${item.id}`}
              className="group flex items-center gap-3 font-mono text-xs text-muted hover:text-foreground"
            >
              <span className="text-subtle">{String(index + 1).padStart(2, "0")}</span>
              <span className="group-hover:text-accent">{item.label}</span>
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ExampleCard({
  href,
  title,
  blurb,
  index,
}: {
  href: string;
  title: string;
  blurb: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-52 flex-col justify-between overflow-hidden border border-border bg-panel p-5 transition-colors hover:border-accent sm:p-6"
    >
      <div
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform group-hover:scale-x-100"
        aria-hidden="true"
      />
      <p className="font-mono text-[0.65rem] tracking-[0.14em] text-subtle uppercase">
        example_{String(index + 1).padStart(2, "0")}
      </p>
      <div>
        <h3 className="text-xl font-medium tracking-tight group-hover:text-accent">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{blurb}</p>
        <p className="mt-5 font-mono text-xs text-foreground">
          Run example <Arrow />
        </p>
      </div>
    </Link>
  );
}

export function Breadcrumb({
  parent,
  parentHref,
  current,
}: {
  parent: string;
  parentHref: string;
  current: string;
}) {
  return (
    <p className="font-mono text-xs text-muted">
      <Link href={parentHref} className="hover:text-accent">
        {parent.toLowerCase()}
      </Link>
      <span className="mx-2 text-subtle">/</span>
      <span className="text-foreground">{current.toLowerCase()}</span>
    </p>
  );
}
