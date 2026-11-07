"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { site } from "@/data/site";
import { primaryConversationHref } from "@/data/socials";
import { useMotionPreference } from "@/context/MotionContext";
import { HalftonePortrait } from "./HalftonePortrait";
import styles from "./Hero.module.scss";

gsap.registerPlugin(ScrollTrigger, useGSAP);

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

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const presenceRef = useRef<HTMLParagraphElement>(null);
  const primaryCtaRef = useRef<HTMLAnchorElement>(null);
  const { motionEnabled, ready } = useMotionPreference();

  useGSAP(
    () => {
      if (!ready || !motionEnabled) return;
      const root = heroRef.current;
      if (!root) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReduced) return;

      const topEl = root.querySelector<HTMLElement>("[data-hero-top]");
      const leftEl = root.querySelector<HTMLElement>("[data-hero-left]");
      const portraitEl = root.querySelector<HTMLElement>("[data-hero-portrait]");
      const nameEl = root.querySelector<HTMLElement>("[data-hero-name]");
      const introEl = root.querySelector<HTMLElement>("[data-hero-intro]");
      const ctasEl = root.querySelector<HTMLElement>("[data-hero-ctas]");
      const bottomEl = root.querySelector<HTMLElement>("[data-hero-bottom]");

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (topEl) {
        tl.from(
          topEl,
          { y: -10, opacity: 0, duration: 0.5, clearProps: "all" },
          0,
        );
      }

      if (leftEl) {
        tl.from(
          leftEl,
          { x: -14, opacity: 0, duration: 0.6, clearProps: "all" },
          0.06,
        );
      }

      if (portraitEl) {
        tl.from(
          portraitEl,
          { y: 24, opacity: 0, scale: 0.985, duration: 0.8, clearProps: "all" },
          0.08,
        );
      }

      if (nameEl) {
        tl.from(
          nameEl,
          { y: 18, opacity: 0, duration: 0.75, clearProps: "all" },
          0.22,
        );
      }

      const lowerEls = [introEl, ctasEl, bottomEl].filter(
        (el): el is HTMLElement => Boolean(el),
      );
      if (lowerEls.length > 0) {
        tl.from(
          lowerEls,
          {
            y: 12,
            opacity: 0,
            duration: 0.6,
            stagger: 0.06,
            clearProps: "all",
          },
          0.34,
        );
      }

      // Monospace character scramble on "01 / PRESENCE"
      let cleanupScramble: (() => void) | undefined;
      if (presenceRef.current) {
        cleanupScramble = scrambleElementText(
          presenceRef.current,
          site.presenceLabel,
          480,
        );
      }

      // Magnetic hover pull on primary CTA (desktop fine pointer only)
      const ctaEl = primaryCtaRef.current;
      const canHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      if (ctaEl && canHover) {
        const xTo = gsap.quickTo(ctaEl, "x", {
          duration: 0.35,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(ctaEl, "y", {
          duration: 0.35,
          ease: "power3.out",
        });

        const onMove = (e: PointerEvent) => {
          const rect = ctaEl.getBoundingClientRect();
          const dx = e.clientX - (rect.left + rect.width / 2);
          const dy = e.clientY - (rect.top + rect.height / 2);
          xTo(dx * 0.22);
          yTo(dy * 0.28);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        ctaEl.addEventListener("pointermove", onMove);
        ctaEl.addEventListener("pointerleave", onLeave);

        return () => {
          cleanupScramble?.();
          ctaEl.removeEventListener("pointermove", onMove);
          ctaEl.removeEventListener("pointerleave", onLeave);
        };
      }

      return () => {
        cleanupScramble?.();
      };
    },
    { scope: heroRef, dependencies: [motionEnabled, ready] },
  );

  return (
    <section ref={heroRef} className={styles.hero} aria-label="Introduction">
      <div className={styles.top} data-hero-top>
        <p className={`micro ${styles.role}`}>
          <span className={styles.dot}>•</span> {site.roleLine}
        </p>
        <p className="micro">{site.locationLine}</p>
      </div>

      <div className={styles.centerGroup}>
        <div className={styles.stage}>
          <aside className={styles.left} data-hero-left>
            <p ref={presenceRef} className={`micro ${styles.accent}`}>
              {site.presenceLabel}
            </p>
            <p className={styles.plus} aria-hidden>
              +
            </p>
            <ul className="micro">
              {site.disciplines.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </aside>

          <HalftonePortrait />
        </div>

        <h1 className={styles.name} data-hero-name>
          <span>{site.firstName}</span>{" "}
          <em>{site.lastName}</em>
        </h1>

        <p className={styles.intro} data-hero-intro>
          {site.intro}
        </p>

        <div className={styles.ctas} data-hero-ctas>
          <a ref={primaryCtaRef} className={styles.primary} href="#work">
            <span className={styles.primaryLabel}>Explore my work</span>
            <span className={styles.arrowWrap} aria-hidden="true">
              <span className={styles.arrowMain}>↓</span>
              <span className={styles.arrowClone}>↓</span>
            </span>
          </a>
          <a
            className={styles.ghost}
            href={primaryConversationHref}
            target="_blank"
            rel="noreferrer"
          >
            <span>Start a conversation</span>
            <span className={styles.diagWrap} aria-hidden="true">
              <span className={styles.diagMain}>↗</span>
              <span className={styles.diagClone}>↗</span>
            </span>
          </a>
        </div>
      </div>

      <div className={styles.bottom} data-hero-bottom>
        <div className={styles.discover}>
          <span className={styles.accentBar} aria-hidden />
          <p className="micro">Scroll to discover ↓</p>
        </div>
        <p className={`micro ${styles.centerMeta}`}>{site.buildingLine}</p>
        <div className={styles.spacer} aria-hidden />
      </div>
    </section>
  );
}
