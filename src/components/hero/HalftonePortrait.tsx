"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionPreference } from "@/context/MotionContext";
import styles from "./HalftonePortrait.module.scss";

const CUTOUT = "/portraits/cutout.png";
const FALLBACK = "/portraits/halftone-fallback.png";

type Dot = {
  x: number;
  y: number;
  r: number;
  a: number;
  isRim: boolean;
};

export function HalftonePortrait() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const { motionEnabled } = useMotionPreference();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap || !motionEnabled) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let running = true;
    let frameId = 0;
    let dots: Dot[] = [];

    const targetPointer = { x: 0.5, y: 0.5 };
    const currentPointer = { x: 0.5, y: 0.5 };

    const img = new Image();
    img.src = CUTOUT;

    const computeDots = () => {
      const rect = wrap.getBoundingClientRect();
      const targetW = rect.width || 360;
      const targetH = rect.height || 430;
      const scale = Math.min(targetW / img.width, targetH / img.height);
      const w = Math.max(200, Math.round(img.width * scale));
      const h = Math.max(240, Math.round(img.height * scale));
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const off = document.createElement("canvas");
      off.width = w;
      off.height = h;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0, w, h);
      const data = octx.getImageData(0, 0, w, h).data;

      const cell = 6;
      const newDots: Dot[] = [];

      for (let y = 0; y < h; y += cell) {
        for (let x = 0; x < w; x += cell) {
          const i = (y * w + x) * 4;
          const alpha = data[i + 3] / 255;
          if (alpha < 0.12) continue;

          const rVal = data[i];
          const gVal = data[i + 1];
          const bVal = data[i + 2];
          const lum = (rVal * 0.299 + gVal * 0.587 + bVal * 0.114) / 255;

          // Fade out smoothly towards the bottom base
          const bottomFade = Math.max(0, 1 - Math.pow(y / h, 2.2));
          const dotAlpha = alpha * bottomFade * (0.32 + lum * 0.72);
          if (dotAlpha < 0.04) continue;

          // Check if pixel is on the outer contour / rim (edge or high warmth)
          const distFromCenter = Math.abs(x - w / 2) / (w / 2);
          const isRim = (distFromCenter > 0.55 && lum > 0.25) || (rVal > gVal + 20 && rVal > 80);

          newDots.push({
            x,
            y,
            r: Math.max(0.45, lum * (cell * 0.52)),
            a: dotAlpha,
            isRim,
          });
        }
      }

      dots = newDots;
      setLoaded(true);
    };

    img.onload = computeDots;
    if (img.complete) computeDots();

    const draw = () => {
      if (!running) return;
      frameId = window.requestAnimationFrame(draw);

      // Smooth lerp pointer
      currentPointer.x += (targetPointer.x - currentPointer.x) * 0.06;
      currentPointer.y += (targetPointer.y - currentPointer.y) * 0.06;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      const offsetX = (currentPointer.x - 0.5) * 14;
      const offsetY = (currentPointer.y - 0.5) * 10;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        // Subtle depth shift: points higher up move slightly less, lower moves slightly more
        const depthFactor = 0.7 + (d.y / h) * 0.6;
        const dx = d.x + offsetX * depthFactor;
        const dy = d.y + offsetY * depthFactor;

        ctx.globalAlpha = d.a;
        ctx.fillStyle = d.isRim ? "#e8875a" : "#f2efe8";
        ctx.beginPath();
        ctx.arc(dx, dy, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    frameId = window.requestAnimationFrame(draw);

    const onPointerMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      targetPointer.x = Math.max(0, Math.min(1, px));
      targetPointer.y = Math.max(0, Math.min(1, py));
    };

    const onResize = () => {
      computeDots();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      running = false;
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
    };
  }, [motionEnabled]);

  return (
    <div ref={wrapRef} className={styles.wrap}>
      {/* Fallback image is shown immediately, seamlessly covered when canvas is ready */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={FALLBACK}
        alt="Editorial halftone portrait of Chetan Walkoli"
        className={`${styles.fallback} ${loaded && motionEnabled ? styles.hidden : ""}`}
        width={720}
        height={860}
        loading="eager"
      />
      {motionEnabled ? (
        <canvas
          ref={canvasRef}
          className={`${styles.canvas} ${loaded ? styles.visible : ""}`}
          aria-hidden
        />
      ) : null}
    </div>
  );
}
