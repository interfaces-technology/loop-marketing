"use client";

import loop from "@theinterfaces-lab/loop";
import { useEffect, useState } from "react";

const EMPTY = "mirrored output appears here (uppercase via pipe)";

export function LiveTextDemo() {
  const [mirror, setMirror] = useState("");

  useEffect(() => {
    const keyboard = loop.input("keyboard");

    const unsub = keyboard.on("change", (text) => {
      const value = typeof text === "string" ? text : "";
      setMirror(value.toUpperCase());
    });

    const src = loop.source({
      from: "keyboard",
      emits: "data",
      dataType: "text",
      read: () => ({
        kind: "data" as const,
        type: "text",
        value: typeof keyboard.value === "string" ? keyboard.value : "",
      }),
    });

    const upper = loop.transform({
      accepts: "data",
      emits: "data",
      dataType: "text",
      process: (packet) => {
        if (packet.kind !== "data") return packet;
        return { kind: "data", type: "text", value: String(packet.value).toUpperCase() };
      },
    });

    const snk = loop.sink({
      to: "mirror",
      accepts: "data",
      dataType: "text",
      render: () => {
        /* mirror updated via on("change") */
      },
    });

    const pipeline = loop.pipe(src, upper, snk);
    pipeline.start();

    return () => {
      unsub();
      pipeline.stop();
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-xs tracking-[0.1em] text-muted uppercase">device: keyboard</p>
      <textarea
        className="h-[120px] w-full max-w-lg resize-y rounded-lg border border-[#333] bg-[#1a1a1a] p-4 text-base text-foreground outline-none focus:border-[#555] focus:outline-2 focus:outline-[#555]"
        placeholder="Type here…"
        autoFocus
        rows={4}
      />
      <div
        className={`min-h-[80px] w-full max-w-lg rounded-lg border border-border bg-panel p-4 text-xl leading-relaxed break-words ${mirror ? "" : "text-muted italic"}`}
      >
        {mirror || EMPTY}
      </div>
    </div>
  );
}
