"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { featuredProjects, moreProjects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import { useMotionPreference } from "@/context/MotionContext";
import styles from "./Work.module.scss";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function ProjectPreviewArt({ slug, title }: { slug: string; title: string }) {
  if (slug === "apexthink") {
    return (
      <div className={styles.artBox} aria-hidden>
        <svg viewBox="0 0 400 240" fill="none" className={styles.svgArt}>
          <defs>
            <linearGradient id="apexGrad" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e8875a" stopOpacity="0.4" />
              <stop offset="1" stopColor="#f2efe8" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop stopColor="#e8875a" stopOpacity="0.7" />
              <stop offset="1" stopColor="#e8875a" stopOpacity="0" />
            </radialGradient>
          </defs>
          {/* Dependency Connections */}
          <path d="M 80 120 C 140 60, 200 60, 260 100" stroke="rgba(242, 239, 232, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 80 120 C 140 180, 200 180, 260 140" stroke="rgba(242, 239, 232, 0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 260 100 C 300 80, 320 110, 340 120" stroke="url(#apexGrad)" strokeWidth="2" />
          <path d="M 260 140 C 300 160, 320 130, 340 120" stroke="url(#apexGrad)" strokeWidth="2" />
          {/* Nodes */}
          <circle cx="80" cy="120" r="14" fill="#0d0d0d" stroke="#e8875a" strokeWidth="2" />
          <circle cx="80" cy="120" r="28" fill="url(#nodeGlow)" />
          <circle cx="260" cy="100" r="10" fill="#0d0d0d" stroke="rgba(242, 239, 232, 0.6)" strokeWidth="1.5" />
          <circle cx="260" cy="140" r="10" fill="#0d0d0d" stroke="rgba(242, 239, 232, 0.6)" strokeWidth="1.5" />
          <circle cx="340" cy="120" r="12" fill="#0d0d0d" stroke="#e8875a" strokeWidth="2" />
          {/* Text Labels */}
          <text x="80" y="152" fill="#f2efe8" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">root/src</text>
          <text x="260" y="80" fill="rgba(242, 239, 232, 0.6)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">api/chat</text>
          <text x="260" y="165" fill="rgba(242, 239, 232, 0.6)" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">graph/ast</text>
          <text x="340" y="148" fill="#e8875a" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">LLM</text>
          {/* Terminal / query pill */}
          <rect x="70" y="190" width="260" height="28" rx="14" fill="#141414" stroke="rgba(255, 255, 255, 0.12)" />
          <circle cx="86" cy="204" r="3" fill="#e8875a" />
          <text x="98" y="208" fill="rgba(242, 239, 232, 0.7)" fontSize="10" fontFamily="var(--font-mono)">explain codebase flow...</text>
        </svg>
      </div>
    );
  }

  if (slug === "atmos") {
    return (
      <div className={styles.artBox} aria-hidden>
        <svg viewBox="0 0 400 240" fill="none" className={styles.svgArt}>
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="240" gradientUnits="userSpaceOnUse">
              <stop stopColor="#e8875a" stopOpacity="0.25" />
              <stop offset="0.6" stopColor="#050505" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect x="30" y="30" width="340" height="180" rx="10" fill="#0d0d0d" stroke="rgba(255, 255, 255, 0.08)" />
          {/* Ambient weather curve */}
          <path d="M 50 160 Q 130 90, 200 130 T 350 110" stroke="#e8875a" strokeWidth="2" fill="none" />
          <path d="M 50 160 Q 130 90, 200 130 T 350 110 L 350 190 L 50 190 Z" fill="url(#skyGrad)" />
          {/* Temperature indicator */}
          <text x="65" y="85" fill="#f2efe8" fontSize="32" fontFamily="var(--font-display)">28°</text>
          <text x="125" y="72" fill="#e8875a" fontSize="12" fontFamily="var(--font-mono)">PUNE, IN</text>
          <text x="125" y="88" fill="rgba(242, 239, 232, 0.5)" fontSize="10" fontFamily="var(--font-mono)">CLEAR SKY · 1014 hPa</text>
          {/* Weather metric pills */}
          <rect x="240" y="55" width="110" height="26" rx="13" fill="#161616" stroke="rgba(255, 255, 255, 0.1)" />
          <text x="295" y="72" fill="rgba(242, 239, 232, 0.8)" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">HUMIDITY 42%</text>
        </svg>
      </div>
    );
  }

  if (slug === "linklyst") {
    return (
      <div className={styles.artBox} aria-hidden>
        <svg viewBox="0 0 400 240" fill="none" className={styles.svgArt}>
          <rect x="30" y="30" width="340" height="180" rx="10" fill="#0d0d0d" stroke="rgba(255, 255, 255, 0.08)" />
          {/* Header search bar */}
          <rect x="50" y="48" width="220" height="22" rx="4" fill="#181818" stroke="rgba(255, 255, 255, 0.1)" />
          <text x="62" y="63" fill="rgba(242, 239, 232, 0.5)" fontSize="9" fontFamily="var(--font-mono)">search curated links...</text>
          <rect x="280" y="48" width="70" height="22" rx="4" fill="#e8875a" fillOpacity="0.2" stroke="#e8875a" strokeWidth="0.8" />
          <text x="315" y="63" fill="#e8875a" fontSize="9" textAnchor="middle" fontFamily="var(--font-mono)">+ NEW</text>
          {/* Link rows */}
          <rect x="50" y="85" width="300" height="32" rx="6" fill="#141414" stroke="rgba(255, 255, 255, 0.06)" />
          <circle cx="68" cy="101" r="5" fill="#e8875a" />
          <text x="84" y="105" fill="#f2efe8" fontSize="11" fontFamily="var(--font-body)">Engineering Architecture Docs</text>
          <text x="330" y="105" fill="rgba(242, 239, 232, 0.4)" fontSize="9" textAnchor="end" fontFamily="var(--font-mono)">↗</text>

          <rect x="50" y="125" width="300" height="32" rx="6" fill="#141414" stroke="rgba(255, 255, 255, 0.06)" />
          <circle cx="68" cy="141" r="5" fill="#f2efe8" fillOpacity="0.4" />
          <text x="84" y="145" fill="#f2efe8" fontSize="11" fontFamily="var(--font-body)">Design System Components</text>
          <text x="330" y="145" fill="rgba(242, 239, 232, 0.4)" fontSize="9" textAnchor="end" fontFamily="var(--font-mono)">↗</text>

          <rect x="50" y="165" width="300" height="32" rx="6" fill="#141414" stroke="rgba(255, 255, 255, 0.06)" />
          <circle cx="68" cy="181" r="5" fill="#f2efe8" fillOpacity="0.4" />
          <text x="84" y="185" fill="#f2efe8" fontSize="11" fontFamily="var(--font-body)">Embedded Sensors & Hardware</text>
          <text x="330" y="185" fill="rgba(242, 239, 232, 0.4)" fontSize="9" textAnchor="end" fontFamily="var(--font-mono)">↗</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={styles.defaultArt}>
      <p className="serif">{title}</p>
      <small className="micro">Interactive build</small>
    </div>
  );
}

function BrowserFrame({ project, index }: { project: Project; index: number }) {
  const href = project.href ?? project.repo;
  const displayUrl = project.href
    ? project.href.replace(/^https?:\/\//, "")
    : project.repo
      ? project.repo.replace(/^https?:\/\/github\.com\//, "github.com/")
      : "localhost:3000 · prototype";

  return (
    <article className={styles.frame}>
      <div className={styles.chrome}>
        <div className={styles.trafficLights} aria-hidden>
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <div className={styles.urlBar}>
          <span className={styles.lockIcon} aria-hidden>🔒</span>
          <p>{displayUrl}</p>
        </div>
      </div>
      <div className={styles.preview}>
        {project.preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.preview} alt={`${project.title} preview`} />
        ) : (
          <ProjectPreviewArt slug={project.slug} title={project.title} />
        )}
        {href ? (
          <a
            className={styles.orb}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.title}`}
          >
            ↗
          </a>
        ) : null}
      </div>
      <p className={`micro ${styles.frameMeta}`}>
        {pad(index)} / {project.category}
      </p>
    </article>
  );
}

export function Work() {
  const [open, setOpen] = useState<string | null>(null);
  const { motionEnabled } = useMotionPreference();

  return (
    <section id="work" className={`section ${styles.work}`}>
      <header className={styles.head}>
        <h2 className="serif">
          {site.tagline}
          <br />
          <em>{site.taglineItalic}</em>
        </h2>
      </header>

      <div className={styles.featured}>
        {featuredProjects.map((project, i) => {
          const href = project.href ?? project.repo;
          return (
            <div key={project.slug} className={styles.entry}>
              <BrowserFrame project={project} index={i + 1} />
              <div className={styles.copy}>
                <p className={`micro ${styles.cat}`}>
                  {pad(i + 1)} / {project.category}
                </p>
                <h3 className="serif">{project.title}</h3>
                <p className={styles.desc}>{project.description}</p>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.story}
                  >
                    Explore the story ↗
                  </a>
                ) : (
                  <span className={styles.todo}>Explore the story ↗ · link TODO</span>
                )}
                {project.notes ? (
                  <p className={styles.note}>{project.notes}</p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.more}>
        <p className={`micro ${styles.moreLabel}`}>More ways I build</p>
        <ul className={styles.moreList}>
          {moreProjects.map((project, i) => {
            const href = project.href ?? project.repo;
            const expanded = open === project.slug;
            return (
              <li key={project.slug} className={styles.moreItem}>
                <div className={styles.row}>
                  <a
                    href={href ?? "#work"}
                    target={href ? "_blank" : undefined}
                    rel={href ? "noreferrer" : undefined}
                    className={styles.projectLink}
                  >
                    <span className="serif">{project.title}</span>
                    <span className="micro">
                      {pad(i + 1)} / {project.category}
                      {project.badge ? (
                        <span className={styles.badge}> · {project.badge}</span>
                      ) : ""}
                    </span>
                  </a>
                  <button
                    type="button"
                    aria-expanded={expanded}
                    className={styles.expandBtn}
                    onClick={() =>
                      setOpen(expanded ? null : project.slug)
                    }
                  >
                    {expanded ? "−" : "+"}
                    <span className={styles.visually}>Inside this project</span>
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {expanded ? (
                    <motion.div
                      initial={motionEnabled ? { height: 0, opacity: 0 } : false}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={motionEnabled ? { height: 0, opacity: 0 } : undefined}
                      className={styles.inside}
                    >
                      <p className={styles.insideDesc}>{project.description}</p>
                      {project.notes ? (
                        <p className={styles.insideNote}>{project.notes}</p>
                      ) : null}
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className={styles.insideLink}
                        >
                          View Source / Details ↗
                        </a>
                      ) : null}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
