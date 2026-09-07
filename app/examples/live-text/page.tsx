import type { Metadata } from "next";
import Link from "next/link";

import { LiveTextDemo } from "@/components/live-text-demo";

export const metadata: Metadata = {
  title: "Live text",
  description: "Keyboard text → live mirror on Loop’s data path.",
};

export default function LiveTextPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">
          <Link href="/examples" className="hover:text-foreground">
            Examples
          </Link>
          <span> / Live text</span>
        </p>
        <h1 className="text-3xl font-medium tracking-tight">Live text</h1>
        <p className="max-w-xl leading-7 text-muted">
          Keyboard → uppercase transform → sink. The mirror updates on every keystroke.
        </p>
      </div>
      <LiveTextDemo />
    </div>
  );
}
