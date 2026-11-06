import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import styles from "./CaseStudy.module.scss";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: `Project Not Found · ${site.firstName} ${site.lastName}`,
    };
  }

  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: CaseStudyPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={`section ${styles.page}`}>
      <div className={styles.container}>
        <Link href="/#work" className={`micro ${styles.backLink}`}>
          ← Back to Work
        </Link>

        <header className={styles.header}>
          <p className={`micro ${styles.meta}`}>
            {project.number} / {project.category}
          </p>

          <h1 className={`serif ${styles.title}`}>
            {project.titlePrimary}
            {project.titleAccent ? (
              <>
                {" "}
                <em>{project.titleAccent}</em>
              </>
            ) : null}
          </h1>

          <p className={styles.overview}>{project.caseStudy.overview}</p>

          <ul className={styles.techRow} aria-label="Technology stack">
            {project.techStack.map((tech) => (
              <li key={tech} className={styles.techBadge}>
                {tech}
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className={styles.primaryBtn}
            >
              Live Demo ↗
            </a>
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className={styles.ghostLink}
            >
              GitHub Repository ↗
            </a>
          </div>
        </header>

        <section
          className={styles.twoCol}
          aria-label="Problem and Solution Overview"
        >
          <article className={styles.card}>
            <p className={`micro ${styles.cardLabel}`}>01 / The Problem</p>
            <h2 className="serif">Problem</h2>
            <p className={styles.bodyText}>{project.caseStudy.problem}</p>
          </article>

          <article className={styles.card}>
            <p className={`micro ${styles.cardLabel}`}>02 / The Solution</p>
            <h2 className="serif">Solution</h2>
            <p className={styles.bodyText}>{project.caseStudy.solution}</p>
          </article>
        </section>

        <section
          className={styles.card}
          aria-label="Architecture and Implementation"
        >
          <p className={`micro ${styles.cardLabel}`}>
            03 / Architecture &amp; Features
          </p>
          <h2 className="serif">How it works</h2>
          <ol className={styles.solutionGrid}>
            {project.solutions.map((item, idx) => (
              <li key={item.title} className={styles.solutionItem}>
                <span className={`micro ${styles.solNumber}`}>0{idx + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className={styles.twoCol}
          aria-label="Features and Technical Notes"
        >
          <article className={styles.card}>
            <p className={`micro ${styles.cardLabel}`}>04 / Features</p>
            <h2 className="serif">Key features</h2>
            <ul className={styles.bulletList}>
              {project.caseStudy.keyFeatures.map((feature) => (
                <li key={feature}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className={styles.card}>
            <p className={`micro ${styles.cardLabel}`}>05 / Challenges</p>
            <h2 className="serif">Implementation details</h2>
            <ul className={styles.bulletList}>
              {project.caseStudy.challenges.map((challenge) => (
                <li key={challenge}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>
    </main>
  );
}
