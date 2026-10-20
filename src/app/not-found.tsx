import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section" style={{ minHeight: "100svh" }}>
      <p className="micro" style={{ color: "var(--accent)" }}>
        404
      </p>
      <h1 className="serif" style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 400 }}>
        This page isn&apos;t here.
      </h1>
      <Link href="/" style={{ display: "inline-block", marginTop: "1.5rem", textDecoration: "underline" }}>
        Back home ↗
      </Link>
    </main>
  );
}
