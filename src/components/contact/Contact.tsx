"use client";

import { site } from "@/data/site";
import { primaryConversationHref, socials } from "@/data/socials";
import styles from "./Contact.module.scss";

export function Contact() {
  const year = new Date().getFullYear();
  const connectHref = site.email
    ? `mailto:${site.email}`
    : primaryConversationHref;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className={`section ${styles.footer}`}>
      <div className={styles.container}>
        <p className={`micro ${styles.label}`}>04 / Contact & Conversations</p>
        <h2 className="serif">
          {site.contactHeadline}
          <br />
          <em>{site.contactItalic}</em>
        </h2>

        <div className={styles.actionRow}>
          <a
            className={styles.connect}
            href={connectHref}
            target={site.email ? undefined : "_blank"}
            rel={site.email ? undefined : "noreferrer"}
          >
            Let&apos;s connect ↗
          </a>
          {!site.email ? (
            <p className={styles.todo}>Email TODO — opens LinkedIn profile</p>
          ) : null}
        </div>

        <ul className={styles.socials}>
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className={styles.socialLink}>
                {s.label} ↗
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.base}>
          <div className={styles.wordmarkCol}>
            <p className={`serif ${styles.wordmark}`}>{site.wordmark}</p>
            <p className="micro">© {year} {site.firstName} {site.lastName}. All rights reserved.</p>
          </div>
          <button
            type="button"
            className={styles.topBtn}
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            ↑
          </button>
        </div>

        <p className={`micro ${styles.microRow}`}>
          {site.college} · {site.year} · {site.city}, {site.country}
        </p>
      </div>
    </footer>
  );
}
