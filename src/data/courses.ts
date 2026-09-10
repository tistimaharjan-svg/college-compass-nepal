export type Course = {
  code: string;
  name: string;
  level: string;
  duration: string;
  description: string;
};

// DEMO DATA — indicative only, verify with the university before applying.
export const courses: Course[] = [
  {
    code: "BCA",
    name: "Bachelor of Computer Application",
    level: "Bachelor",
    duration: "4 years (8 semesters)",
    description:
      "Application-focused IT degree covering programming, web and mobile development, databases and project work.",
  },
  {
    code: "BIT",
    name: "Bachelor of Information Technology",
    level: "Bachelor",
    duration: "4 years (8 semesters)",
    description:
      "Blends software development with networking, systems and IT infrastructure management.",
  },
  {
    code: "BICTE",
    name: "Bachelor in Information Communication Technology Education",
    level: "Bachelor",
    duration: "4 years (8 semesters)",
    description:
      "Prepares students to teach ICT at school level, combining computing subjects with education theory.",
  },
  {
    code: "BSc CSIT",
    name: "Bachelor of Science in Computer Science and Information Technology",
    level: "Bachelor",
    duration: "4 years (8 semesters)",
    description:
      "Theory-heavy computing degree covering algorithms, operating systems, AI and software engineering.",
  },
  {
    code: "BIM",
    name: "Bachelor of Information Management",
    level: "Bachelor",
    duration: "4 years (8 semesters)",
    description:
      "Mix of IT and management, suited for students aiming at business analysis and IT management roles.",
  },
  {
    code: "BBA",
    name: "Bachelor of Business Administration",
    level: "Bachelor",
    duration: "4 years (8 semesters)",
    description:
      "General management degree covering marketing, finance, human resources and entrepreneurship.",
  },
  {
    code: "BBM",
    name: "Bachelor of Business Management",
    level: "Bachelor",
    duration: "4 years (8 semesters)",
    description: "Practice-oriented management program with a focus on business operations.",
  },
  {
    code: "BBS",
    name: "Bachelor of Business Studies",
    level: "Bachelor",
    duration: "4 years (annual system)",
    description:
      "Affordable and widely available management degree, popular with working students.",
  },
];
