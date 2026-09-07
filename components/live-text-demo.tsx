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
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <div className="flex items-center justify-between font-mono text-[0.65rem] tracking-[0.1em] uppercase">
        <span className="text-subtle">Input channel</span>
        <span className="flex items-center gap-2 text-signal">
          <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
          keyboard
        </span>
      </div>
      <div className="grid gap-px bg-border md:grid-cols-2">
        <label className="bg-background p-4">
          <span className="font-mono text-[0.65rem] tracking-[0.1em] text-accent uppercase">
            source / raw
          </span>
          <textarea
            className="mt-3 h-48 w-full resize-none border-0 bg-transparent text-base leading-7 text-foreground outline-none placeholder:text-subtle"
            placeholder="Type a signal…"
            autoFocus
            rows={6}
          />
        </label>
        <div className="bg-background p-4">
          <p className="font-mono text-[0.65rem] tracking-[0.1em] text-signal uppercase">
            sink / uppercase
          </p>
          <div
            className={`mt-3 min-h-48 text-xl leading-8 break-words ${mirror ? "text-foreground" : "text-muted italic"}`}
          >
            {mirror || EMPTY}
          </div>
        </div>
      </div>
    </div>
  );
}
