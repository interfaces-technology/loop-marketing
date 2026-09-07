"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { NAV } from "@/lib/site";

function isCurrent(pathname: string, href: string) {
  if (href === "/examples") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return pathname === href;
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav aria-label="Primary navigation" className="hidden items-center md:flex">
        {NAV.map((item) => {
          const current = isCurrent(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={current ? "page" : undefined}
              className={`border-l border-border px-4 py-4 font-mono text-[0.68rem] tracking-[0.1em] uppercase transition-colors last:border-r ${
                current
                  ? "bg-panel-raised text-accent"
                  : "text-muted hover:bg-panel hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
        className="border-l border-border px-4 py-4 font-mono text-[0.68rem] tracking-[0.1em] text-foreground uppercase md:hidden"
      >
        {open ? "Close" : "Menu"}
      </button>

      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full grid border-y border-border bg-background md:hidden"
        >
          {NAV.map((item) => {
            const current = isCurrent(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`border-b border-border px-4 py-4 font-mono text-xs tracking-[0.12em] uppercase last:border-b-0 ${
                  current ? "bg-panel text-accent" : "text-muted"
                }`}
              >
                <span className="mr-3 text-subtle" aria-hidden="true">
                  /
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </>
  );
}
