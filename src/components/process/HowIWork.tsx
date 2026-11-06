"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { disciplines } from "@/data/disciplines";
import { site } from "@/data/site";
import { useMotionPreference } from "@/context/MotionContext";
import styles from "./HowIWork.module.scss";

export function HowIWork() {
  const [open, setOpen] = useState(0);
  const { motionEnabled } = useMotionPreference();

  return (
    <section id="services" className={`section ${styles.section}`}>
      <div className={styles.left}>
        <h2 className="serif">
          {site.processHeadline}
          <br />
          <em>{site.processItalic}</em>
        </h2>
        <ol className={styles.stepper}>
          {disciplines.map((d, i) => (
            <li key={d.title} className={i === open ? styles.on : undefined}>
              <button type="button" onClick={() => setOpen(i)}>
                <span>{d.index}</span>
                {d.title}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.right}>
        {disciplines.map((d, i) => {
          const expanded = open === i;
          return (
            <div key={d.title} className={styles.item}>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => setOpen(i)}
              >
                <span className="micro">{d.label}</span>
                <strong className="serif">{d.title}</strong>
                <span aria-hidden="true">{expanded ? "−" : "+"}</span>
              </button>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    initial={motionEnabled ? { height: 0, opacity: 0 } : false}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={
                      motionEnabled ? { height: 0, opacity: 0 } : undefined
                    }
                    className={styles.body}
                  >
                    <p>{d.text}</p>
                    <ul className={styles.capList}>
                      {d.capabilities.map((cap) => (
                        <li key={cap}>
                          <span className={styles.capDot} aria-hidden="true" />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="micro">{d.tags.join("  ·  ")}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
