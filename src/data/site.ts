export const site = {
  firstName: "Chetan",
  lastName: "Walkoli",
  wordmark: "Chetan W.",
  role: "Computer Engineering student",
  year: "Third Year",
  college: "Dr. D. Y. Patil Institute of Technology",
  city: "Pune",
  country: "India",
  locationLine: "Based in India · Pune",
  presenceLabel: "01 / Presence",
  roleLine: "Engineer. Builder. Learner.",
  disciplines: ["Embedded / IoT", "AI / ML", "Web & Backend"],
  intro:
    "I build connected products, from circuits to code, and learn in public along the way.",
  tagline: "Ideas are a start.",
  taglineItalic: "This is the work.",
  processHeadline: "How I work",
  processItalic: "across the stack.",
  journeyHeadline: "Learning in public.",
  journeyItalic: "Building in Pune.",
  contactHeadline: "Something great starts",
  contactItalic: "with a hello.",
  currently: "Building connected products at the edge of hardware and software.",
  buildingLine: "BUILDING SINCE 2022",
  email: "", // TODO: add a public email
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
} as const;

export const navItems = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
] as const;
