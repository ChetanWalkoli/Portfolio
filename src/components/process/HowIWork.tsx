"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { disciplines } from "@/data/disciplines";
import { site } from "@/data/site";
import { useMotionPreference } from "@/context/MotionContext";
import styles from "./HowIWork.module.scss";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function HowIWork() {
  const [open, setOpen] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isManualLockRef = useRef(false);
  const lockTimerRef = useRef<number | null>(null);
  const { motionEnabled, ready } = useMotionPreference();

  const handleSelect = (index: number) => {
    isManualLockRef.current = true;
    if (lockTimerRef.current !== null) {
      window.clearTimeout(lockTimerRef.current);
    }
    lockTimerRef.current = window.setTimeout(() => {
      isManualLockRef.current = false;
    }, 1800);
    setOpen(index);
  };

  useGSAP(
    () => {
      if (!ready || !motionEnabled) return;
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const headingLines = sectionEl.querySelectorAll<HTMLElement>(
        "[data-process-heading-line]",
      );
      if (headingLines.length > 0) {
        gsap.fromTo(
          headingLines,
          { yPercent: 108, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const items = sectionEl.querySelectorAll<HTMLElement>("[data-process-item]");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Scroll-driven auto-stepper across the 4 disciplines
      const total = disciplines.length;
      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top 45%",
        end: "bottom 55%",
        onUpdate: (self) => {
          if (isManualLockRef.current) return;
          const nextIdx = Math.min(
            total - 1,
            Math.max(0, Math.floor(self.progress * total)),
          );
          setOpen((prev) => (prev === nextIdx ? prev : nextIdx));
        },
      });
    },
    { scope: sectionRef, dependencies: [motionEnabled, ready] },
  );

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`section ${styles.section}`}
    >
      <div className={styles.left}>
        <h2 className="serif">
          <span className={styles.lineMask}>
            <span className={styles.lineInner} data-process-heading-line>
              {site.processHeadline}
            </span>
          </span>
          <span className={styles.lineMask}>
            <em className={styles.lineInner} data-process-heading-line>
              {site.processItalic}
            </em>
          </span>
        </h2>
        <ol className={styles.stepper}>
          {disciplines.map((d, i) => (
            <li key={d.title} className={i === open ? styles.on : undefined}>
              <button type="button" onClick={() => handleSelect(i)}>
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
            <div key={d.title} className={styles.item} data-process-item>
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => handleSelect(i)}
              >
                <span className="micro">{d.label}</span>
                <strong className="serif">{d.title}</strong>
                <span className={styles.toggleIcon} aria-hidden="true">
                  {expanded ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {expanded ? (
                  <motion.div
                    initial={motionEnabled ? { height: 0, opacity: 0 } : false}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={
                      motionEnabled ? { height: 0, opacity: 0 } : undefined
                    }
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
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
