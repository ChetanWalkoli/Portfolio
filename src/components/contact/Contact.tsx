"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { socials, type SocialId } from "@/data/socials";
import styles from "./Contact.module.scss";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  company: string; // Honeypot
};

const INITIAL_VALUES: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  company: "",
};

function renderSocialIcon(id: SocialId) {
  switch (id) {
    case "github":
      return (
        <svg
          className={styles.socialIcon}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5C0 17.8 3.438 22.3 8.205 23.885C8.805 23.995 9.025 23.625 9.025 23.305C9.025 23.02 9.015 22.265 9.01 21.265C5.672 21.99 4.968 19.655 4.968 19.655C4.422 18.27 3.635 17.9 3.635 17.9C2.545 17.155 3.718 17.17 3.718 17.17C4.922 17.255 5.556 18.405 5.556 18.405C6.626 20.24 8.364 19.71 9.05 19.4C9.158 18.625 9.468 18.095 9.81 17.795C7.145 17.49 4.344 16.46 4.344 11.86C4.344 10.55 4.812 9.48 5.58 8.64C5.456 8.335 5.044 7.11 5.698 5.455C5.698 5.455 6.705 5.13 8.998 6.685C9.955 6.42 10.98 6.288 12 6.283C13.02 6.288 14.045 6.42 15.002 6.685C17.295 5.13 18.302 5.455 18.302 5.455C18.956 7.11 18.544 8.335 18.42 8.64C19.188 9.48 19.656 10.55 19.656 11.86C19.656 16.47 16.85 17.485 14.176 17.785C14.606 18.155 14.99 18.885 14.99 20.005C14.99 21.605 14.975 22.895 14.975 23.305C14.975 23.625 15.195 24 15.805 23.885C20.565 22.295 24 17.8 24 12.5C24 5.87 18.627 0.5 12 0.5Z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          className={styles.socialIcon}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5ZM6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" />
        </svg>
      );
    case "leetcode":
      return (
        <svg
          className={styles.socialIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14.5 4.5L7 12l7.5 7.5" />
          <path d="M10 12h9" />
          <path d="M17.5 7.5a7.5 7.5 0 1 0 0 9" />
        </svg>
      );
    case "email":
      return (
        <svg
          className={styles.socialIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <path d="M3.5 6.5L12 13l8.5-6.5" />
        </svg>
      );
  }
}

export function Contact() {
  const year = new Date().getFullYear();
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (status === "error" || status === "success") {
      setStatus("idle");
      setFeedbackMessage("");
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus("error");
        setFeedbackMessage(
          data.error ||
            "Something went wrong. Please check your details and try again.",
        );
        return;
      }

      setStatus("success");
      setFeedbackMessage(data.message || "Message sent successfully!");
      setValues(INITIAL_VALUES);
    } catch {
      setStatus("error");
      setFeedbackMessage(
        `Network error while sending message. Please email ${site.email} directly.`,
      );
    }
  }

  return (
    <footer
      id="contact"
      className={`section ${styles.footer}`}
      aria-labelledby="contact-heading"
    >
      <div className={styles.horizonGlow} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.contactGrid}>
          {/* Left Column: Eyebrow, GET IN TOUCH Heading, Direct Details & Circular Socials */}
          <div className={styles.infoColumn}>
            <div className={styles.headingBlock}>
              <p className={`micro ${styles.eyebrow}`}>
                <span className={styles.eyebrowDot} aria-hidden="true" />
                AVAILABLE FOR OPPORTUNITIES
              </p>
              <h2 id="contact-heading" className={styles.getInTouchHeading}>
                GET IN
                <br />
                TOUCH
              </h2>
            </div>

            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Email:</span>
                <a
                  href={`mailto:${site.email}`}
                  className={styles.detailValueLink}
                >
                  {site.email}
                </a>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Phone:</span>
                <a
                  href={`tel:${site.phoneRaw}`}
                  className={styles.detailValueLink}
                >
                  {site.phone}
                </a>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Location:</span>
                <span className={styles.detailValueStatic}>
                  {site.locationFull}
                </span>
              </div>
            </div>

            <div className={styles.socialBlock}>
              <span className={styles.socialLabel}>Follow us</span>
              <div className={styles.socialRow}>
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target={s.external ? "_blank" : undefined}
                    rel={s.external ? "noreferrer" : undefined}
                    className={styles.socialButton}
                    aria-label={s.label}
                    title={s.label}
                  >
                    {renderSocialIcon(s.id)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Contact Form */}
          <div className={styles.formColumn}>
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              {/* Honeypot anti-spam field */}
              <div className={styles.honeypotField} aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={handleChange}
                />
              </div>

              {/* Row 1: Your Name + Email address */}
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-name" className={styles.fieldLabel}>
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your full name"
                    className={styles.input}
                    value={values.name}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-email" className={styles.fieldLabel}>
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Your email address"
                    className={styles.input}
                    value={values.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 2: Phone + Subject */}
              <div className={styles.fieldRow}>
                <div className={styles.fieldGroup}>
                  <label htmlFor="contact-phone" className={styles.fieldLabel}>
                    Phone
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="Your phone number"
                    className={styles.input}
                    value={values.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label
                    htmlFor="contact-subject"
                    className={styles.fieldLabel}
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Subject"
                    className={styles.input}
                    value={values.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 3: Message */}
              <div className={styles.fieldGroup}>
                <label htmlFor="contact-message" className={styles.fieldLabel}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Write something...."
                  className={styles.textarea}
                  value={values.message}
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={styles.submitButton}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && feedbackMessage ? (
                <div
                  role="status"
                  aria-live="polite"
                  className={`${styles.statusBanner} ${styles.statusSuccess}`}
                >
                  <span>{feedbackMessage}</span>
                </div>
              ) : null}

              {status === "error" && feedbackMessage ? (
                <div
                  role="alert"
                  aria-live="assertive"
                  className={`${styles.statusBanner} ${styles.statusError}`}
                >
                  <span>{feedbackMessage}</span>
                </div>
              ) : null}
            </form>
          </div>
        </div>

        {/* Original Footer Base */}
        <div className={styles.base}>
          <div className={styles.wordmarkCol}>
            <p className={`serif ${styles.wordmark}`}>{site.wordmark}</p>
            <p className="micro">
              © {year} {site.firstName} {site.lastName}. All rights reserved.
            </p>
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
          {site.college} · {site.degree} · {site.locationFull}
        </p>
      </div>
    </footer>
  );
}
