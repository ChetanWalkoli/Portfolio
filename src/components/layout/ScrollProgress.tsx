"use client";

import { useEffect, useRef } from "react";
import { useMotionPreference } from "@/context/MotionContext";
import styles from "./ScrollProgress.module.scss";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const { motionEnabled } = useMotionPreference();

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      el.style.transform = `scaleX(${Math.min(1, Math.max(0, p))})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [motionEnabled]);

  return (
    <div className={styles.track} aria-hidden>
      <div ref={barRef} className={styles.bar} />
    </div>
  );
}
