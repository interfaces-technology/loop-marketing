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
    <div className="flex flex-col items-center gap-6">
      <p className="text-xs tracking-[0.1em] text-muted uppercase">device: {device}</p>
      <p className="max-w-xs text-center text-sm text-muted">
        Use arrow keys, WASD, or a gamepad d-pad
      </p>
      <div
        ref={arenaRef}
        className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-xl border border-border bg-panel"
      >
        <div
          ref={squareRef}
          className="absolute top-1/2 left-1/2 h-12 w-12 rounded-md bg-accent"
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>
    </div>
  );
}
