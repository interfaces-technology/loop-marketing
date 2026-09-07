import Link from "next/link";
import type { ReactNode } from "react";

import { SiteNav } from "@/components/site-nav";
import { LIBRARY_REPO, NPM_PACKAGE } from "@/lib/site";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-background/92 backdrop-blur-xl">
        <div className="relative mx-auto flex w-full max-w-7xl items-stretch justify-between border-x border-border">
          <Link href="/" className="group flex items-center gap-3 px-4 sm:px-5">
            <span
              className="relative flex h-6 w-6 items-center justify-center border border-border-strong bg-panel font-mono text-xs text-accent group-hover:border-accent"
              aria-hidden="true"
            >
              L
              <span className="absolute -right-1 h-1.5 w-1.5 bg-accent" />
            </span>
            <span className="font-mono text-xs font-semibold tracking-[0.16em] uppercase">Loop</span>
            <span className="hidden font-mono text-[0.62rem] text-subtle sm:inline">v0.1</span>
          </Link>
          <SiteNav />
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 border-x border-border px-4 py-10 sm:px-6 sm:py-16 lg:px-10">
        {children}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-7xl flex-col border-x border-border font-mono text-[0.65rem] tracking-[0.08em] text-muted uppercase sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-4 sm:px-6">
            <span className="flex items-center gap-2 text-signal">
              <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
              Runtime ready
            </span>
            <span>MIT license</span>
            <span className="text-subtle">{NPM_PACKAGE}</span>
          </div>
          <a
            href={LIBRARY_REPO}
            className="border-t border-border px-4 py-4 text-foreground hover:text-accent sm:border-t-0 sm:border-l sm:px-6"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
