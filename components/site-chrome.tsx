import Link from "next/link";
import type { ReactNode } from "react";

import { LIBRARY_REPO, NAV } from "@/lib/site";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="font-medium tracking-tight">
            Loop
          </Link>
          <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm text-muted">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
            <a
              href={LIBRARY_REPO}
              className="hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:py-14">{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Loop is the wire. MIT · Interfaces Lab</p>
          <a href={LIBRARY_REPO} className="hover:text-foreground" target="_blank" rel="noreferrer">
            Library repo
          </a>
        </div>
      </footer>
    </div>
  );
}
