import type { Metadata } from "next";

import { DemoPage } from "@/components/demo-page";
import { LiveTextDemo } from "@/components/live-text-demo";

export const metadata: Metadata = {
  title: "Live text",
  description: "Keyboard text → live mirror on Loop’s data path.",
};

export default function LiveTextPage() {
  return (
    <DemoPage
      title="Live text"
      signal="keyboard → data.text → mirror"
      description={
        <p>
          Keyboard → uppercase transform → sink. The mirror updates on every keystroke.
        </p>
      }
    >
      <LiveTextDemo />
    </DemoPage>
  );
}
