"use client";

import { useMotionPreference } from "@/context/MotionContext";
import styles from "./MotionToggle.module.scss";

export function MotionToggle() {
  const { motionEnabled, setMotionEnabled, ready } = useMotionPreference();

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={() => setMotionEnabled(!motionEnabled)}
      aria-pressed={motionEnabled}
      aria-label={motionEnabled ? "Disable motion" : "Enable motion"}
    >
      <span aria-hidden className={styles.dots}>
        ||
      </span>
      {ready ? (motionEnabled ? "Motion on" : "Motion off") : "Motion on"}
    </button>
  );
}
