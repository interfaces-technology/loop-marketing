"use client";

import { useState } from "react";

import { primaryActionClass, secondaryActionClass } from "@/components/ui";
import { copyText } from "@/lib/clipboard";
import { MCP_INSTALL_LINKS } from "@/lib/site";

export function McpInstallButtons() {
  const [feedback, setFeedback] = useState<{ id: string; copied: boolean } | null>(null);

  async function copyCommand(id: string, text: string) {
    const copiedSuccessfully = await copyText(text);

    setFeedback({ id, copied: copiedSuccessfully });
    window.setTimeout(() => setFeedback(null), 1600);
  }

  return (
    <div className="flex flex-wrap gap-3">
      {MCP_INSTALL_LINKS.map((link) => {
        if (link.kind === "deeplink") {
          return (
            <a
              key={link.id}
              href={link.href}
              className={"primary" in link && link.primary ? primaryActionClass : secondaryActionClass}
            >
              <span aria-hidden="true">+</span>
              {link.label}
            </a>
          );
        }

        return (
          <button
            key={link.id}
            type="button"
            onClick={() => copyCommand(link.id, link.copyText)}
            className={secondaryActionClass}
          >
            <span aria-hidden="true">
              {feedback?.id === link.id && feedback.copied ? "✓" : "+"}
            </span>
            {feedback?.id === link.id
              ? feedback.copied
                ? "Copied"
                : "Copy failed"
              : link.label}
          </button>
        );
      })}
      <p className="sr-only" role="status" aria-live="polite">
        {feedback
          ? feedback.copied
            ? "Command copied to clipboard"
            : "Clipboard access is unavailable"
          : ""}
      </p>
    </div>
  );
}
