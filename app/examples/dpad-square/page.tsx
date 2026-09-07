import type { Metadata } from "next";

import { DemoPage } from "@/components/demo-page";
import { DpadSquareDemo } from "@/components/dpad-square-demo";

export const metadata: Metadata = {
  title: "D-pad square",
  description: "A D-pad moves a square — keyboard or gamepad.",
};

export default function DpadSquarePage() {
  return (
    <DemoPage
      title="D-pad square"
      signal="dpad → value.vec → transform"
      description={
        <p>
          A <code className="font-mono text-foreground">value</code> Vec from the D-pad. Click the
          page first so arrow keys and WASD reach the demo.
        </p>
      }
    >
      <DpadSquareDemo />
    </DemoPage>
  );
}
