export type SocialId = "github" | "linkedin" | "leetcode" | "email";

export type Social = {
  id: SocialId;
  label: string;
  href: string;
  external: boolean;
};

export const socials: Social[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/ChetanWalkoli",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/chetan-walkoli-b8a786328/",
    external: true,
  },
  {
    id: "leetcode",
    label: "LeetCode",
    href: "https://leetcode.com/u/rKolTYnEcR/",
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:chetanwalkoli45@gmail.com",
    external: false,
  },
];

export const primaryConversationHref =
  "https://www.linkedin.com/in/chetan-walkoli-b8a786328/";
