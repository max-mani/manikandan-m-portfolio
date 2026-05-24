// Portfolio data structure

export interface HeroData {
  name: string;
  title: string;
  intro: string;
  description: string;
  focusAreas: string[];
  skills: string[];
}

export interface AboutData {
  bio: string;
  details: string[];
  education: {
    degree: string;
    institution: string;
    period: string;
    status: string;
  };
  techStack: {
    [key: string]: string[];
  };
  summary: string[];
}

export type ProjectCategory =
  | 'Dev'
  | 'Cybersec'
  | 'AI'
  | 'Mobile'
  | 'Other';

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  keyFeatures?: string[];
  github?: string;
  live?: string;
  image?: string;
  categories?: ProjectCategory[];
  year?: string;
  featured?: boolean;
}

export interface SkillsData {
  categories: {
    [key: string]: string[];
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  technologies?: string[];
  image?: string;
}

export interface CTF {
  id: string;
  name: string;
  platform: string;
  achievements: string[];
  year: string;
  description?: string;
  image?: string;
  domains?: string[];
  ranking?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  level?: string;
  status?: string;
  description?: string;
}

export interface ContactData {
  email: string;
  social: {
    [key: string]: string;
  };
}

// Hero Section
export const hero: HeroData = {
  name: "MANIKANDAN M",
  title: "Full Stack & Mobile Application Developer | Application Security Analyst | Cybersecurity & AI Enthusiast",
  intro: "Welcome to my portfolio.",
  description:
    "Pre-final year CSE @ KCT. I build during the day and break at night. HackX CTF 2025 — 2nd place. The butterfly is a tribute. Currently making HTB CPTS happen.",
  focusAreas: [
    "Full Stack & Mobile Application Development",
    "Application Security & Ethical Hacking",
    "Capture The Flag (CTF) Competitions",
    "AI-driven Security & Automation Solutions",
    "Reverse Engineering & Binary Exploitation"
  ],
  skills: [
    "Flutter",
    "FastAPI",
    "Python",
    "JavaScript",
    "TypeScript",
    "MongoDB",
    "Firebase",
    "Application Security",
    "Cybersecurity",
    "AI / Machine Learning"
  ]
};

// About Section
export const about: AboutData = {
  bio: "Pre-final year CSE @ KCT. I ship web and mobile apps, break things in CTFs, and chase problems where code and security actually meet.",
  details: [
    "Built production apps — Uyir (AI road safety), KMRL fleet platform, Aayiram on Play Store, and more.",
    "Work spans road safety, fintech, insurance flows, and incident response tooling.",
    "Executive member at the Aeromodelling Club — drones, workshops, hands-on builds.",
    "Regular at hackathons and national CTFs — reverse engineering, pwn, crypto, forensics.",
    "Open to internships, freelance, and CTF teams that move fast."
  ],
  education: {
    degree: "Bachelor of Engineering (B.E.) – Computer Science and Engineering",
    institution: "Kumaraguru College of Technology",
    period: "2023 – 2027",
    status: "Pre-final Year Student"
  },
  techStack: {
    "Frontend": ["Flutter", "HTML5", "CSS3", "JavaScript", "TypeScript"],
    "Backend": ["FastAPI", "Node.js", "Express.js", "RESTful APIs"],
    "Databases": ["MongoDB", "Firebase Firestore", "SQLite"],
    "Security": ["Application Security", "Ethical Hacking", "CTFs", "Reverse Engineering"],
    "AI / ML": ["Machine Learning Fundamentals", "Image Processing", "Computer Vision"],
    "Tools & Platforms": ["Git", "Linux", "Docker", "Firebase", "Google Maps API"]
  },
  summary: [
    "HackX CTF 2025 — 2nd place",
    "HTB CPTS in progress — labs every week",
    "Reverse engineering, pwn, crypto, forensics, OSINT",
    "Shipped AI safety, metro ops, and Play Store mobile apps",
    "Build by day, break by night — both halves feed each other"
  ]
};

export const footerTagline =
  "Pre-final year CSE @ KCT. Full-stack dev, appsec analyst, CTF player — building and breaking in equal measure.";

export const footerEasterEgg = "butterfly.exe is watching ✦";

// Projects — exactly 10
export const projects: Project[] = [
  {
    id: "uyir",
    name: "Uyir – AI-Based Road Accident Detection System",
    description:
      "Real-time road accident detection system using surveillance cameras and AI. Automatically detects accidents and sends alerts to 108 emergency services and nearby ambulance drivers through a Flutter-based dashboard.",
    technologies: ["Python", "FastAPI", "OpenCV", "Firebase", "Flutter", "Google Maps API"],
    github: "https://github.com/max-mani/Kapaan",
    categories: ["AI", "Mobile", "Dev"],
    year: "2025",
    featured: true
  },
  {
    id: "koreconnect",
    name: "Hot Kore (KoreConnect) – Canteen Food Ordering Platform",
    description:
      "A full-stack food ordering and management platform designed for college canteens, enabling students to place orders online while providing admins with real-time order and menu management.",
    technologies: ["MongoDB", "Express.js", "React", "Node.js"],
    live: "https://koreconnect.netlify.app/",
    github: "https://github.com/max-mani/KoreConnect",
    categories: ["Dev"],
    year: "2024"
  },
  {
    id: "kmrl",
    name: "KMRL – Kochi Metro Rail Limited Digital Platform",
    description:
      "A comprehensive digital platform built to modernize metro rail operations using real-time monitoring, digital twin technology, IoT integration, and AI-driven analytics. Designed to support fleet optimization, predictive maintenance, and passenger services.",
    technologies: ["Node.js", "Express.js", "TypeScript", "MongoDB", "Socket.io", "JWT"],
    live: "https://kmrl-fleet-optimization.netlify.app/",
    github: "https://github.com/max-mani/KMRL",
    categories: ["Dev", "AI"],
    year: "2025",
    featured: true
  },
  {
    id: "rti-assistant",
    name: "RTI Assistant – AI-Powered RTI Application Generator",
    description:
      "An end-to-end AI-powered web application that helps users draft, refine, and export Indian RTI (Right to Information) applications. The system guides users through missing information and generates legally structured RTI drafts.",
    technologies: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Radix UI", "Node.js", "Express"],
    github: "https://github.com/max-mani/RTI-Application-Generator",
    categories: ["Dev", "AI"],
    year: "2025",
    featured: true
  },
  {
    id: "student-grouping",
    name: "Smart Team Formation System (Student Grouping System)",
    description:
      "An AI-driven web application that automatically forms optimal student teams using clustering algorithms based on skills, performance, and compatibility. Intended for educational institutions and project-based courses.",
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Node.js", "Express"],
    github: "https://github.com/max-mani/Student-Grouping-System",
    categories: ["AI", "Dev"],
    year: "2024"
  },
  {
    id: "cgpa",
    name: "CGPA & SGPA Calculator – KCT CSE",
    description:
      "A modern web application to calculate SGPA and CGPA for students of Kumaraguru College of Technology (KCT), Computer Science & Engineering department, based on the official curriculum.",
    technologies: ["Next.js (App Router)", "TypeScript", "React", "Tailwind CSS", "Shadcn UI", "pnpm"],
    live: "https://kct-cse-cgpa-calculator.netlify.app/",
    github: "https://github.com/max-mani/cgpa",
    categories: ["Dev"],
    year: "2024"
  },
  {
    id: "tripoo",
    name: "Tripoo – Group Trip Planner",
    description:
      "Group-trip planner that turns a noisy WhatsApp thread into a real itinerary. Splits expenses live, vote-locks dates, and exports a single-page PDF you can hand to your mom before you leave.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    live: "https://tripoo.netlify.app/",
    categories: ["Dev", "Mobile"],
    year: "2026"
  },
  {
    id: "zerorespond",
    name: "ZeroRespond",
    description: "[USER TO FILL]",
    technologies: ["Web", "Dev", "Cybersec"],
    live: "https://zerorespond.netlify.app/",
    categories: ["Dev", "Cybersec"],
    year: "2026"
  },
  {
    id: "saar-insurance",
    name: "SAAR Insurance Portal",
    description: "[USER TO FILL]",
    technologies: ["Web", "Dev", "Mobile"],
    live: "https://saar-insurance.netlify.app/",
    categories: ["Dev", "Mobile"],
    year: "2026"
  },
  {
    id: "aayiram",
    name: "Aayiram – Smart Expense Tracker",
    description:
      "Production mobile app that automatically reads transactional SMS messages on the user's device and converts them into structured, categorized expense records for hands-free financial tracking. Published on Google Play Store.",
    technologies: [".NET MAUI", "C#", "SMS Parsing", "SQLite"],
    categories: ["Mobile", "Dev"],
    year: "2025",
    featured: true,
    live: "https://play.google.com/store/apps/dev?id=8965940044992315715"
  }
];

// Skills
export const skills: SkillsData = {
  categories: {
    "DAILY DRIVER": ["Python", "JavaScript", "TypeScript", "Dart"],
    "SHIPPED TO PRODUCTION": ["Flutter", "Next.js", "FastAPI", "Firebase", "MongoDB"],
    "SECURITY TOOLS": ["Burp Suite", "Nmap", "GDB", "Radare2", "Binwalk"],
    "CTF TOOLKIT": ["Steghide", "Binwalk", "Exiftool", "John", "Hashcat"]
  }
};

// Experience — exactly 3 entries
export const experience: Experience[] = [
  {
    id: "aeromodelling",
    company: "Aeromodelling Club",
    role: "Executive Member",
    period: "October 2024 – February 2025",
    description: [
      "Actively worked on drone technology and aeromodelling projects, contributing to hands-on design, experimentation, and technical learning initiatives within the club.",
      "Participated in multiple drone-based innovation projects",
      "Assisted in organizing technical workshops and demonstrations",
      "Collaborated on aeromodelling design and testing"
    ]
  },
  {
    id: "uyir",
    company: "UYIR Road Safety Project",
    role: "AI Model Developer",
    period: "February 2025 – Present",
    description: [
      "Serving as an AI Model Developer for the UYIR Road Safety Project, a government-backed initiative focused on improving road safety through real-time accident detection using AI.",
      "Designed and developed ML models for real-time accident detection",
      "Built and optimized the end-to-end accident detection pipeline",
      "Integrated AI models with mobile and web-based dashboards"
    ],
    technologies: ["Python", "FastAPI", "OpenCV", "Machine Learning", "Flutter", "Firebase"]
  },
  {
    id: "aayiram",
    company: "RedGoldCrew",
    role: "Founder & Lead Developer",
    period: "November 2025 – January 2026",
    description: [
      "Founded RedGoldCrew, a product-focused development team that designed, built, and launched Aayiram, a finance and expense tracking mobile application. The app automatically reads transactional SMS messages from users' devices and converts them into structured, categorized expense records.",
      "Founded and led RedGoldCrew through conception to launch",
      "Architected automatic SMS-based transaction detection and parsing",
      "Designed the expense categorization and tracking engine"
    ],
    technologies: [".NET MAUI", "C#", "SMS Parsing"]
  }
];

// CTF — exactly 5 trophies
export const ctfs: CTF[] = [
  {
    id: "hackx",
    name: "HackX CTF 2025",
    platform: "HackX",
    achievements: [],
    year: "2025",
    description:
      "Secured 2nd place in HackX CTF 2025, a competitive cybersecurity contest focused on practical offensive and defensive security skills across multiple domains.",
    ranking: "2nd Place",
    domains: [
      "Reverse Engineering",
      "Binary Exploitation (Pwn)",
      "Cryptography",
      "Linux Internals",
      "OSINT"
    ]
  },
  {
    id: "tamil-nadu-hackathon",
    name: "Tamil Nadu Hackathon 2025 CTF",
    platform: "IIT Madras",
    achievements: ["Participant"],
    year: "2025",
    description:
      "Participated in the CTF competition conducted during Tamil Nadu Hackathon 2025 at IIT Madras. First exposure to a large-scale national-level academic CTF event.",
    ranking: "Participant"
  },
  {
    id: "cipher-chase",
    name: "Cipher Chase CTF (Synergy '25)",
    platform: "IIIT Bangalore | Unstop",
    achievements: ["Top 10 Finish"],
    year: "2025",
    description:
      "Achieved a Top 10 ranking in the Cipher Chase 24-hour CTF organized by IIIT Bangalore as part of Synergy '25. One of the most challenging endurance-based CTFs participated in.",
    ranking: "Top 10 teams",
    domains: [
      "Reverse Engineering",
      "Web Exploitation",
      "Binary Exploitation (Pwn)",
      "Cryptography",
      "Forensics",
      "Steganography",
      "Machine Learning Security"
    ]
  },
  {
    id: "yukthi",
    name: "Yukthi CTF 2.0",
    platform: "Tamil Nadu Police Cyber Talent Hunt",
    achievements: ["Top 33 (Finals)", "Top 50 (Prelims)"],
    year: "2025",
    description:
      "Participated in Yukthi CTF 2.0, organized by the Tamil Nadu Police. Successfully advanced through prelims and reached the offline finals.",
    ranking: "Top 33 (Finals)"
  },
  {
    id: "hackerverse",
    name: "Hackerverse CTF",
    platform: "Hackerverse",
    achievements: ["84 out of 2939 participants", "718 points"],
    year: "2024",
    description:
      "Participated in Hackerverse CTF as my first formal Capture The Flag competition, marking the beginning of my hands-on cybersecurity journey.",
    ranking: "84 out of 2939"
  }
];

// Certifications — exactly 3
export const certifications: Certification[] = [
  {
    id: "cnsp",
    name: "Certified Network Security Practitioner (CNSP)",
    issuer: "SecOps Group",
    date: "2025",
    level: "Entry-Level",
    description:
      "Validates foundational knowledge of network security concepts, protocols, and common attack surfaces across enterprise environments."
  },
  {
    id: "cap",
    name: "Certified AppSec Practitioner (CAP)",
    issuer: "SecOps Group",
    date: "2025",
    level: "Entry-Level",
    description:
      "Validates foundational understanding of application security principles, common web vulnerabilities, and secure coding practices aligned with OWASP."
  },
  {
    id: "htb-cpts",
    name: "HTB Certified Penetration Testing Specialist (HTB CPTS)",
    issuer: "Hack The Box",
    date: "2025",
    level: "Intermediate",
    status: "In Progress",
    description:
      "A highly practical, industry-focused penetration testing certification. Emphasizes real-world attack simulation, vulnerability chaining, and professional-grade reporting."
  }
];

// Contact
export const contact: ContactData = {
  email: "19manikandan2005@gmail.com",
  social: {
    github: "https://github.com/max-mani",
    linkedin: "https://www.linkedin.com/in/19manikandan-m",
    portfolio: "https://maxmani.in/",
    leetcode: "https://leetcode.com/u/maxim2115/",
    hackthebox: "https://app.hackthebox.com/profile/",
    tryhackme: "https://tryhackme.com/p/maxmani",
    playstore: "https://play.google.com/store/apps/dev?id=8965940044992315715",
    resume: "/resume/manikandan-m-resume.pdf"
  }
};

// Stats / counters surfaced in the hero & about sections
export interface PortfolioStats {
  label: string;
  value: string;
  hint?: string;
}

export const stats: PortfolioStats[] = [
  {
    label: "CTF wins",
    value: "5+",
    hint: "HackX 2nd · Cipher Chase Top 10 · Yukthi Top 33"
  },
  {
    label: "Projects shipped",
    value: `${projects.length}+`,
    hint: "Web · Mobile · AI · AppSec"
  },
  {
    label: "Certifications",
    value: `${certifications.length}`,
    hint: "CNSP · CAP · HTB CPTS"
  },
  {
    label: "Years coding",
    value: "3+",
    hint: "Pre-final year B.E. CSE @ KCT"
  }
];
