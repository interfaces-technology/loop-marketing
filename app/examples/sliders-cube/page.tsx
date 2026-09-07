import type { Metadata } from "next";
import Link from "next/link";

import { SlidersCubeDemo } from "@/components/sliders-cube-demo";

export const metadata: Metadata = {
  title: "Sliders cube",
  description: "Sliders rotate a 3D cube — gamepad, MIDI, or on-screen.",
};

export default function SlidersCubePage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">
          <Link href="/examples" className="hover:text-foreground">
            Examples
          </Link>
          <span> / Sliders cube</span>
        </p>
        <h1 className="text-3xl font-medium tracking-tight">Sliders cube</h1>
        <p className="max-w-xl leading-7 text-muted">
          Scalar <code className="font-mono text-foreground">value</code> packets drive position and
          rotation. On-screen sliders are the fallback when no gamepad or MIDI is present.
        </p>
      </div>
      <SlidersCubeDemo />
    </div>
  );
}
