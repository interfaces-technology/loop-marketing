import type { Metadata } from "next";

import { DemoPage } from "@/components/demo-page";
import { SlidersCubeDemo } from "@/components/sliders-cube-demo";

export const metadata: Metadata = {
  title: "Sliders cube",
  description: "Sliders rotate a 3D cube — gamepad, MIDI, or on-screen.",
};

export default function SlidersCubePage() {
  return (
    <DemoPage
      title="Sliders cube"
      signal="sliders → value.scalar → webgl"
      description={
        <p>
          Scalar <code className="font-mono text-foreground">value</code> packets drive position and
          rotation. On-screen sliders are the fallback when no gamepad or MIDI is present.
        </p>
      }
    >
      <SlidersCubeDemo />
    </DemoPage>
  );
}
