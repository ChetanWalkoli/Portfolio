export type Discipline = {
  index: string;
  label: string;
  title: string;
  text: string;
  capabilities: string[];
  tags: string[];
};

export const disciplines: Discipline[] = [
  {
    index: "01",
    label: "01 — FULL-STACK DEVELOPMENT",
    title: "Full-Stack Development",
    text: "End-to-end web apps built with React and Next.js on the frontend, Node.js, Express, and Socket.IO on the backend, and PostgreSQL, Prisma, or MongoDB for data.",
    capabilities: [
      "Web applications with React 19 & Next.js 16",
      "REST APIs & real-time servers with Node.js, Express 5 & Socket.IO",
      "PostgreSQL, Supabase, Prisma ORM & MongoDB schemas",
      "JWT & NextAuth authentication, in-memory caching & IP rate limiting",
      "Google Gemini API integration with Zod validation",
    ],
    tags: [
      "React 19",
      "Next.js 16",
      "Node.js",
      "Express 5",
      "Socket.IO",
      "PostgreSQL",
      "Prisma ORM",
      "MongoDB",
    ],
  },
  {
    index: "02",
    label: "02 — FRONTEND DEVELOPMENT",
    title: "Frontend Development",
    text: "Responsive, keyboard-accessible interfaces built with React 19, Next.js App Router, TypeScript, modular SCSS, and GSAP + ScrollTrigger.",
    capabilities: [
      "React 19 & Next.js App Router (Turbopack)",
      "TypeScript & modular SCSS / Sass design tokens",
      "GSAP 3 & ScrollTrigger scroll animations",
      "Responsive layouts across mobile, tablet & desktop",
      "Semantic HTML & keyboard navigation",
    ],
    tags: [
      "React 19",
      "Next.js App Router",
      "TypeScript",
      "SCSS Modules",
      "Tailwind CSS",
      "GSAP + ScrollTrigger",
      "Motion",
    ],
  },
  {
    index: "03",
    label: "03 — UI/UX DESIGN",
    title: "UI/UX Design",
    text: "Editorial typography, three-layer design token systems, wireframing, component composition, and high-contrast interfaces.",
    capabilities: [
      "Editorial typography & visual hierarchy",
      "3-layer design tokens (primitive, semantic, component)",
      "Wireframing & reusable component patterns",
      "Hover states, transitions & scroll motion",
      "Accessible contrast & reduced-motion support",
    ],
    tags: [
      "Editorial Typography",
      "Design Tokens",
      "Wireframing",
      "Component Systems",
      "Micro-Interactions",
      "Accessibility",
    ],
  },
];
