"use client";

import dynamic from "next/dynamic";
import { Suspense, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { skillCategories, skills } from "@/data/skills";
import { useMotionPreference } from "@/context/MotionContext";
import styles from "./Skills.module.scss";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const SkillsScene = dynamic(() => import("./SkillsScene"), {
  ssr: false,
  loading: () => <div className={styles.fallback} />,
});

const SCRAMBLE_CHARS = "01/#%&*$@+=<>";

function scrambleElementText(
  el: HTMLElement,
  finalText: string,
  durationMs = 460,
) {
  let frame = 0;
  const totalFrames = Math.max(12, Math.round(durationMs / 28));
  const timer = window.setInterval(() => {
    frame += 1;
    const progress = frame / totalFrames;
    const revealCount = Math.floor(progress * finalText.length);
    let next = "";
    for (let i = 0; i < finalText.length; i++) {
      const ch = finalText[i];
      if (ch === " " || i < revealCount) {
        next += ch;
      } else {
        next += SCRAMBLE_CHARS[(i + frame) % SCRAMBLE_CHARS.length];
      }
    }
    el.textContent = next;
    if (frame >= totalFrames) {
      el.textContent = finalText;
      window.clearInterval(timer);
    }
  }, 28);
  return () => window.clearInterval(timer);
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const { motionEnabled, ready } = useMotionPreference();

  const mid = Math.ceil(skills.length / 2);
  const row1 = [
    ...skills.slice(0, mid),
    ...skills.slice(0, mid),
    ...skills.slice(0, mid),
  ];
  const row2 = [
    ...skills.slice(mid),
    ...skills.slice(mid),
    ...skills.slice(mid),
  ];

  const handleGridPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const gridEl = gridRef.current;
    if (!gridEl) return;
    const cards = gridEl.querySelectorAll<HTMLElement>("[data-skill-card]");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
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

      let cleanupScramble: (() => void) | undefined;

      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top 85%",
        once: true,
        onEnter: () => {
          if (labelRef.current) {
            cleanupScramble = scrambleElementText(
              labelRef.current,
              "03 / Core Competencies",
              460,
            );
          }
        },
      });

      const headingEl = sectionEl.querySelector<HTMLElement>(
        "[data-skills-heading]",
      );
      if (headingEl) {
        gsap.fromTo(
          headingEl,
          { yPercent: 108, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.85,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionEl,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      const cards = sectionEl.querySelectorAll<HTMLElement>("[data-skill-card]");
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.09,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current ?? sectionEl,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      // Scroll-velocity marquee acceleration via Web Animations API
      const tracks = sectionEl.querySelectorAll<HTMLElement>(
        "[data-marquee-track]",
      );
      let decayTween: gsap.core.Tween | null = null;
      const rateProxy = { rate: 1 };

      const applyPlaybackRate = (rate: number) => {
        tracks.forEach((track) => {
          const anims = track.getAnimations?.();
          if (anims) {
            anims.forEach((anim) => {
              anim.playbackRate = rate;
            });
          }
        });
      };

      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          const boost = Math.min(2.4, velocity / 950);
          if (boost > 0.15) {
            rateProxy.rate = 1 + boost;
            applyPlaybackRate(rateProxy.rate);
            decayTween?.kill();
            decayTween = gsap.to(rateProxy, {
              rate: 1,
              duration: 0.65,
              ease: "power2.out",
              onUpdate: () => applyPlaybackRate(rateProxy.rate),
            });
          }
        },
      });

      return () => {
        cleanupScramble?.();
        decayTween?.kill();
      };
    },
    { scope: sectionRef, dependencies: [motionEnabled, ready] },
  );

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`section ${styles.section}`}
    >
      <div className={styles.scene} aria-hidden="true">
        {motionEnabled ? (
          <Suspense fallback={<div className={styles.fallback} />}>
            <SkillsScene />
          </Suspense>
        ) : (
          <div className={styles.fallback} />
        )}
      </div>

      <div className={styles.content}>
        <p ref={labelRef} className={`micro ${styles.label}`}>
          03 / Core Competencies
        </p>
        <h2 className={`serif ${styles.heading}`}>
          <span className={styles.lineMask}>
            <span className={styles.lineInner} data-skills-heading>
              Technologies I actually use.
            </span>
          </span>
        </h2>

        <div className={styles.marqueeGroup}>
          <div
            className={styles.marquee}
            data-paused={!motionEnabled || undefined}
          >
            <ul className={styles.track} data-marquee-track>
              {row1.map((skill, i) => (
                <li key={`r1-${skill}-${i}`}>
                  <span>{skill}</span>
                  <span className={styles.sep} aria-hidden="true">
                    ·
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`${styles.marquee} ${styles.reverse}`}
            data-paused={!motionEnabled || undefined}
          >
            <ul className={styles.track} data-marquee-track>
              {row2.map((skill, i) => (
                <li key={`r2-${skill}-${i}`}>
                  <span>{skill}</span>
                  <span className={styles.sep} aria-hidden="true">
                    ·
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          ref={gridRef}
          className={styles.categoriesGrid}
          onPointerMove={handleGridPointerMove}
        >
          {skillCategories.map((cat) => (
            <article
              key={cat.id}
              className={styles.categoryCard}
              data-skill-card
            >
              <header className={styles.categoryHead}>
                <span className={`micro ${styles.rowIndex}`}>{cat.row}</span>
                <h3 className="serif">{cat.title}</h3>
              </header>

              <div className={styles.subgroups}>
                {cat.groups.map((group) => (
                  <div key={group.label} className={styles.subgroup}>
                    <p className={`micro ${styles.subgroupLabel}`}>
                      {group.label}
                    </p>
                    <ul className={styles.badgeList}>
                      {group.items.map((item) => (
                        <li key={item} className={styles.skillBadge}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
