"use client";

import loop from "@theinterfaces-lab/loop";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function asNumber(value: unknown): number {
  return typeof value === "number" ? value : 0;
}

export function SlidersCubeDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderXRef = useRef<HTMLInputElement>(null);
  const sliderYRef = useRef<HTMLInputElement>(null);
  const sliderRRef = useRef<HTMLInputElement>(null);
  const [device, setDevice] = useState("on-screen");
  const [vals, setVals] = useState({ x: 0.5, y: 0.5, r: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sliders = loop.getSlidersInput();

    const bindSlider = (
      el: HTMLInputElement | null,
      handle: { _setValue: (v: number) => void },
      key: "x" | "y" | "r",
    ) => {
      if (!el) return () => {};
      const onInput = () => {
        const v = Number(el.value) / 100;
        handle._setValue(v);
        loop.setSlidersActiveDevice("on-screen");
        setVals((prev) => ({ ...prev, [key]: v }));
      };
      el.addEventListener("input", onInput);
      return () => el.removeEventListener("input", onInput);
    };

    const unbindX = bindSlider(sliderXRef.current, sliders.x, "x");
    const unbindY = bindSlider(sliderYRef.current, sliders.y, "y");
    const unbindR = bindSlider(sliderRRef.current, sliders.rotation, "r");

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    container.appendChild(renderer.domElement);

    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial({ color: 0xe74c3c }),
    );
    scene.add(cube);

    const light = new THREE.DirectionalLight(0xffffff, 1.5);
    light.position.set(2, 3, 4);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const stop = loop.tick(() => {
      const x = asNumber(sliders.x.value);
      const y = asNumber(sliders.y.value);
      const rot = asNumber(sliders.rotation.value);

      cube.position.x = (x - 0.5) * 2;
      cube.position.y = (y - 0.5) * 2;
      cube.rotation.y = rot * Math.PI * 2;
      renderer.render(scene, camera);

      const active = loop.getSlidersActiveDevice();
      setDevice(active);

      if (active !== "on-screen") {
        if (sliderXRef.current) sliderXRef.current.value = String(Math.round(x * 100));
        if (sliderYRef.current) sliderYRef.current.value = String(Math.round(y * 100));
        if (sliderRRef.current) sliderRRef.current.value = String(Math.round(rot * 100));
        setVals({ x, y, r: rot });
      }
    });

    return () => {
      stop();
      unbindX();
      unbindY();
      unbindR();
      window.removeEventListener("resize", resize);
      renderer.dispose();
      cube.geometry.dispose();
      if (Array.isArray(cube.material)) {
        for (const mat of cube.material) mat.dispose();
      } else {
        cube.material.dispose();
      }
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-xs tracking-[0.1em] text-muted uppercase">device: {device}</p>
      <p className="max-w-sm text-center text-sm text-muted">
        Use on-screen sliders, a gamepad (sticks + RT), or MIDI CC knobs
      </p>
      <div
        ref={containerRef}
        className="h-[min(400px,60vh)] w-full max-w-[500px] overflow-hidden rounded-xl border border-border"
      />
      <div className="flex w-full max-w-xs flex-col gap-3 text-sm">
        <label className="flex items-center gap-3">
          <span className="w-[70px] text-muted">X</span>
          <input
            ref={sliderXRef}
            type="range"
            min={0}
            max={100}
            defaultValue={50}
            className="flex-1 accent-accent"
          />
          <span className="w-9 text-right font-mono text-muted tabular-nums">{vals.x.toFixed(2)}</span>
        </label>
        <label className="flex items-center gap-3">
          <span className="w-[70px] text-muted">Y</span>
          <input
            ref={sliderYRef}
            type="range"
            min={0}
            max={100}
            defaultValue={50}
            className="flex-1 accent-accent"
          />
          <span className="w-9 text-right font-mono text-muted tabular-nums">{vals.y.toFixed(2)}</span>
        </label>
        <label className="flex items-center gap-3">
          <span className="w-[70px] text-muted">Rotate</span>
          <input
            ref={sliderRRef}
            type="range"
            min={0}
            max={100}
            defaultValue={0}
            className="flex-1 accent-accent"
          />
          <span className="w-9 text-right font-mono text-muted tabular-nums">{vals.r.toFixed(2)}</span>
        </label>
      </div>
    </div>
  );
}
