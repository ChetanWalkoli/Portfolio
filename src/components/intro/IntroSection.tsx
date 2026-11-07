"use client";

import { useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/data/site";
import { useMotionPreference } from "@/context/MotionContext";
import styles from "./IntroSection.module.scss";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type WordToken = {
  raw: string;
  highlighted: boolean;
};

function tokenizeParagraph(
  paragraph: string,
  highlightedTerms: readonly string[],
): WordToken[] {
  const rawWords = paragraph.trim().split(/\s+/);
  const normalizedSingles = new Set<string>();
  const multiWordParts = new Set<string>();

  for (const term of highlightedTerms) {
    const parts = term.toLowerCase().split(/\s+/);
    if (parts.length === 1) {
      normalizedSingles.add(parts[0]);
    } else {
      for (const p of parts) {
        multiWordParts.add(p);
      }
    }
  }

  return rawWords.map((raw) => {
    const clean = raw.replace(/[.,;:!?]+$/g, "").toLowerCase();
    const isHighlighted =
      normalizedSingles.has(clean) || multiWordParts.has(clean);
    return {
      raw,
      highlighted: isHighlighted,
    };
  });
}

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const { motionEnabled, ready } = useMotionPreference();

  const tokens = useMemo(
    () => tokenizeParagraph(site.aboutParagraph, site.highlightedTerms),
    [],
  );

  useGSAP(
    () => {
      if (!ready || !motionEnabled) return;
      const sectionEl = sectionRef.current;
      const headingEl = headingRef.current;
      const cardEl = cardRef.current;
      if (!sectionEl || !cardEl) return;

      if (headingEl) {
        gsap.fromTo(
          headingEl,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const wordEls = cardEl.querySelectorAll<HTMLElement>("[data-intro-word]");
      if (wordEls.length > 0) {
        gsap.fromTo(
          wordEls,
          { opacity: 0.25 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.035,
            scrollTrigger: {
              trigger: cardEl,
              start: "top 88%",
              end: "top 45%",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: sectionRef, dependencies: [motionEnabled, ready] },
  );

  return (
    <section
      id="intro"
      ref={sectionRef}
      className={`section ${styles.section}`}
      aria-labelledby="intro-heading"
    >
      <div className={styles.container}>
        <h2 id="intro-heading" ref={headingRef} className={styles.introHeading}>
          INTRO
        </h2>

        <div ref={cardRef} className={styles.card}>
          <aside className={styles.portraitCol} aria-label="Portrait and education">
            <div className={styles.portraitFrame}>
              <picture>
                <source srcSet="/portraits/chetan-halftone.webp" type="image/webp" />
                <img
                  src="/portraits/chetan-halftone.png"
                  alt="Chetan Walkoli"
                  className={styles.portraitImg}
                  width={1200}
                  height={1416}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <div className={styles.eduMeta}>
              <p className={styles.eduDegree}>{site.degree}</p>
              <p className="micro">{site.college}</p>
            </div>
          </aside>

          <div className={styles.contentCol}>
            <h3 className={styles.greeting}>{site.aboutGreeting}</h3>

            <p className={styles.narrative}>
              {tokens.map((token, idx) => (
                <span key={`${token.raw}-${idx}`}>
                  <span
                    data-intro-word
                    className={
                      token.highlighted
                        ? `${styles.word} ${styles.wordHighlight}`
                        : styles.word
                    }
                  >
                    {token.raw}
                  </span>
                  {idx < tokens.length - 1 ? " " : ""}
                </span>
              ))}
            </p>

            <div className={styles.footer}>
              <div className={styles.locationRow}>
                <span className={styles.statusDot} aria-hidden="true" />
                <span className="micro">{site.locationFull}</span>
              </div>

              <ul className={styles.courseworkList} aria-label="Core coursework">
                {site.coursework.map((course) => (
                  <li key={course} className={styles.courseTag}>
                    {course}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
