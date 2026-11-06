export type ProjectSolutionPoint = {
  title: string;
  detail: string;
};

export type Project = {
  number: string;
  slug: string;
  title: string;
  titlePrimary: string;
  titleAccent?: string;
  category: string;
  description: string;
  problem: string;
  solutions: ProjectSolutionPoint[];
  techStack: string[];
  href: string;
  repo: string;
  caseStudyPath: string;
  featured: boolean;
  preview?: string;
  caseStudy: {
    overview: string;
    problem: string;
    solution: string;
    keyFeatures: string[];
    challenges: string[];
  };
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "linklyst",
    title: "LINKLYST",
    titlePrimary: "LINKLYST",
    category: "URL SHORTENER & ANALYTICS",
    description:
      "A URL shortener and link manager built with Next.js, Prisma, and PostgreSQL. Supports custom short codes, QR code downloads, and click analytics.",
    problem:
      "Long URLs are hard to share and track, while basic URL shorteners run into code collisions under concurrent requests and slow database queries on frequent redirects.",
    solutions: [
      {
        title: "Base62 Short-Code Generator",
        detail:
          "Generates compact short codes backed by PostgreSQL unique constraints and bounded retry logic to avoid collisions.",
      },
      {
        title: "In-Memory Caching",
        detail:
          "Caches frequently accessed short codes in memory so GET /[shortCode] redirects resolve without waiting on a database round-trip.",
      },
      {
        title: "Rate Limiting & Validation",
        detail:
          "Protects link creation routes with IP rate limiting and Zod URL schema validation.",
      },
      {
        title: "Click Analytics & QR Codes",
        detail:
          "Tracks click events (/api/analytics), manages user links with NextAuth, exports QR codes, and runs automated tests with Vitest.",
      },
    ],
    techStack: [
      "Next.js",
      "Prisma ORM",
      "PostgreSQL",
      "Supabase",
      "NextAuth",
      "Tailwind CSS",
      "Zod",
      "QRCode",
      "Vitest",
      "Docker",
    ],
    href: "https://linklyst-theta.vercel.app/",
    repo: "https://github.com/ChetanWalkoli/Linklyst",
    caseStudyPath: "/projects/linklyst",
    featured: true,
    caseStudy: {
      overview:
        "Linklyst is a URL shortening and link management app built with Next.js App Router, Prisma ORM, and PostgreSQL.",
      problem:
        "Long URLs are hard to share and track, while basic URL shorteners run into code collisions under concurrent requests and slow database queries on frequent redirects.",
      solution:
        "Built a Base62 short-code generator backed by PostgreSQL unique constraints and bounded retries, an in-memory redirect cache, IP rate limiting, QR code exports, and click tracking.",
      keyFeatures: [
        "Base62 short-code generation and custom aliases",
        "HTTP redirection backed by an in-memory lookup cache",
        "Click tracking and analytics endpoint (/api/analytics)",
        "Downloadable QR codes for shortened links",
        "NextAuth user sign-in and link management",
        "Unit and integration tests running on Vitest",
      ],
      challenges: [
        "Preventing short-code collisions under concurrent requests using PostgreSQL unique constraints and bounded retries.",
        "Applying IP rate limits and Zod URL validation without slowing down redirect routes.",
      ],
    },
  },
  {
    number: "02",
    slug: "icognito",
    title: "ICOGNITO",
    titlePrimary: "ICOGNITO",
    category: "ANONYMOUS LIVE VIDEO & CHAT",
    description:
      "An anonymous 1-on-1 video and text chat app split into two services: a Next.js 16 frontend and a standalone Node.js + Socket.IO matchmaking server.",
    problem:
      "Starting a quick video conversation online usually requires account sign-ups, personal identity exposure, and manual room links.",
    solutions: [
      {
        title: "Socket.IO Matchmaking Queue",
        detail:
          "Manages an in-memory waitingQueue and activePairs map on the standalone Node.js signaling server.",
      },
      {
        title: "Event-Driven Room Lifecycle",
        detail:
          "Handles create-room, waiting, matched, next, partner-left, and disconnect socket events, creating a UUIDv4 room when two users match.",
      },
      {
        title: "WebRTC Video & Text",
        detail:
          "Loads @zegocloud/zego-uikit-prebuilt on the client in OneONoneCall mode (maxUsers: 2) to avoid Next.js SSR window errors, with per-session crypto.randomUUID() IDs and instant partner switching.",
      },
    ],
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Node.js",
      "Socket.IO",
      "ZegoCloud UIKit",
      "Motion",
      "Tailwind CSS",
    ],
    href: "https://incognito.chetanwalkoli.in/",
    repo: "https://github.com/ChetanWalkoli/Icognito",
    caseStudyPath: "/projects/icognito",
    featured: true,
    caseStudy: {
      overview:
        "Icognito is a 1-on-1 anonymous video and text chat web app with a Next.js 16 frontend (web/) and a standalone Node.js + Socket.IO signaling server (socket/).",
      problem:
        "Starting a quick video conversation online usually requires account sign-ups, personal identity exposure, and manual room links.",
      solution:
        "Built a no-login matchmaking queue that pairs connected sockets in memory, creates a UUIDv4 room on match, and opens a 1-on-1 WebRTC video and text call via ZegoCloud UIKit.",
      keyFeatures: [
        "Anonymous 1-on-1 video and text chat with no sign-up",
        "Socket.IO matchmaking queue with UUIDv4 room creation",
        "Instant Next partner switching and disconnect cleanup",
        "Per-session ephemeral IDs generated with crypto.randomUUID()",
      ],
      challenges: [
        "Cleaning up rooms and notifying the partner reliably when a user clicks Next or closes the tab.",
        "Loading the ZegoCloud WebRTC SDK only on the client so Next.js SSR does not fail on window references.",
      ],
    },
  },
  {
    number: "03",
    slug: "interview-ai",
    title: "INTERVIEW ai",
    titlePrimary: "INTERVIEW",
    titleAccent: "ai",
    category: "PREPARATION & EVALUATION PLATFORM",
    description:
      "A mock interview and resume evaluation app with a React 19 + Vite + SCSS frontend and an Express 5 + MongoDB + Google Gemini backend.",
    problem:
      "Job candidates usually practice with generic question lists that ignore their actual resume projects, target job description, and specific skill gaps.",
    solutions: [
      {
        title: "Resume PDF Extraction",
        detail:
          "Uses in-memory Multer uploads and pdf-parse on the Express 5 backend to extract plain text from candidate PDF resumes.",
      },
      {
        title: "Structured Gemini Output",
        detail:
          "Calls @google/genai with Zod output schemas to compare a resume against a job description and return a match score, technical questions, behavioral questions, skill gaps, and a study plan.",
      },
      {
        title: "Answer Evaluation",
        detail:
          "Scores candidate answers against each question and saves feedback in MongoDB with JWT cookie authentication.",
      },
      {
        title: "Server-Side Resume Builder",
        detail:
          "Uses PDFKit on the server to generate downloadable PDF resumes.",
      },
    ],
    techStack: [
      "React 19",
      "Vite",
      "SCSS",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Mongoose",
      "Google Gemini",
      "PDFKit",
      "JWT Auth",
      "Zod",
    ],
    href: "https://interviewai.chetanwalkoli.in/",
    repo: "https://github.com/ChetanWalkoli/Interview-Ai",
    caseStudyPath: "/projects/interview-ai",
    featured: true,
    caseStudy: {
      overview:
        "Interview AI is a full-stack interview preparation app with a React 19 + Vite + SCSS frontend (Frontend/) and an Express 5 + MongoDB + Google Gemini backend (Backend/).",
      problem:
        "Job candidates usually practice with generic question lists that ignore their actual resume projects, target job description, and specific skill gaps.",
      solution:
        "Built a workflow where candidates upload a PDF resume and a target job description to generate role-specific interview questions, submit answers for scoring, and export clean PDF resumes.",
      keyFeatures: [
        "PDF resume upload and text extraction with Multer and pdf-parse",
        "Match scores, technical and behavioral questions, and skill-gap reports via Google Gemini",
        "Answer submission and per-question scoring and feedback",
        "Saved interview reports in MongoDB with JWT cookie authentication",
        "Downloadable PDF resume generator built with PDFKit",
      ],
      challenges: [
        "Validating structured JSON responses from Google Gemini calls with Zod schemas.",
        "Sanitizing user inputs and handling corrupted PDF uploads in memory without crashing the server.",
      ],
    },
  },
];

export const featuredProjects = projects;
export const moreProjects: Project[] = [];
