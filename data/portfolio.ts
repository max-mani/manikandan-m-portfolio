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

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  keyFeatures?: string[];
  github?: string;
  live?: string;
  image?: string;
}

export interface SkillsData {
  categories: {
    [key: string]: Array<{ name: string; level: string; percentage?: number }>;
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
  intro: "Welcome to my portfolio. Type 'help' in the terminal to get started.",
  description: "Pre-final year Computer Science and Engineering student with strong hands-on experience in full-stack web development, mobile application development, AI-driven systems, and cybersecurity. Passionate about building scalable, real-world solutions across road safety, intelligent automation, and secure application architectures. Actively engaged in Capture The Flag (CTF) competitions, application security research, and reverse engineering. HackX CTF 2025 – 2nd Place Winner.",
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
  bio: "I am a pre-final year Computer Science and Engineering student at Kumaraguru College of Technology with a strong interest in cybersecurity, application security, artificial intelligence, and full-stack application development. I enjoy working on real-world problem statements where software engineering intersects with security, automation, and social impact.",
  details: [
    "I have developed production-grade web and mobile applications, AI-based accident detection systems, and security-focused projects including vulnerability scanners and Capture The Flag (CTF) challenge solutions.",
    "My work spans domains such as road safety, fintech, digital public infrastructure, and secure application design.",
    "As an executive member of the Aeromodelling Club, I have contributed to drone technology initiatives and hands-on engineering projects, strengthening my teamwork, leadership, and applied problem-solving skills.",
    "I actively participate in hackathons and national-level CTF competitions, continuously improving my expertise in application security, reverse engineering, binary exploitation, cryptography, and system-level analysis.",
    "I am seeking opportunities to grow as a software developer and application security professional in challenging, impact-driven environments."
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
    "Application Security Analyst with hands-on experience in ethical hacking and vulnerability assessment",
    "HackX CTF 2025 – 2nd Place Winner",
    "Experienced in reverse engineering, binary exploitation, cryptography, and OSINT",
    "Builder of security-focused systems including AI-driven detection platforms and secure application architectures",
    "Continuously strengthening skills through CTFs, hackathons, and real-world projects"
  ]
};

// Projects
export const projects: Project[] = [
  {
    id: "uyir",
    name: "Uyir – AI-Based Road Accident Detection System",
    description: "Real-time road accident detection system using surveillance cameras and AI. Automatically detects accidents and sends alerts to 108 emergency services and nearby ambulance drivers through a Flutter-based dashboard.",
    technologies: ["Python", "FastAPI", "OpenCV", "Firebase", "Flutter", "Google Maps API"],
    keyFeatures: [
      "Real-time accident detection from images and video",
      "AI-based severity analysis",
      "Firebase push notifications",
      "Live location tracking and ambulance coordination",
      "Police and emergency response dashboard"
    ],
    github: "https://github.com/max-mani/Kapaan"
  },
  {
    id: "koreconnect",
    name: "Hot Kore (KoreConnect) – Canteen Food Ordering Platform",
    description: "A full-stack food ordering and management platform designed for college canteens, enabling students to place orders online while providing admins with real-time order and menu management.",
    technologies: ["MongoDB", "Express.js", "React", "Node.js"],
    keyFeatures: [
      "User authentication and role-based access",
      "Menu and price management",
      "Cart and order placement system",
      "Order tracking and admin dashboard",
      "Responsive UI for mobile and desktop"
    ],
    live: "https://koreconnect.netlify.app/",
    github: "https://github.com/max-mani/KoreConnect"
  },
  {
    id: "kmrl",
    name: "KMRL – Kochi Metro Rail Limited Digital Platform",
    description: "A comprehensive digital platform built to modernize metro rail operations using real-time monitoring, digital twin technology, IoT integration, and AI-driven analytics. Designed to support fleet optimization, predictive maintenance, and passenger services.",
    technologies: ["Node.js", "Express.js", "TypeScript", "MongoDB", "Socket.io", "JWT", "Next.js 14", "React 18", "Tailwind CSS", "Shadcn/UI", "Chart.js", "Framer Motion"],
    keyFeatures: [
      "Real-time train, station, and passenger monitoring",
      "AI-powered fleet optimization and scheduling",
      "Digital twin with interactive 3D visualization",
      "Predictive maintenance using machine learning",
      "IoT sensor data ingestion and analytics",
      "Real-time alerts and notifications",
      "What-if simulation scenarios",
      "Secure authentication and role-based access"
    ],
    live: "https://kmrl-fleet-optimization.netlify.app/",
    github: "https://github.com/max-mani/KMRL",
    image: "/assets/projects/kmrl.png"
  },
  {
    id: "rti-assistant",
    name: "RTI Assistant – AI-Powered RTI Application Generator",
    description: "An end-to-end AI-powered web application that helps users draft, refine, and export Indian RTI (Right to Information) applications. The system guides users through missing information and generates legally structured RTI drafts.",
    technologies: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Radix UI", "Node.js", "Express", "MongoDB", "JWT (httpOnly cookies)", "Google Gemini API"],
    keyFeatures: [
      "AI-powered RTI drafting using Gemini",
      "Guided clarification for missing details",
      "Editable generated RTI drafts",
      "Multi-language support (English, Hindi, Tamil, etc.)",
      "Export as TXT, PDF, and DOCX",
      "Secure authentication and protected routes",
      "Dark / Light mode with accessibility focus"
    ],
    github: "https://github.com/max-mani/RTI-Application-Generator",
    image: "/assets/projects/rti-assistant.png"
  },
  {
    id: "student-grouping",
    name: "Smart Team Formation System (Student Grouping System)",
    description: "An AI-driven web application that automatically forms optimal student teams using clustering algorithms based on skills, performance, and compatibility. Intended for educational institutions and project-based courses.",
    technologies: ["React 18", "TypeScript", "Tailwind CSS", "Vite", "Node.js", "Express", "TypeScript", "Multer", "Python", "scikit-learn", "pandas", "matplotlib", "seaborn"],
    keyFeatures: [
      "AI-based team formation using K-Means clustering",
      "CSV upload with drag-and-drop interface",
      "Skill and performance analysis",
      "PCA and elbow method visualizations",
      "Real-time processing with progress indicators",
      "Downloadable PDF reports",
      "Data cleaning and validation pipeline"
    ],
    github: "https://github.com/max-mani/Student-Grouping-System",
    image: "/assets/projects/student-grouping.png"
  },
  {
    id: "cgpa",
    name: "CGPA & SGPA Calculator – KCT CSE",
    description: "A modern web application to calculate SGPA and CGPA for students of Kumaraguru College of Technology (KCT), Computer Science & Engineering department, based on the official curriculum.",
    technologies: ["Next.js (App Router)", "TypeScript", "React", "Tailwind CSS", "Shadcn UI", "pnpm"],
    keyFeatures: [
      "Semester-wise SGPA calculation",
      "Overall CGPA calculation",
      "Preloaded official KCT CSE curriculum",
      "Supports electives, audit, and mandatory courses",
      "Mobile-friendly and responsive UI",
      "Clean, branded design with KCT styling"
    ],
    live: "https://kct-cse-cgpa-calculator.netlify.app/",
    github: "https://github.com/max-mani/cgpa"
  }
];

// Skills
export const skills: SkillsData = {
  categories: {
    "Programming Languages": [
      { name: "Python", level: "Advanced", percentage: 85 },
      { name: "JavaScript", level: "Intermediate", percentage: 75 },
      { name: "TypeScript", level: "Intermediate", percentage: 75 },
      { name: "Dart", level: "Advanced", percentage: 80 },
      { name: "C / C++", level: "Foundational", percentage: 60 },
      { name: "SQL", level: "Intermediate", percentage: 70 }
    ],
    "Web & Mobile Development": [
      { name: "Flutter", level: "Advanced", percentage: 85 },
      { name: "Next.js", level: "Intermediate", percentage: 75 },
      { name: "React.js", level: "Intermediate", percentage: 75 },
      { name: "Node.js & Express.js", level: "Intermediate", percentage: 75 },
      { name: "RESTful API Design & Integration", level: "Advanced", percentage: 80 },
      { name: "HTML5 / CSS3 / Tailwind CSS", level: "Intermediate", percentage: 75 },
      { name: "Firebase (Auth, Firestore, Cloud Functions)", level: "Intermediate", percentage: 75 }
    ],
    "AI / Machine Learning": [
      { name: "Machine Learning Fundamentals", level: "Intermediate", percentage: 70 },
      { name: "Computer Vision & Image Processing", level: "Intermediate", percentage: 75 },
      { name: "Accident Detection & Video Analytics", level: "Applied ML" },
      { name: "Model Training, Evaluation & Optimization" },
      { name: "Data Analysis with Pandas & NumPy" },
      { name: "scikit-learn", level: "Intermediate", percentage: 70 }
    ],
    "Cybersecurity": [
      { name: "Application Security", level: "Advanced", percentage: 80 },
      { name: "Ethical Hacking & Offensive Security", level: "Intermediate", percentage: 75 },
      { name: "Capture The Flag (CTF) Challenges", level: "Advanced", percentage: 80 },
      { name: "Reverse Engineering", level: "Intermediate", percentage: 70 },
      { name: "Binary Exploitation (Pwn)", level: "Intermediate", percentage: 70 },
      { name: "Web Exploitation", level: "Intermediate", percentage: 75 },
      { name: "Cryptography (CTF-focused)", level: "Intermediate", percentage: 70 },
      { name: "Linux Internals & Command-line Tooling", level: "Advanced", percentage: 80 }
    ],
    "Tools & Platforms": [
      { name: "Git & GitHub", level: "Advanced" },
      { name: "Docker", level: "Foundational" },
      { name: "Linux", level: "Advanced" },
      { name: "GDB, Radare2, Objdump (Reverse Engineering)" },
      { name: "Burp Suite, Nmap (Security Testing)" },
      { name: "Postman (API Testing)" },
      { name: "VS Code, Android Studio" }
    ],
    "Soft Skills": [
      { name: "Problem Solving & Analytical Thinking" },
      { name: "Team Collaboration & Leadership" },
      { name: "Rapid Learning & Adaptability" },
      { name: "Technical Documentation" },
      { name: "Competitive Mindset (Hackathons & CTFs)" }
    ]
  }
};

// Experience
export const experience: Experience[] = [
  {
    id: "aeromodelling",
    company: "Aeromodelling Club",
    role: "Executive Member",
    period: "October 2024 – February 2025",
    description: [
      "Actively worked on drone technology and aeromodelling projects, contributing to hands-on design, experimentation, and technical learning initiatives within the club.",
      "Participated in multiple drone-based innovation and experimentation projects",
      "Assisted in organizing and conducting technical workshops and demonstrations",
      "Collaborated with team members on aeromodelling design and testing",
      "Strengthened teamwork, coordination, and leadership skills"
    ],
    image: "/assets/experience/aeromodelling.png"
  },
  {
    id: "uyir",
    company: "UYIR Road Safety Project",
    role: "AI Model Developer",
    period: "February 2025 – Present",
    description: [
      "Serving as an AI Model Developer for the UYIR Road Safety Project, a government-backed initiative focused on improving road safety through real-time accident detection using artificial intelligence.",
      "Designed and developed machine learning models for real-time road accident detection",
      "Built and optimized the end-to-end accident detection pipeline",
      "Integrated AI models with mobile and web-based dashboards",
      "Enabled real-time alerts and notifications for emergency response systems",
      "Received recognition at a national-level hackathon for project impact"
    ],
    technologies: ["Python", "FastAPI", "OpenCV", "Machine Learning", "Flutter", "Firebase"],
    image: "/assets/experience/uyir.png"
  },
  {
    id: "aayiram",
    company: "RedGoldCrew",
    role: "Founder & Lead Developer",
    period: "November 2025 – January 2026",
    description: [
      "Founded RedGoldCrew, a product-focused development team that designed, built, and launched Aayiram, a finance and expense tracking mobile application. The app automatically reads transactional SMS messages from users' devices and converts them into structured, categorized expense records, enabling seamless and hands-free financial tracking.",
      "Founded and led RedGoldCrew, the core team responsible for the conception, development, and launch of Aayiram",
      "Architected and implemented automatic SMS-based transaction detection and parsing",
      "Designed the expense categorization and tracking engine for accurate financial insights",
      "Led the team's growth from an initial founding group to 6 active contributors",
      "Oversaw end-to-end product delivery, including development, testing, and deployment",
      "Successfully published and maintained the application on the Google Play Store",
      "Delivered a production-ready application currently live and available to public users"
    ],
    technologies: [".NET MAUI", "C#", "SMS Parsing"],
    image: "/assets/aayiram.png"
  }
];

// CTF Challenges
export const ctfs: CTF[] = [
  {
    id: "hackx",
    name: "HackX CTF 2025",
    platform: "HackX",
    achievements: ["2nd Place"],
    year: "2025",
    description: "Secured 2nd place in HackX CTF 2025, a competitive cybersecurity contest focused on practical offensive and defensive security skills across multiple domains.",
    domains: ["Reverse Engineering", "Binary Exploitation (Pwn)", "Cryptography", "Linux Internals", "OSINT"],
    image: "/assets/ctf/hackx.png"
  },
  {
    id: "tamil-nadu-hackathon",
    name: "Tamil Nadu Hackathon 2025 CTF",
    platform: "IIT Madras",
    achievements: ["Participant"],
    year: "2025",
    description: "Participated in the Capture The Flag competition conducted during Tamil Nadu Hackathon 2025 at IIT Madras. This marked my first exposure to a large-scale, national-level academic CTF event.",
    ranking: "First on-site CTF experience at IIT Madras"
  },
  {
    id: "cipher-chase",
    name: "Cipher Chase CTF (Synergy '25)",
    platform: "IIIT Bangalore | Unstop",
    achievements: ["Top 10 Finish"],
    year: "2025",
    description: "Achieved a Top 10 ranking in the Cipher Chase 24-hour CTF competition organized by IIIT Bangalore as part of Synergy '25. One of the most challenging endurance-based CTFs participated in.",
    domains: ["Reverse Engineering", "Web Exploitation", "Binary Exploitation (Pwn)", "Cryptography", "Forensics", "Steganography", "Machine Learning Security"],
    ranking: "Top 10 teams"
  },
  {
    id: "yukthi",
    name: "Yukthi CTF 2.0",
    platform: "Tamil Nadu Police Cyber Talent Hunt",
    achievements: ["Top 33 (Finals)", "Top 50 (Prelims)"],
    year: "2025",
    description: "Participated in Yukthi CTF 2.0, a large-scale cybersecurity talent hunt organized by the Tamil Nadu Police. Successfully advanced through prelims and reached the offline finals.",
    ranking: "Top 33 teams (Finals), Top 50 teams (Prelims)"
  },
  {
    id: "hackerverse",
    name: "Hackerverse CTF",
    platform: "Hackerverse",
    achievements: ["84 out of 2939 participants", "718 points"],
    year: "2024",
    description: "Participated in Hackerverse CTF as my first formal Capture The Flag competition, marking the beginning of my hands-on cybersecurity journey.",
    ranking: "84 out of 2939 participants"
  }
];

// Certifications
export const certifications: Certification[] = [
  {
    id: "cnsp",
    name: "Certified Network Security Practitioner (CNSP)",
    issuer: "SecOps Group",
    date: "2025",
    level: "Entry-Level",
    description: "Certified Network Security Practitioner (CNSP) is an entry-level certification that validates foundational knowledge of network security concepts, protocols, and common attack surfaces across enterprise environments."
  },
  {
    id: "cap",
    name: "Certified AppSec Practitioner (CAP)",
    issuer: "SecOps Group",
    date: "2025",
    level: "Entry-Level",
    description: "Certified AppSec Practitioner (CAP) validates foundational understanding of application security principles, common web vulnerabilities, and secure coding practices aligned with industry standards such as OWASP."
  },
  {
    id: "htb-cpts",
    name: "HTB Certified Penetration Testing Specialist (HTB CPTS)",
    issuer: "Hack The Box",
    date: "2025",
    level: "Intermediate (Hands-on, Practical)",
    status: "In Progress",
    description: "HTB Certified Penetration Testing Specialist (CPTS) is a highly practical, industry-focused penetration testing certification. It emphasizes real-world attack simulation, vulnerability chaining, and professional-grade reporting."
  }
];

// Contact
export const contact: ContactData = {
  email: "19manikandan2005@gmail.com",
  social: {
    github: "https://github.com/Manikandan-M",
    linkedin: "https://www.linkedin.com/in/19manikandan-m",
    portfolio: "https://maxmani/"
  }
};
