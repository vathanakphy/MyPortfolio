import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  Download,
  Mail,
  Linkedin,
  Github,
  Send,
  ChevronsRight,
  Code,
  Server,
  Database,
  GitMerge,
  Monitor,
  Sun,
  Moon,
  Menu,
  X,
  type LucideProps,
  ArrowLeft,
  HeartHandshake,
  Award,
  ExternalLink,
  Cpu,
  TerminalSquare,
  Cloud,
  Shield,
  Zap,
  GraduationCap,
  Store,
  Book,
  Terminal,
  School,
  Globe,
  CreditCard,
  Leaf,
} from "lucide-react";
import nak from './assets/nak.png'
// --- Type Definitions ---
interface NavLink {
  href: string;
  label: string;
  isPageLink?: boolean;
}

interface TechStackItem {
  icon: React.ReactElement<LucideProps>;
  name: string;
}

interface Project {
  title: string;
  icon: React.ReactElement<LucideProps>;
  overview: string;
  highlights: string[];
  stack: { [key: string]: string[] };
  contribution: string[];
  challenges?: string;
  projectType: string;
  liveUrl?: string;
  codeUrl: string;
  frontendUrl?: string;
  backendUrl?: string;
  inProgress?: boolean;
}

interface Achievement {
  title: string;
  issuer: string;
  date: string;
  certificateUrl?: string;
}

interface VolunteerExperience {
  role: string;
  organization: string;
  period: string;
  description: string;
  imageUrl: string;
}

interface ContactInfo {
  icon: React.ReactElement<LucideProps>;
  text: string;
  href: string;
}

type Page = "home" | "projects";

// --- Prop Types ---
interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: (isOpen?: boolean) => void;
  onNavigate: (page: Page) => void;
}

interface AnimatedWrapperProps {
  children: React.ReactNode;
  delay?: number;
}

// --- Animation Wrapper Component ---
const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  // Initialize state directly from localStorage to prevent flash of wrong theme.
  // Default to true (dark mode) if nothing is stored or if not in a browser environment.
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem("darkMode");
      // Defaults to true (dark) if savedMode is 'true' or null (not found)
      return savedMode !== "false";
    }
    return true; // Default for server-side rendering
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<Page>("home");

  // This effect applies the 'dark' class to the HTML element and updates localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const handleNavigation = (page: Page) => {
    setActivePage(page);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleMobileMenu = (isOpen?: boolean) =>
    setIsMobileMenuOpen((prev) => (isOpen !== undefined ? isOpen : !prev));

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans transition-colors duration-500 overflow-x-hidden">
      <GlobalStyles />
      <Header
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        onNavigate={handleNavigation}
      />
      <main>
        {activePage === "home" && (
          <>
            <HeroSection />
            <AboutSection />
            <FeaturedProjectsSection onNavigate={handleNavigation} />
            <EducationSection />
            <VolunteerSection />
            <ContactSection />
          </>
        )}
        {activePage === "projects" && (
          <AllProjectsPage onNavigate={handleNavigation} />
        )}
      </main>
      <Footer />
    </div>
  );
};

// --- Header Component ---
const Header: React.FC<HeaderProps> = ({
  darkMode,
  toggleDarkMode,
  isMobileMenuOpen,
  toggleMobileMenu,
  onNavigate,
}) => {
  const navLinks: NavLink[] = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects", isPageLink: true },
    { href: "#education", label: "Education" },
    { href: "#volunteer", label: "Volunteer" },
    { href: "#contact", label: "Contact" },
  ];

  const NavLinkItem: React.FC<
    NavLink & { onNavigate: (page: Page) => void }
  > = ({ href, label, isPageLink, onNavigate }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isPageLink) {
        e.preventDefault();
        onNavigate("projects");
      } else {
        onNavigate("home");
        // Use timeout to ensure state update completes before scrolling
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
      if (isMobileMenuOpen) toggleMobileMenu(false);
    };

    return (
      <a
        href={href}
        onClick={handleClick}
        className="text-gray-500 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300 font-medium px-3 py-2 rounded-md text-sm cursor-pointer"
      >
        {label}
      </a>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/30 dark:bg-black/30 backdrop-blur-xl border-b border-white/10 dark:border-black/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("home");
            }}
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer"
          >
            Phy Vathanak
          </a>
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <NavLinkItem key={link.href} {...link} onNavigate={onNavigate} />
            ))}
          </nav>
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="md:hidden ml-2">
              <button
                onClick={() => toggleMobileMenu()}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg py-4 absolute top-full left-0 w-full">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map((link) => (
              <NavLinkItem key={link.href} {...link} onNavigate={onNavigate} />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

// --- Hero Section ---
const HeroSection: React.FC = () => {
  return (
    <section
      id="home"
      className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-900 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4 animate-fade-in-down">
          Hi, I’m Phy Vathanak
        </h1>
        <p className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500 mb-6 animate-fade-in-down animation-delay-300">
          Year 3 Software Engineering Student
        </p>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-down animation-delay-600">
          MERN-stack developer with hands-on experience in real-time
          applications, secure authentication, and payment integrations.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-900">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 w-full sm:w-auto"
          >
            <Briefcase className="mr-2 h-5 w-5" />
            View My Projects
          </a>
          <a
            href="/resume.pdf"
            download
            className="group relative inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 shadow-lg hover:shadow-gray-500/20 transform hover:-translate-y-1 w-full sm:w-auto"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

// --- About Section ---
const AboutSection: React.FC = () => {
  const techStack: { [key: string]: TechStackItem[] } = {
    "Programming Languages": [
      { icon: <Code size={18} />, name: "C/C++" },
      { icon: <Code size={18} />, name: "Java" },
      { icon: <Code size={18} />, name: "Python" },
      { icon: <Code size={18} />, name: "TypeScript" },
    ],
    "Backend Tools & Skills": [
      { icon: <Server size={18} />, name: "Node.js" },
      { icon: <Server size={18} />, name: "Express.js" },
      { icon: <ChevronsRight size={18} />, name: "RESTful API Design" },
      { icon: <Send size={18} />, name: "Socket.IO" },
      { icon: <Cpu size={18} />, name: "API Integration" },
      { icon: <Shield size={18} />, name: "Security" },
    ],
    "Frontend Tools": [
      { icon: <Monitor size={18} />, name: "React.js" },
      { icon: <Monitor size={18} />, name: "Tailwind CSS" },
    ],
    Databases: [
      { icon: <Database size={18} />, name: "MySQL" },
      { icon: <Database size={18} />, name: "MongoDB" },
      { icon: <Database size={18} />, name: "Redis" },
    ],
    Tools: [
      { icon: <GitMerge size={18} />, name: "Git/GitHub" },
      { icon: <TerminalSquare size={18} />, name: "Docker" },
      { icon: <Cloud size={18} />, name: "AWS RDS, Render, Vercel" },
    ],
  };

  return (
    <section id="about" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-2 text-center">
            <AnimatedWrapper>
              <div className="relative inline-block">
                <img
                  src={nak}
                  alt="Phy Vathanak"
                  className="w-96 h-96 rounded-full mx-auto shadow-2xl border-4 border-white dark:border-gray-800 object-cover object-center"
                />
                <div className="absolute -top-4 -right-4 w-28 h-28 bg-blue-500 rounded-full mix-blend-multiply filter blur-lg opacity-70 animate-blob"></div>
                <div className="absolute -bottom-4 -left-4 w-28 h-28 bg-purple-500 rounded-full mix-blend-multiply filter blur-lg opacity-70 animate-blob animation-delay-2000"></div>
              </div>
            </AnimatedWrapper>
          </div>
          <div className="lg:col-span-3">
            <AnimatedWrapper delay={150}>
              <p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
                I am a passionate Year 3 Computer Science student at CADT,
                deeply interested in building scalable backend systems and
                real-time applications. My goal is to leverage technology to
                create efficient and impactful solutions.
              </p>
              <p className="text-lg mb-6 italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                “I build backend systems that solve real problems in Cambodia.”
              </p>
              <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl p-6 rounded-xl border border-white/20 dark:border-black/20 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">My Tech Stack</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {Object.entries(techStack).map(([category, items]) => (
                    <div key={category}>
                      <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">
                        {category}
                      </h4>
                      <ul className="space-y-2">
                        {items.map((item) => (
                          <li
                            key={item.name}
                            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                          >
                            <span className="text-blue-500">{item.icon}</span>
                            <span className="ml-2">{item.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Featured Projects Section ---
const FeaturedProjectsSection: React.FC<{
  onNavigate: (page: Page) => void;
}> = ({ onNavigate }) => {
  const projects: Project[] = [
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

  return (
    <section
      id="projects"
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Projects
          </h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <AnimatedWrapper key={project.title} delay={index * 150}>
              <ProjectCard project={project} />
            </AnimatedWrapper>
          ))}
        </div>
        <div className="text-center mt-16">
          <AnimatedWrapper delay={300}>
            <button
              onClick={() => onNavigate("projects")}
              className="group relative inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
            >
              View All My Projects
            </button>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

// --- All Projects Page ---
const AllProjectsPage: React.FC<{ onNavigate: (page: Page) => void }> = ({
  onNavigate,
}) => {
  const allProjects: Project[] = [
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
        Backend: ["C++"],
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
        Backend: ["C++"],
        Concepts: ["File handling", "Pointer", "Basic Algorithm"],
      },
      projectType: "Console App",
      codeUrl:
        "https://github.com/CPF-CADT/department-store-project",
    },
  ];

  return (
    <section id="all-projects" className="py-32 md:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <div className="flex items-center mb-12">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center text-blue-500 dark:text-blue-400 hover:underline font-medium"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </button>
          </div>
          <h2 className="text-4xl font-bold text-center mb-4">All Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">
            A collection of my work, from backend systems to full-stack
            applications.
          </p>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <AnimatedWrapper key={project.title} delay={index * 100}>
              <ProjectCard project={project} />
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Reusable Project Card Component ---
const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="group relative bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-black/20 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2 flex flex-col h-full">
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
          {project.icon}
          <span>{project.title}</span>
          {project.inProgress && (
            <span className="text-xs font-medium bg-yellow-400/20 text-yellow-300 py-1 px-2 rounded-full">
              In Progress
            </span>
          )}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-grow">
          {project.overview}
        </p>

        <div className="space-y-4 mb-4">
          <div>
            <h4 className="font-semibold mb-2 text-sm">Key Highlights:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm">
              {project.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-sm">My Contribution:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm">
              {project.contribution.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2 text-sm">Tech Stack & Tools:</h4>
            <div className="space-y-1">
              {Object.entries(project.stack).map(([category, tools]) => (
                <div key={category} className="text-xs">
                  <span className="font-bold">{category}:</span>{" "}
                  {tools.join(", ")}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-white/10 dark:border-black/20">
          <div className="flex justify-end space-x-4">
            {project.projectType === "Full Stack" ? (
              <>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 hover:underline font-medium text-sm"
                  >
                    Live Site
                  </a>
                )}
                {project.frontendUrl && (
                  <a
                    href={project.frontendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 hover:underline font-medium text-sm"
                  >
                    Frontend
                  </a>
                )}
                {project.backendUrl && (
                  <a
                    href={project.backendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 hover:underline font-medium text-sm"
                  >
                    Backend
                  </a>
                )}
              </>
            ) : (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-blue-400 hover:underline font-medium text-sm"
              >
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Education Section ---
const EducationSection: React.FC = () => {
  const achievements: Achievement[] = [
    {
      title:
        "awarded for a 2024 Techo Digital Talent Scholarship to study Bachelor's Degree at Cambodia Academy of Digital Technology.",
      issuer: "Ministry of Post and Telecommunications",
      date: "2024",
      certificateUrl:
        "https://res.cloudinary.com/dokut37k6/image/upload/v1754570404/image_j3ur9f.jpg",
    },
    {
      title: "Awarded Top 3 in Mathematics for Grade 12 in Kratie Province",
      issuer: "Ministry of Education, Youth and Sport",
      date: "2023",
      certificateUrl:
        "https://res.cloudinary.com/dokut37k6/image/upload/v1754570638/CamScanner_11-15-2023_08.12_s1fdce.jpg",
    },
  ];

  return (
    <section id="education" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold text-center mb-12">
            Education & Achievements
          </h2>
        </AnimatedWrapper>
        <AnimatedWrapper delay={150}>
          <div className="max-w-3xl mx-auto bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-black/20 p-8">
            <div className="flex flex-col sm:flex-row items-start">
              <div className="text-5xl mr-0 mb-4 sm:mr-6 sm:mb-0 text-blue-500">
                <GraduationCap />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  Cambodia Academy of Digital Technology (CADT)
                </h3>
                <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  Bachelor of Science in Computer Science, specializing in
                  Software Engineering
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold mb-3 text-md">Achievements:</h4>
                  <div className="space-y-4">
                    {achievements.map((ach) => (
                      <div key={ach.title} className="flex items-start">
                        <Award
                          size={20}
                          className="mr-3 mt-1 text-yellow-500 flex-shrink-0"
                        />
                        <div>
                          <p className="font-bold text-gray-800 dark:text-gray-200">
                            {ach.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {ach.issuer} - {ach.date}
                          </p>
                          {ach.certificateUrl && (
                            <a
                              href={ach.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-xs text-blue-500 hover:underline mt-1"
                            >
                              View Certificate{" "}
                              <ExternalLink size={12} className="ml-1" />
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
};

// --- Volunteer Section ---
const VolunteerSection: React.FC = () => {
  const experiences: VolunteerExperience[] = [
    {
      role: "Algorithm Trainer",
      organization: "Cambodia Academy of Digital Technology (CADT)",
      period: "2025",
      description:
        "Volunteered as a trainer, where I taught C++ algorithms to Year 1 students and collaborated with a team to build a quiz platform project.",
      imageUrl:
        "https://placehold.co/600x400/8B5CF6/FFFFFF?text=FinalProjectDefence",
    },
    {
      role: "ICT Trainer",
      organization: "USAID",
      period: "2024",
      description:
        "Educating students on fundamental ICT and coding skills at Siem Reap province.",
      imageUrl: "https://res.cloudinary.com/dokut37k6/image/upload/v1754574508/3C4A3332_kad9i2.jpg",
    },
  ];

  return (
    <section
      id="volunteer"
      className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950/50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold text-center mb-12">
            Volunteer Experience
          </h2>
        </AnimatedWrapper>
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <AnimatedWrapper key={index} delay={index * 150}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                <div
                  className={`md:col-span-2 ${
                    index % 2 === 0 ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <img
                    src={exp.imageUrl}
                    alt={exp.role}
                    className="rounded-2xl shadow-lg w-full h-auto object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Not+Found";
                    }}
                  />
                </div>
                <div
                  className={`md:col-span-3 ${
                    index % 2 === 0 ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-black/20 p-8 h-full">
                    <div className="flex items-start">
                      <div className="text-4xl mr-4 text-purple-500">
                        <HeartHandshake />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{exp.role}</h3>
                        <p className="text-md font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                          {exp.organization}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {exp.period}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Contact Section ---
const ContactSection: React.FC = () => {
  const contactInfo: ContactInfo[] = [
    {
      icon: <Mail size={24} />,
      text: "vathanakphy@gmail.com",
      href: "mailto:vathanakphy@gmail.com",
    },
    {
      icon: <Linkedin size={24} />,
      text: "linkedin.com/in/phy-vathanak",
      href: "https://www.linkedin.com/in/phy-vathanak/",
    },
    {
      icon: <Github size={24} />,
      text: "github.com/vathanakphy",
      href: "https://github.com/vathanakphy",
    },
    {
      icon: <Send size={24} />,
      text: "@phyvathanak",
      href: "https://t.me/phyvathanak",
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedWrapper>
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            I'm currently seeking backend internship opportunities. If you have
            a role that aligns with my skills, I'd love to hear from you!
          </p>
        </AnimatedWrapper>
        <div className="max-w-md mx-auto space-y-4">
          {contactInfo.map((item, index) => (
            <AnimatedWrapper key={index} delay={index * 100}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-white/20 dark:border-black/20 hover:border-blue-500/20"
              >
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  {item.icon}
                </div>
                <span className="ml-4 text-gray-700 dark:text-gray-200">
                  {item.text}
                </span>
              </a>
            </AnimatedWrapper>
          ))}
        </div>
        <div className="mt-12">
          <AnimatedWrapper delay={contactInfo.length * 100}>
            <a
              href="/resume.pdf"
              download
              className="group relative inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1"
            >
              <Download className="mr-3 h-6 w-6" />
              Download My Full Resume
            </a>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

// --- Footer Component ---
const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Phy Vathanak. All Rights Reserved.
        </p>
        <p className="text-sm mt-1">
          Built with React, Tailwind CSS, and a touch of magic ✨
        </p>
      </div>
    </footer>
  );
};

// --- Global Styles for Animations ---
const GlobalStyles: React.FC = () => (
  <style>{`
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    .animate-blob {
      animation: blob 7s infinite;
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }

    @keyframes fade-in-down {
      0% { opacity: 0; transform: translateY(-20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-down {
      animation: fade-in-down 0.6s ease-out forwards;
    }
    
    @keyframes fade-in-up {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.6s ease-out forwards;
    }

    .animation-delay-300 { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }
    .animation-delay-600 { animation-delay: 0.6s; opacity: 0; animation-fill-mode: forwards; }
    .animation-delay-900 { animation-delay: 0.9s; opacity: 0; animation-fill-mode: forwards; }
  `}</style>
);

export default App;
