export type Discipline = {
  index: string;
  label: string;
  title: string;
  text: string;
  tags: string[];
};

export const disciplines: Discipline[] = [
  {
    index: "01",
    label: "Hardware",
    title: "Embedded & IoT",
    text: "Sensors, microcontrollers, and the quiet work of making a device reliable in the real world — from PIR nodes to tracked chassis.",
    tags: ["Arduino", "ESP32", "C / C++", "Sensors"],
  },
  {
    index: "02",
    label: "Intelligence",
    title: "AI / ML",
    text: "Using models where they earn their place: codebase chat, interview practice, a travel companion, a personal assistant.",
    tags: ["LLMs", "Python", "Applied ML"],
  },
  {
    index: "03",
    label: "Software",
    title: "Web & Backend",
    text: "Product UI, APIs, and deploys. JavaScript through the stack, shipped on Vercel, iterated in public.",
    tags: ["React", "Node.js", "Express", "Vercel"],
  },
];
