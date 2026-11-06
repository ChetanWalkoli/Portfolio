export type SkillSubgroup = {
  label: string;
  items: string[];
};

export type SkillCategory = {
  id: string;
  row: string;
  title: string;
  groups: SkillSubgroup[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    row: "01",
    title: "Frontend Engineering",
    groups: [
      {
        label: "Frameworks & Bundlers",
        items: ["React 19", "Next.js 16", "Vite"],
      },
      {
        label: "Languages",
        items: ["TypeScript", "JavaScript (ES6+)", "HTML5"],
      },
      {
        label: "Styling & Motion",
        items: [
          "SCSS / Sass",
          "CSS3",
          "Tailwind CSS",
          "GSAP 3 + ScrollTrigger",
          "Motion",
        ],
      },
    ],
  },
  {
    id: "backend",
    row: "02",
    title: "Backend & Databases",
    groups: [
      {
        label: "Runtime & Frameworks",
        items: ["Node.js", "Express 5", "Next.js Route Handlers"],
      },
      {
        label: "Real-Time & APIs",
        items: [
          "RESTful APIs",
          "Socket.IO",
          "WebSockets",
          "ZegoCloud WebRTC UIKit",
        ],
      },
      {
        label: "Databases & ORMs",
        items: ["PostgreSQL", "Supabase", "Prisma ORM", "MongoDB", "Mongoose"],
      },
      {
        label: "Security & Auth",
        items: ["JWT Auth", "NextAuth"],
      },
    ],
  },
  {
    id: "ai-systems",
    row: "03",
    title: "AI & Systems Engineering",
    groups: [
      {
        label: "AI & LLMs",
        items: ["Google Gemini API", "Structured JSON Prompting"],
      },
      {
        label: "Validation & Reliability",
        items: [
          "Zod Validation",
          "IP Rate Limiting",
          "In-Memory Caching",
          "Base62 Short-Code Retry Logic",
        ],
      },
      {
        label: "Document Processing",
        items: ["Multer + pdf-parse", "PDFKit", "QRCode Generation"],
      },
    ],
  },
  {
    id: "tools-workflow",
    row: "04",
    title: "Tools, Testing & Workflow",
    groups: [
      {
        label: "Testing & DevOps",
        items: ["Vitest", "Testing Library", "Docker", "Vercel"],
      },
      {
        label: "Tools & Design",
        items: ["Git", "GitHub", "Postman", "VS Code", "UI/UX Design"],
      },
    ],
  },
];

export const skills: string[] = [
  "React 19",
  "Next.js 16",
  "TypeScript",
  "JavaScript (ES6+)",
  "SCSS / Sass",
  "Tailwind CSS",
  "GSAP 3 + ScrollTrigger",
  "Motion",
  "Node.js",
  "Express 5",
  "Socket.IO",
  "ZegoCloud WebRTC",
  "PostgreSQL",
  "Supabase",
  "Prisma ORM",
  "MongoDB",
  "Mongoose",
  "NextAuth",
  "JWT Auth",
  "Google Gemini API",
  "Zod",
  "PDFKit",
  "Vitest",
  "Docker",
  "Vercel",
  "Git & GitHub",
];
