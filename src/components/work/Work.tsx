"use client";

import Link from "next/link";
import { featuredProjects, type Project } from "@/data/projects";
import { site } from "@/data/site";
import styles from "./Work.module.scss";

function ProjectPreviewArt({ slug, title }: { slug: string; title: string }) {
  if (slug === "linklyst") {
    return (
      <div className={styles.artBox} aria-hidden="true">
        <svg viewBox="0 0 400 240" fill="none" className={styles.svgArt}>
          <rect
            x="30"
            y="30"
            width="340"
            height="180"
            rx="10"
            fill="#0d0d0d"
            stroke="rgba(255, 255, 255, 0.08)"
          />
          {/* Header search bar */}
          <rect
            x="50"
            y="48"
            width="220"
            height="22"
            rx="4"
            fill="#181818"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <text
            x="62"
            y="63"
            fill="rgba(242, 239, 232, 0.5)"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            lnk.ly/x8Kp2 · Base62 + Cache
          </text>
          <rect
            x="280"
            y="48"
            width="70"
            height="22"
            rx="4"
            fill="#e8875a"
            fillOpacity="0.2"
            stroke="#e8875a"
            strokeWidth="0.8"
          />
          <text
            x="315"
            y="63"
            fill="#e8875a"
            fontSize="9"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            + SHORTEN
          </text>
          {/* Link rows */}
          <rect
            x="50"
            y="85"
            width="300"
            height="32"
            rx="6"
            fill="#141414"
            stroke="rgba(255, 255, 255, 0.06)"
          />
          <circle cx="68" cy="101" r="5" fill="#e8875a" />
          <text
            x="84"
            y="105"
            fill="#f2efe8"
            fontSize="11"
            fontFamily="var(--font-body)"
          >
            Base62 Short-Code &amp; Redirect Cache
          </text>
          <text
            x="330"
            y="105"
            fill="rgba(242, 239, 232, 0.4)"
            fontSize="9"
            textAnchor="end"
            fontFamily="var(--font-mono)"
          >
            ↗
          </text>

          <rect
            x="50"
            y="125"
            width="300"
            height="32"
            rx="6"
            fill="#141414"
            stroke="rgba(255, 255, 255, 0.06)"
          />
          <circle cx="68" cy="141" r="5" fill="#f2efe8" fillOpacity="0.4" />
          <text
            x="84"
            y="145"
            fill="#f2efe8"
            fontSize="11"
            fontFamily="var(--font-body)"
          >
            Click Analytics &amp; QR Code Export
          </text>
          <text
            x="330"
            y="145"
            fill="rgba(242, 239, 232, 0.4)"
            fontSize="9"
            textAnchor="end"
            fontFamily="var(--font-mono)"
          >
            ↗
          </text>

          <rect
            x="50"
            y="165"
            width="300"
            height="32"
            rx="6"
            fill="#141414"
            stroke="rgba(255, 255, 255, 0.06)"
          />
          <circle cx="68" cy="181" r="5" fill="#f2efe8" fillOpacity="0.4" />
          <text
            x="84"
            y="185"
            fill="#f2efe8"
            fontSize="11"
            fontFamily="var(--font-body)"
          >
            PostgreSQL · Prisma ORM · Vitest
          </text>
          <text
            x="330"
            y="185"
            fill="rgba(242, 239, 232, 0.4)"
            fontSize="9"
            textAnchor="end"
            fontFamily="var(--font-mono)"
          >
            ↗
          </text>
        </svg>
      </div>
    );
  }

  if (slug === "icognito") {
    return (
      <div className={styles.artBox} aria-hidden="true">
        <svg viewBox="0 0 400 240" fill="none" className={styles.svgArt}>
          <defs>
            <radialGradient id="rtcGlow" cx="50%" cy="50%" r="50%">
              <stop stopColor="#e8875a" stopOpacity="0.55" />
              <stop offset="1" stopColor="#e8875a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect
            x="30"
            y="30"
            width="340"
            height="180"
            rx="10"
            fill="#0d0d0d"
            stroke="rgba(255, 255, 255, 0.08)"
          />
          <rect
            x="48"
            y="48"
            width="140"
            height="104"
            rx="8"
            fill="#141414"
            stroke="rgba(232, 135, 90, 0.4)"
          />
          <circle
            cx="118"
            cy="92"
            r="18"
            fill="#1d1d1d"
            stroke="#e8875a"
            strokeWidth="1.5"
          />
          <text
            x="118"
            y="96"
            fill="#e8875a"
            fontSize="9"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            PEER A
          </text>
          <text
            x="60"
            y="140"
            fill="rgba(242, 239, 232, 0.55)"
            fontSize="8.5"
            fontFamily="var(--font-mono)"
          >
            UUIDv4 · Ephemeral
          </text>

          <rect
            x="212"
            y="48"
            width="140"
            height="104"
            rx="8"
            fill="#141414"
            stroke="rgba(255, 255, 255, 0.12)"
          />
          <circle
            cx="282"
            cy="92"
            r="18"
            fill="#1d1d1d"
            stroke="rgba(242, 239, 232, 0.6)"
            strokeWidth="1.5"
          />
          <text
            x="282"
            y="96"
            fill="#f2efe8"
            fontSize="9"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            PEER B
          </text>
          <text
            x="224"
            y="140"
            fill="rgba(242, 239, 232, 0.55)"
            fontSize="8.5"
            fontFamily="var(--font-mono)"
          >
            OneONoneCall · WebRTC
          </text>

          <circle cx="200" cy="100" r="20" fill="url(#rtcGlow)" />
          <path
            d="M 188 100 L 212 100"
            stroke="#e8875a"
            strokeWidth="1.75"
            strokeDasharray="3 3"
          />

          <rect
            x="48"
            y="164"
            width="210"
            height="30"
            rx="15"
            fill="#151515"
            stroke="rgba(255, 255, 255, 0.1)"
          />
          <circle cx="64" cy="179" r="3.5" fill="#e8875a" />
          <text
            x="76"
            y="183"
            fill="rgba(242, 239, 232, 0.78)"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            socket.emit(&quot;matched&quot;, room)
          </text>

          <rect
            x="268"
            y="164"
            width="84"
            height="30"
            rx="15"
            fill="#e8875a"
            fillOpacity="0.18"
            stroke="#e8875a"
            strokeWidth="1"
          />
          <text
            x="310"
            y="183"
            fill="#e8875a"
            fontSize="9"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            NEXT →
          </text>
        </svg>
      </div>
    );
  }

  if (slug === "interview-ai") {
    return (
      <div className={styles.artBox} aria-hidden="true">
        <svg viewBox="0 0 400 240" fill="none" className={styles.svgArt}>
          <rect
            x="30"
            y="30"
            width="340"
            height="180"
            rx="10"
            fill="#0d0d0d"
            stroke="rgba(255, 255, 255, 0.08)"
          />
          <rect
            x="48"
            y="48"
            width="112"
            height="144"
            rx="8"
            fill="#141414"
            stroke="rgba(255, 255, 255, 0.08)"
          />
          <circle
            cx="104"
            cy="92"
            r="26"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="4.5"
          />
          <circle
            cx="104"
            cy="92"
            r="26"
            stroke="#e8875a"
            strokeWidth="4.5"
            strokeDasharray="140 165"
            strokeLinecap="round"
          />
          <text
            x="104"
            y="97"
            fill="#f2efe8"
            fontSize="13"
            textAnchor="middle"
            fontFamily="var(--font-display)"
          >
            88%
          </text>
          <text
            x="104"
            y="136"
            fill="#e8875a"
            fontSize="8"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            GEMINI MATCH
          </text>
          <rect
            x="60"
            y="150"
            width="88"
            height="24"
            rx="4"
            fill="#1a1a1a"
            stroke="rgba(232, 135, 90, 0.35)"
          />
          <text
            x="104"
            y="165"
            fill="rgba(242, 239, 232, 0.78)"
            fontSize="8"
            textAnchor="middle"
            fontFamily="var(--font-mono)"
          >
            PDFKit Resume ↓
          </text>

          <rect
            x="174"
            y="48"
            width="178"
            height="44"
            rx="6"
            fill="#141414"
            stroke="rgba(255, 255, 255, 0.07)"
          />
          <text
            x="186"
            y="65"
            fill="#e8875a"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            01 · RESUME PDF PARSER
          </text>
          <text
            x="186"
            y="80"
            fill="#f2efe8"
            fontSize="9.5"
            fontFamily="var(--font-body)"
          >
            Multer + pdf-parse text extraction
          </text>

          <rect
            x="174"
            y="98"
            width="178"
            height="44"
            rx="6"
            fill="#141414"
            stroke="rgba(255, 255, 255, 0.07)"
          />
          <text
            x="186"
            y="115"
            fill="#e8875a"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            02 · ZOD QUESTION SCHEMA
          </text>
          <text
            x="186"
            y="130"
            fill="#f2efe8"
            fontSize="9.5"
            fontFamily="var(--font-body)"
          >
            Role-specific questions &amp; skill gaps
          </text>

          <rect
            x="174"
            y="148"
            width="178"
            height="44"
            rx="6"
            fill="#141414"
            stroke="rgba(232, 135, 90, 0.35)"
          />
          <text
            x="186"
            y="165"
            fill="#e8875a"
            fontSize="8"
            fontFamily="var(--font-mono)"
          >
            03 · ANSWER EVALUATION
          </text>
          <text
            x="186"
            y="180"
            fill="rgba(242, 239, 232, 0.8)"
            fontSize="9"
            fontFamily="var(--font-mono)"
          >
            Saved in MongoDB · JWT Auth
          </text>
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

function BrowserFrame({ project }: { project: Project }) {
  const displayUrl = project.href.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <article className={styles.frame}>
      <div className={styles.chrome}>
        <div className={styles.trafficLights} aria-hidden="true">
          <span className={styles.dotRed} />
          <span className={styles.dotYellow} />
          <span className={styles.dotGreen} />
        </div>
        <div className={styles.urlBar}>
          <svg
            className={styles.lockIcon}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
            <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
          </svg>
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
        <a
          className={styles.orb}
          href={project.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${project.title}`}
        >
          ↗
        </a>
      </div>
      <p className={`micro ${styles.frameMeta}`}>
        {project.number} / {project.category}
      </p>
    </article>
  );
}

export function Work() {
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
        {featuredProjects.map((project) => (
          <div key={project.slug} className={styles.entry}>
            <BrowserFrame project={project} />
            <div className={styles.copy}>
              <p className={`micro ${styles.cat}`}>
                {project.number} / {project.category}
              </p>
              <h3 className="serif">
                {project.titlePrimary}
                {project.titleAccent ? (
                  <>
                    {" "}
                    <em>{project.titleAccent}</em>
                  </>
                ) : null}
              </h3>
              <p className={styles.desc}>{project.description}</p>
              <ul className={styles.techList} aria-label="Technology stack">
                {project.techStack.map((tech) => (
                  <li key={tech} className={styles.techPill}>
                    {tech}
                  </li>
                ))}
              </ul>
              <div className={styles.linksRow}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.story}
                >
                  Live Demo ↗
                </a>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.story}
                >
                  GitHub ↗
                </a>
                <Link href={project.caseStudyPath} className={styles.story}>
                  Explore the story →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
