"use client";

import { site } from "@/data/site";
import { primaryConversationHref } from "@/data/socials";
import { HalftonePortrait } from "./HalftonePortrait";
import styles from "./Hero.module.scss";

export function Hero() {
  return (
    <section className={styles.hero} aria-label="Introduction">
      <div className={styles.top}>
        <p className={`micro ${styles.role}`}>
          <span className={styles.dot}>•</span> {site.roleLine}
        </p>
        <p className="micro">{site.locationLine}</p>
      </div>

      <div className={styles.stage}>
        <aside className={styles.left}>
          <p className={`micro ${styles.accent}`}>{site.presenceLabel}</p>
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

      <h1 className={styles.name}>
        <span>{site.firstName}</span>{" "}
        <em>{site.lastName}</em>
      </h1>

      <p className={styles.intro}>{site.intro}</p>

      <div className={styles.ctas}>
        <a className={styles.primary} href="#work">
          Explore my work ↓
        </a>
        <a
          className={styles.ghost}
          href={primaryConversationHref}
          target="_blank"
          rel="noreferrer"
        >
          Start a conversation ↗
        </a>
      </div>

      <div className={styles.bottom}>
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
