import type { Metadata } from "next";
import Link from "next/link";

import { DpadSquareDemo } from "@/components/dpad-square-demo";

export const metadata: Metadata = {
  title: "D-pad square",
  description: "A D-pad moves a square — keyboard or gamepad.",
};

export default function DpadSquarePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">
          <Link href="/examples" className="hover:text-foreground">
            Examples
          </Link>
          <span> / D-pad square</span>
        </p>
        <h1 className="text-3xl font-medium tracking-tight">D-pad square</h1>
        <p className="max-w-xl leading-7 text-muted">
          A <code className="font-mono text-foreground">value</code> Vec from the D-pad. Click the
          page first so arrow keys and WASD reach the demo.
        </p>
      </div>
      <DpadSquareDemo />
    </div>
  );
}
