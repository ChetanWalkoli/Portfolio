"use client";

import { useEffect, useState } from "react";
import { useMotionPreference } from "@/context/MotionContext";
import { site } from "@/data/site";
import styles from "./Intro.module.scss";

const KEY = "chetan-intro-seen";

export function Intro() {
  const { motionEnabled, ready } = useMotionPreference();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!motionEnabled || sessionStorage.getItem(KEY) === "1") return;
    const rafId = window.requestAnimationFrame(() => {
      setVisible(true);
    });
    const done = window.setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setVisible(false);
    }, 1800);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(done);
    };
  }, [motionEnabled, ready]);

  if (!visible) return null;

  return (
    <div className={styles.intro} role="dialog" aria-label="Introduction">
      <p className="micro">{site.roleLine}</p>
      <button
        type="button"
        className={styles.skip}
        onClick={() => {
          sessionStorage.setItem(KEY, "1");
          setVisible(false);
        }}
      >
        Skip
      </button>
    </div>
  );
}
