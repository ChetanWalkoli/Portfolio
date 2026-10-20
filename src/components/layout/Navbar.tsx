"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navItems, site } from "@/data/site";
import { primaryConversationHref } from "@/data/socials";
import { useMotionPreference } from "@/context/MotionContext";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#work");
  const { motionEnabled } = useMotionPreference();

  useEffect(() => {
    const ids = navItems.map((n) => n.href.slice(1));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.wrap}>
      <nav className={styles.pill} aria-label="Primary">
        <a href="#top" className={styles.wordmark}>
          {site.wordmark}
        </a>
        <ul className={styles.links}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={active === item.href ? styles.active : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          className={styles.talk}
          href={primaryConversationHref}
          target="_blank"
          rel="noreferrer"
        >
          Let&apos;s talk ↗
        </a>
        <button
          type="button"
          className={styles.menuBtn}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className={styles.mobile}
            initial={motionEnabled ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={motionEnabled ? { opacity: 0 } : undefined}
          >
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={primaryConversationHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                >
                  Let&apos;s talk ↗
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
