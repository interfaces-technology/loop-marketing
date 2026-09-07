"use client";

import { useState } from "react";

import { copyText } from "@/lib/clipboard";

export function CodeBlock({
  code,
  label = "terminal",
  prompt = false,
}: {
  code: string;
  label?: string;
  prompt?: boolean;
}) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    const copiedSuccessfully = await copyText(code);

    if (copiedSuccessfully) {
      setCopyState("copied");
    } else {
      setCopyState("failed");
    }

    window.setTimeout(() => setCopyState("idle"), 1600);
  }

  return (
    <div className="overflow-hidden border border-border bg-panel">
      <div className="flex min-h-10 items-center justify-between border-b border-border bg-panel-raised">
        <div className="flex items-center gap-3 px-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-1.5 w-1.5 bg-accent" />
            <span className="h-1.5 w-1.5 bg-border-strong" />
            <span className="h-1.5 w-1.5 bg-signal" />
          </span>
          <span className="font-mono text-[0.62rem] tracking-[0.12em] text-subtle uppercase">
            {label}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="self-stretch border-l border-border px-3 font-mono text-[0.62rem] tracking-[0.1em] text-muted uppercase hover:bg-accent-soft hover:text-accent"
        >
          {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-7 sm:p-5">
        <code className="font-mono text-[0.82rem] text-foreground">
          {prompt ? <span className="mr-3 select-none text-accent">$</span> : null}
          {code}
        </code>
      </pre>
      <p className="sr-only" role="status" aria-live="polite">
        {copyState === "copied"
          ? "Code copied to clipboard"
          : copyState === "failed"
            ? "Clipboard access is unavailable"
            : ""}
      </p>
    </div>
  );
}
