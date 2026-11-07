"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/data/site";
import { timeline } from "@/data/timeline";
import { useMotionPreference } from "@/context/MotionContext";
import styles from "./Journey.module.scss";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Journey() {
  const root = useRef<HTMLElement>(null);
  const { motionEnabled, ready } = useMotionPreference();

  useGSAP(
    () => {
      if (!ready || !motionEnabled) return;
      const sectionEl = root.current;
      if (!sectionEl) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const headingLines = sectionEl.querySelectorAll<HTMLElement>(
        "[data-journey-heading-line]",
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

      gsap.fromTo(
        `.${styles.fill}`,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 75%",
            end: "bottom 75%",
            scrub: true,
          },
        },
      );

      const items = sectionEl.querySelectorAll<HTMLElement>("[data-journey-item]");
      items.forEach((itemEl) => {
        const dotEl = itemEl.querySelector<HTMLElement>("[data-journey-dot]");
        const contentEl = itemEl.querySelector<HTMLElement>(
          "[data-journey-content]",
        );

        if (contentEl) {
          gsap.fromTo(
            contentEl,
            { x: 10, opacity: 0.72 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: itemEl,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (dotEl) {
          gsap.fromTo(
            dotEl,
            {
              backgroundColor: "#050505",
              boxShadow: "0 0 0 0px rgba(232, 135, 90, 0)",
              scale: 1,
            },
            {
              backgroundColor: "#e8875a",
              boxShadow: "0 0 0 4px rgba(232, 135, 90, 0.22)",
              scale: 1.12,
              duration: 0.35,
              ease: "power2.out",
              scrollTrigger: {
                trigger: itemEl,
                start: "top 86%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    },
    { scope: root, dependencies: [motionEnabled, ready] },
  );

  return (
    <section id="about" ref={root} className={`section ${styles.section}`}>
      <h2 className="serif">
        <span className={styles.lineMask}>
          <span className={styles.lineInner} data-journey-heading-line>
            {site.journeyHeadline}
          </span>
        </span>
        <span className={styles.lineMask}>
          <em className={styles.lineInner} data-journey-heading-line>
            {site.journeyItalic}
          </em>
        </span>
      </h2>
      <ol className={styles.line}>
        <span className={styles.track} aria-hidden />
        <span className={styles.fill} aria-hidden />
        {timeline.map((item) => (
          <li key={item.year} data-journey-item>
            <span className={styles.dot} data-journey-dot aria-hidden />
            <div className={styles.itemContent} data-journey-content>
              <p className="micro">{item.year}</p>
              <h3 className="serif">{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
