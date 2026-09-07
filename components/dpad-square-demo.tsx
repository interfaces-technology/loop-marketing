"use client";

import loop from "@theinterfaces-lab/loop";
import { useEffect, useRef, useState } from "react";

function asVec(value: unknown): { x: number; y: number } {
  if (typeof value === "object" && value !== null && "x" in value && "y" in value) {
    const candidate = value as { x: unknown; y: unknown };
    if (typeof candidate.x === "number" && typeof candidate.y === "number") {
      return { x: candidate.x, y: candidate.y };
    }
  }
  return { x: 0, y: 0 };
}

export function DpadSquareDemo() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);
  const [device, setDevice] = useState("none");

  useEffect(() => {
    const dpad = loop.input("dpad");
    let posX = 0;
    let posY = 0;
    const speed = 4;
    const half = 24;

    const stop = loop.tick(() => {
      const { x, y } = asVec(dpad.value);
      posX += x * speed;
      posY += y * speed;

      const arena = arenaRef.current;
      const square = squareRef.current;
      if (!arena || !square) return;

      const rect = arena.getBoundingClientRect();
      const maxX = rect.width / 2 - half;
      const maxY = rect.height / 2 - half;
      posX = Math.max(-maxX, Math.min(maxX, posX));
      posY = Math.max(-maxY, Math.min(maxY, posY));

      square.style.transform = `translate(calc(-50% + ${posX}px), calc(-50% + ${posY}px))`;
      square.classList.toggle("bg-emerald-500", x !== 0 || y !== 0);
      square.classList.toggle("bg-accent", x === 0 && y === 0);
      setDevice(loop.getDpadActiveDevice());
    });

    return stop;
  }, []);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[0.65rem] tracking-[0.1em] uppercase">
        <span className="text-muted">Use arrow keys, WASD, or a gamepad d-pad</span>
        <span className="flex items-center gap-2 text-signal">
          <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
          device: {device}
        </span>
      </div>
      <div
        ref={arenaRef}
        tabIndex={0}
        aria-label="D-pad movement arena"
        className="relative aspect-[16/9] w-full overflow-hidden border border-border-strong bg-background outline-none focus:border-accent"
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
        <span className="absolute top-3 left-3 font-mono text-[0.62rem] text-subtle uppercase">
          x/y normalized
        </span>
        <div
          ref={squareRef}
          className="absolute top-1/2 left-1/2 h-10 w-10 border border-foreground/20 bg-accent shadow-[0_0_32px_color-mix(in_srgb,var(--accent)_45%,transparent)]"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>
    </div>
  );
}
