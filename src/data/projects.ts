export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  href?: string;
  repo?: string;
  featured: boolean;
  badge?: string;
  preview?: string;
  notes?: string;
};

export const projects: Project[] = [
  {
    slug: "apexthink",
    title: "ApexThink",
    category: "AI / Developer tools",
    description:
      "AI codebase understanding — dependency graphs and repository chat, built during DEVCLASH at DYPIT.",
    featured: true,
    badge: "Hackathon",
    notes:
      "TODO: add public GitHub and Vercel URLs (LinkedIn post used shortened lnkd.in links).",
  },
  {
    slug: "atmos",
    title: "ATMOS",
    category: "Web / Weather",
    description:
      "A weather app focused on a clear, fast read of conditions — live on Vercel.",
    href: "https://atmos-five-rho.vercel.app",
    repo: "https://github.com/ChetanWalkoli/ATMOS",
    featured: true,
    notes: "TODO: add a product screenshot for the browser-frame preview.",
  },
  {
    slug: "linklyst",
    title: "Linklyst",
    category: "Web",
    description:
      "A public web project deployed on Vercel — one of the pieces I ship and iterate on in the open.",
    href: "https://linklyst-theta.vercel.app",
    repo: "https://github.com/ChetanWalkoli/Linklyst",
    featured: true,
    notes: "TODO: add a product screenshot and a two-line product story.",
  },
  {
    slug: "cafedesk",
    title: "CafeDesk",
    category: "Web",
    description:
      "A deployed web app exploring product UI and everyday workflows.",
    href: "https://cafedesk-dun.vercel.app",
    repo: "https://github.com/ChetanWalkoli/cafedesk",
    featured: false,
    notes: "TODO: add screenshot and tighter product copy.",
  },
  {
    slug: "interview-ai",
    title: "Interview Ai",
    category: "AI / Web",
    description: "An interview-prep experiment on GitHub.",
    repo: "https://github.com/ChetanWalkoli/Interview-Ai",
    featured: false,
    notes: "TODO: add live URL if deployed, plus a screenshot.",
  },
  {
    slug: "toki",
    title: "TOKI",
    category: "Web",
    description: "A JavaScript project shipped in public on GitHub.",
    repo: "https://github.com/ChetanWalkoli/TOKI",
    featured: false,
    notes: "TODO: add description, live URL, and screenshot.",
  },
  {
    slug: "mark-45",
    title: "MARK-45",
    category: "AI",
    description: "A personal AI assistant project.",
    repo: "https://github.com/ChetanWalkoli/MARK-45",
    featured: false,
  },
  {
    slug: "travelsphere",
    title: "TravelSphere AI",
    category: "AI / Product",
    description:
      "AI travel companion — itinerary planning, safety intelligence, offline and multilingual, India-focused.",
    featured: false,
    badge: "TODO",
    notes: "TODO: confirm GitHub, live URL, and screenshots. Not found on the public GitHub profile.",
  },
  {
    slug: "rubble-robot",
    title: "Rubble Victim Search Robot",
    category: "Hardware / Robotics",
    description:
      "Tracked chassis, servo neck, CO2 human detection, LED beacon drop — Arduino Mega.",
    featured: false,
    badge: "Hardware",
    notes: "TODO: add photos, a short clip, and any write-up or repo.",
  },
  {
    slug: "esp32-cam",
    title: "ESP32-CAM Smart Security",
    category: "IoT / Embedded",
    description: "PIR-triggered Telegram alerts from an ESP32-CAM node.",
    featured: false,
    notes: "TODO: add repo, photos, and a demo clip.",
  },
  {
    slug: "smart-garbage",
    title: "IoT Smart Garbage Management",
    category: "IoT",
    description: "IoT waste-management system with patent documentation in progress.",
    featured: false,
    badge: "Patent",
    notes: "TODO: add documentation link, repo, and photos. Do not invent patent numbers.",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);
