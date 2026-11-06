"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { skillCategories, skills } from "@/data/skills";
import { useMotionPreference } from "@/context/MotionContext";
import styles from "./Skills.module.scss";

const SkillsScene = dynamic(() => import("./SkillsScene"), {
  ssr: false,
  loading: () => <div className={styles.fallback} />,
});

export function Skills() {
  const { motionEnabled } = useMotionPreference();

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

  return (
    <section id="skills" className={`section ${styles.section}`}>
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
        <p className={`micro ${styles.label}`}>03 / Core Competencies</p>
        <h2 className={`serif ${styles.heading}`}>
          Technologies I actually use.
        </h2>

        <div className={styles.marqueeGroup}>
          <div
            className={styles.marquee}
            data-paused={!motionEnabled || undefined}
          >
            <ul className={styles.track}>
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
            <ul className={styles.track}>
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

        <div className={styles.categoriesGrid}>
          {skillCategories.map((cat) => (
            <article key={cat.id} className={styles.categoryCard}>
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
