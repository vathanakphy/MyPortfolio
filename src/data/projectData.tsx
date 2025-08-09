import { type Project } from "../types";
import { Award, Zap, Store, Leaf, Book, Terminal, School, Globe, CreditCard } from "lucide-react";

export const featuredProjects: Project[] = [
    {
      title: "Online Marketplace for Tech Products",
      icon: <Award className="text-amber-400" />,
      overview:
        "An e-commerce platform tailored for the Cambodian tech market, supporting local payment systems and other local services.",
      highlights: [
        "Real-time KHQR payments via Bakong",
        "Secure JWT-based authentication",
        "notifications via Telegram and SMS",
        "Admin dashboard for full product, sales, staff, and system management",
      ],
      contribution: [
        "Designed and developed the complete RESTful API and database schema.",
        "Integrated Bakong payment gateway, Telegram Bot, and third-party services.",
        "Developed responsive frontend.",
      ],

      stack: {
        Frontend: ["React", "TypeScript", "Tailwind CSS"],
        Backend: ["Node.js", "Express.js", "TypeScript"],
        Database: ["MySQL"],
        Others: ["JWT"],
      },
      projectType: "Full Stack",
      liveUrl: "#",
      frontendUrl: "https://computer-shop-beta.vercel.app/",
      backendUrl: "https://computer-shop-4sqx.onrender.com/api-docs/",
      codeUrl: "https://github.com/CPF-CADT/computer-shop",
    },
    {
      title: "Real-Time Multiplayer Quiz Platform",
      icon: <Zap className="text-yellow-400" />,
      overview:
        "A platform that supports real-time multiplayer quizzes with WebSocket communication and allows external system integration via API.",
      highlights: [
        "Real-time quiz gameplay using Socket.IO",
        "External systems can integrate via public API",
        "Admin dashboard with player stats",
      ],
      contribution: [
        "Implemented real-time WebSocket communication and RESTful API endpoints.",
        "Designed MongoDB schemas and integrated Redis for session synchronization.",
        "Added JWT-based authentication with role access control and rate limiting.",
      ],
      stack: {
        Frontend: ["React.js", "Tailwind CSS"],
        Backend: ["Express.js", "Socket.IO", "JWT"],
        Database: ["MongoDB", "Redis"],
        Others: ["Docker", "GitHub"],
      },
      projectType: "Full Stack",
      codeUrl: "https://github.com/CPF-CADT/QuizFun",
      inProgress: true,
    },
];

export const allProjects: Project[] = [
  {
    title: "Online Marketplace",
    icon: <Store className="text-amber-400" />,
    overview: "E-commerce platform with Bakong payments.",
    highlights: [
      "KHQR payments via Bakong",
      "JWT authentication",
      "Telegram order alerts",
      "Role-based access control",
    ],
    contribution: ["Lead Backend Developer"],
    stack: {
      Backend: ["Node.js", "Express.js", "MySQL"],
      Tools: ["JWT", "Telegram Bot API"],
    },
    projectType: "Full Stack",
    liveUrl: "#",
    frontendUrl: "https://computer-shop-beta.vercel.app/",
    backendUrl: "https://computer-shop-4sqx.onrender.com/api-docs/",
    codeUrl: "https://github.com/CPF-CADT/computer-shop",
  },
  {
    title: "Multiplayer Quiz App",
    icon: <Zap className="text-yellow-400" />,
    overview: "Real-time quiz app like Kahoot.",
    highlights: [
      "Socket.IO for real-time interaction",
      "Public trivia API integration",
      "MongoDB for session storage",
    ],
    contribution: ["Backend Architect"],
    stack: {
      Backend: ["Node.js", "Socket.IO", "MongoDB"],
    },
    projectType: "Backend",
    codeUrl: "https://github.com/CPF-CADT/QuizFun",
    inProgress: true,
  },
  {
    title: "EcoMind Game",
    icon: <Leaf className="text-green-500" />,
    overview:
      "Educational simulation game teaching AI and environmental care to kids.",
    highlights: [
      "No-code AI training gameplay",
      "Environmental missions (pollution, deforestation)",
      "Voice instructions & Khmer-English toggle",
      "DP & energy-based strategy loop",
    ],
    contribution: ["Game Logic Designer", "Frontend Developer"],
    stack: {
      Frontend: ["React", "Vite", "Tailwind CSS"],
      Tools: ["Vercel", "GitHub"],
    },
    projectType: "Frontend",
    liveUrl: "https://ecomind-d9tk.vercel.app/",
    codeUrl: "https://github.com/CPF-CADT/ecomind",
  },
  {
    title: "Online Course Platform",
    icon: <Book className="text-blue-500" />,
    overview:
      "E-learning platform for ICT and English with user-friendly UI and quiz systems.",
    highlights: [
      "Course module structure",
      "Video embedding and resource library",
      "Multiple quiz types with instant feedback",
      "Responsive UI with dashboard and filters",
    ],
    contribution: ["Frontend Developer", "UI Designer"],
    stack: {
      Frontend: ["ReactJS", "Tailwindcss"],
      Tools: ["PrimeReact"],
    },
    projectType: "Frontend",
    codeUrl: "https://github.com/CPF-CADT/e_learning",
  },
  {
    title: "Bash File Manager",
    icon: <Terminal className="text-gray-500" />,
    overview:
      "CLI tool for managing files and directories with logging and backup features.",
    highlights: [
      "Interactive shell prompts",
      "Backup & compression (zip, tar)",
      "Disk usage monitoring",
      "File search and logging",
    ],
    contribution: ["Shell Scripter"],
    stack: {
      Backend: ["Bash"],
      OS: ["Linux", "Unix-based"],
    },
    projectType: "System Tools",
    codeUrl:"https://github.com/CPF-CADT/File-and-Directory-Management-Program",
  },
  {
    title: "School Management System",
    icon: <School className="text-purple-500" />,
    overview:
      "CLI-based system managing school operations like attendance, grading, and registration.",
    highlights: [
      "Grading system",
      "Attendance tracking",
      "Student/teacher record management",
      "MySQL database integration",
    ],
    contribution: ["Develop Core application feature"],
    stack: {
      Backend: ["Java", "MySQL"],
      Concepts: ["OOP", "JDBC"],
    },
    projectType: "Backend",
    codeUrl: "https://github.com/CPF-CADT/school-management-system",
  },
  {
    title: "VET Website Clone",
    icon: <Globe className="text-teal-500" />,
    overview:
      "Cloned the official VET Cambodia website using HTML and CSS for practice.",
    highlights: [
      "Pixel-perfect layout",
      "Mobile responsive design",
      "Clean HTML structure",
      "CSS animations",
    ],
    contribution: ["Develop Main pages and responsive design"],
    stack: {
      Frontend: ["HTML", "CSS"],
    },
    projectType: "Frontend",
    codeUrl:
      "https://github.com/CPF-CADT/Web-Design-Project-Clone-VET-Website",
  },
  {
    title: "Bank Management System",
    icon: <CreditCard className="text-indigo-500" />,
    overview:
      "C++ console app implementing advanced data structures for banking operations.",
    highlights: [
      "Implemented stack, queue, linked list, dynamic arrays",
      "Binary search for record lookups",
      "Object-oriented design",
    ],
    contribution: ["DSA Implementer","Design all banking core concept"],
    stack: {
      Language: ["C++"],
      Concepts: ["DSA", "OOP"],
    },
    projectType: "Console App",
    codeUrl:
      "https://github.com/CPF-CADT/Advance-Algorithms-Bank-Management-System",
  },
  {
    title: "Department Store Management System",
    icon: <Store className="text-indigo-500" />,
    overview:"Standalone C-based inventory and billing system for department stores.",
    highlights: [
      "Full CRUD operations on products and store data in Binary file storage.",
      "Efficient product search, sorting, and sales system with Automated billing calculation",
    ],
    contribution: ["CRUD opretion","handle data"],
    stack: {
      Language: ["C"],
      Concepts: ["File handling", "Pointer", "Basic Algorithm"],
    },
    projectType: "Console App",
    codeUrl:
      "https://github.com/CPF-CADT/department-store-project",
  },
];