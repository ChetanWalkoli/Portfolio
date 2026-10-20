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
  const { motionEnabled } = useMotionPreference();

  useGSAP(
    () => {
      if (!motionEnabled) return;
      gsap.fromTo(
        `.${styles.fill}`,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 70%",
            end: "bottom 40%",
            scrub: true,
          },
        },
      );
    },
    { scope: root, dependencies: [motionEnabled] },
  );

  return (
    <section id="about" ref={root} className={`section ${styles.section}`}>
      <h2 className="serif">
        {site.journeyHeadline}
        <br />
        <em>{site.journeyItalic}</em>
      </h2>
      <ol className={styles.line}>
        <span className={styles.track} aria-hidden />
        <span className={styles.fill} aria-hidden />
        {timeline.map((item) => (
          <li key={item.year}>
            <span className={styles.dot} aria-hidden />
            <p className="micro">{item.year}</p>
            <h3 className="serif">{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
