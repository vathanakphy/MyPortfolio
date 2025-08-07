import React, { useState, useEffect, useRef } from 'react';
import { Briefcase, Download, Mail, Linkedin, Github, Send, ChevronsRight, Code, Server, Database, GitMerge, Monitor, Sun, Moon, Menu, X, type LucideProps, ArrowLeft } from 'lucide-react';
import myPicture from './assets/me.png'
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
  icon: string;
  overview: string;
  highlights: string[];
  role: string;
  stack: string[];
  liveUrl: string;
  codeUrl: string;
  inProgress?: boolean;
}

interface ContactInfo {
  icon: React.ReactElement<LucideProps>;
  text: string;
  href: string;
}

type Page = 'home' | 'projects';

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

// --- Animation Wrapper Component (Reduced Animation) ---
const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current!);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current!);
            }
        };
    }, []);

    return (
        <div 
            ref={ref} 
            className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
            style={{ transitionDelay: `${delay}ms`}}
        >
            {children}
        </div>
    );
};


// --- Main App Component ---
const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<Page>('home');

  useEffect(() => {
    const isDarkModePreferred = localStorage.getItem('darkMode') !== 'false';
    setDarkMode(isDarkModePreferred);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const handleNavigation = (page: Page) => {
      setActivePage(page);
      window.scrollTo(0, 0); // Scroll to top on page change
  };

  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleMobileMenu = (isOpen?: boolean) => setIsMobileMenuOpen(prev => isOpen !== undefined ? isOpen : !prev);

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
        {activePage === 'home' && (
            <>
                <HeroSection />
                <AboutSection />
                <FeaturedProjectsSection onNavigate={handleNavigation} />
                <EducationSection />
                <ContactSection />
            </>
        )}
        {activePage === 'projects' && <AllProjectsPage onNavigate={handleNavigation} />}
      </main>
      <Footer />
    </div>
  );
};

// --- Header Component ---
const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode, isMobileMenuOpen, toggleMobileMenu, onNavigate }) => {
  const navLinks: NavLink[] = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects', isPageLink: true },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
  ];

  const NavLinkItem: React.FC<NavLink & { onNavigate: (page: Page) => void }> = ({ href, label, isPageLink, onNavigate }) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isPageLink) {
            e.preventDefault();
            onNavigate('projects');
        } else {
            onNavigate('home');
            // Timeout to allow page to render before scrolling
            setTimeout(() => {
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
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
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 cursor-pointer">
            Phy Vathanak
          </a>
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map(link => <NavLinkItem key={link.href} {...link} onNavigate={onNavigate} />)}
          </nav>
          <div className="flex items-center">
             <button onClick={toggleDarkMode} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div className="md:hidden ml-2">
              <button onClick={() => toggleMobileMenu()} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg py-4 absolute top-full left-0 w-full">
          <nav className="flex flex-col items-center space-y-4">
            {navLinks.map(link => <NavLinkItem key={link.href} {...link} onNavigate={onNavigate} />)}
          </nav>
        </div>
      )}
    </header>
  );
};

// --- Hero Section ---
const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative pt-32 md:pt-40 pb-24 md:pb-32 overflow-hidden">
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
          Backend Developer Intern Candidate
        </p>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-down animation-delay-600">
          MERN-stack developer with hands-on experience in real-time applications, secure authentication, and payment integrations.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up animation-delay-900">
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }} className="group relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1 w-full sm:w-auto">
            <Briefcase className="mr-2 h-5 w-5" />
            View My Projects
          </a>
          <a href="/resume.pdf" download className="group relative inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300 shadow-lg hover:shadow-gray-500/20 transform hover:-translate-y-1 w-full sm:w-auto">
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
    "Backend": [{ icon: <Server size={18} />, name: "Node.js" }, { icon: <Server size={18} />, name: "Express.js" }, { icon: <ChevronsRight size={18} />, name: "REST API" }, { icon: <Send size={18} />, name: "Socket.IO" }, { icon: <Code size={18} />, name: "JWT" }],
    "Frontend": [{ icon: <Monitor size={18} />, name: "React" }, { icon: <Monitor size={18} />, name: "Tailwind CSS" }],
    "Database": [{ icon: <Database size={18} />, name: "MySQL" }, { icon: <Database size={18} />, name: "MongoDB" }],
    "Tools": [{ icon: <GitMerge size={18} />, name: "Git" }, { icon: <Monitor size={18} />, name: "Linux" }, { icon: <Send size={18} />, name: "Postman" }, { icon: <Server size={18} />, name: "Docker" }],
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
                      src={myPicture}
                      alt="Phy Vathanak" 
                      className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto shadow-2xl border-4 border-white dark:border-gray-800"
                    />
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-blue-500 rounded-full mix-blend-multiply filter blur-lg opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-purple-500 rounded-full mix-blend-multiply filter blur-lg opacity-70 animate-blob animation-delay-2000"></div>
                </div>
            </AnimatedWrapper>
          </div>
          <div className="lg:col-span-3">
            <AnimatedWrapper delay={150}>
                <p className="text-lg mb-4 text-gray-600 dark:text-gray-300">
                  I am a passionate Year 3 Computer Science student at CADT, deeply interested in building scalable backend systems and real-time applications. My goal is to leverage technology to create efficient and impactful solutions.
                </p>
                <p className="text-lg mb-6 italic text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  “I build backend systems that solve real problems in Cambodia.”
                </p>
                <div className="bg-white/30 dark:bg-black/30 backdrop-blur-xl p-6 rounded-xl border border-white/20 dark:border-black/20 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">My Tech Stack</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-6">
                    {Object.entries(techStack).map(([category, items]) => (
                      <div key={category}>
                        <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-2">{category}</h4>
                        <ul className="space-y-2">
                          {items.map(item => (
                            <li key={item.name} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
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
const FeaturedProjectsSection: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const projects: Project[] = [
        { title: "Online Marketplace for Tech Products", icon: "🏆", overview: "An e-commerce platform tailored for the Cambodian tech market, featuring real-time Bakong payments and Telegram alerts for vendors.", highlights: ["KHQR payments via Bakong", "Secure JWT-based authentication", "Real-time notifications via Telegram"], role: "Backend, Frontend, Database Design", stack: ["React", "Node.js", "TypeScript", "MySQL", "JWT", "Cloudinary"], liveUrl: "#", codeUrl: "#" },
        { title: "Real-Time Multiplayer Quiz Platform", icon: "⚡", overview: "A dynamic quiz platform inspired by Kahoot, built with Socket.IO for seamless real-time interactions and a public API for system integration.", highlights: ["Real-time user interactions (Socket.IO)", "Public API for external systems", "JWT auth and MongoDB storage"], role: "Backend Developer, API Architect", stack: ["React", "Node.js", "Socket.IO", "MongoDB", "JWT"], liveUrl: "#", codeUrl: "#", inProgress: true },
    ];

    return (
        <section id="projects" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedWrapper>
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
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
                        <button onClick={() => onNavigate('projects')} className="group relative inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1">
                            View All My Projects
                        </button>
                    </AnimatedWrapper>
                </div>
            </div>
        </section>
    );
};

// --- All Projects Page ---
const AllProjectsPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const allProjects: Project[] = [
        { title: "Online Marketplace", icon: "🏆", overview: "E-commerce platform with Bakong payments.", highlights: ["KHQR payments", "JWT auth", "Telegram alerts"], role: "Full Stack", stack: ["React", "Node.js", "MySQL"], liveUrl: "#", codeUrl: "#" },
        { title: "Multiplayer Quiz App", icon: "⚡", overview: "Real-time quiz app like Kahoot.", highlights: ["Socket.IO", "Public API", "MongoDB"], role: "Backend", stack: ["Node.js", "Socket.IO", "MongoDB"], liveUrl: "#", codeUrl: "#", inProgress: true },
        { title: "School Management System", icon: "🎓", overview: "A comprehensive system for managing students, courses, and grades.", highlights: ["CRUD operations", "User Roles", "Data reporting"], role: "Backend Developer", stack: ["Java", "Spring Boot", "PostgreSQL"], liveUrl: "#", codeUrl: "#" },
        { title: "Personal Blog Platform", icon: "✍️", overview: "A full-featured blogging platform with a Markdown editor.", highlights: ["Markdown support", "Comment system", "SEO friendly"], role: "Full Stack", stack: ["Next.js", "Tailwind CSS", "Firebase"], liveUrl: "#", codeUrl: "#" },
        { title: "Weather Dashboard", icon: "☁️", overview: "A simple dashboard to check weather forecasts using a public API.", highlights: ["Third-party API integration", "Geolocation", "Dynamic UI"], role: "Frontend", stack: ["React", "Axios", "Chart.js"], liveUrl: "#", codeUrl: "#" },
        { title: "Task Management App", icon: "✅", overview: "A Kanban-style task board for project management.", highlights: ["Drag-and-drop", "Real-time updates", "User authentication"], role: "Full Stack", stack: ["React", "Firebase", "dnd-kit"], liveUrl: "#", codeUrl: "#" }
    ];

    return (
        <section id="all-projects" className="py-32 md:py-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedWrapper>
                    <div className="flex items-center mb-12">
                         <button onClick={() => onNavigate('home')} className="flex items-center text-blue-500 dark:text-blue-400 hover:underline font-medium">
                            <ArrowLeft size={20} className="mr-2" />
                            Back to Home
                        </button>
                    </div>
                    <h2 className="text-4xl font-bold text-center mb-4">All Projects</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 text-center mb-12">A collection of my work, from backend systems to full-stack applications.</p>
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
                <h3 className="text-xl font-bold mb-2">
                    {project.icon} {project.title}
                    {project.inProgress && <span className="text-xs font-medium bg-yellow-400/20 text-yellow-300 py-1 px-2 rounded-full ml-2">In Progress</span>}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm flex-grow">{project.overview}</p>
                
                <h4 className="font-semibold mb-2 text-sm">Highlights:</h4>
                <ul className="list-disc list-inside space-y-1 mb-4 text-gray-600 dark:text-gray-300 text-sm">
                    {project.highlights.map((highlight, i) => <li key={i}>{highlight}</li>)}
                </ul>

                <p className="mb-4 text-sm"><span className="font-semibold">My Role:</span> {project.role}</p>

                <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech, i) => (
                            <span key={i} className="bg-blue-500/10 text-blue-500 dark:bg-blue-400/10 dark:text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">{tech}</span>
                        ))}
                    </div>
                </div>
                <div className="mt-auto pt-4 border-t border-white/10 dark:border-black/20">
                    <div className="flex justify-end space-x-4">
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline font-medium text-sm">Live Site</a>
                        <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 hover:underline font-medium text-sm">Backend API</a>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Education Section ---
const EducationSection: React.FC = () => {
    return (
        <section id="education" className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedWrapper>
                    <h2 className="text-3xl font-bold text-center mb-12">Education & Skills</h2>
                </AnimatedWrapper>
                <AnimatedWrapper delay={150}>
                    <div className="max-w-3xl mx-auto bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 dark:border-black/20 p-8">
                        <div className="flex flex-col sm:flex-row items-start">
                            <div className="text-5xl mr-0 mb-4 sm:mr-6 sm:mb-0 text-blue-500">🎓</div>
                            <div>
                                <h3 className="text-2xl font-bold">B.Sc. in Computer Science</h3>
                                <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Cambodia Academy of Digital Technology (CADT)</p>
                                <p className="text-gray-500 dark:text-gray-400">Year 3 Student</p>
                                <div className="mt-4">
                                    <h4 className="font-semibold mb-2 text-sm">Relevant Coursework:</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">Software Engineering, OOP, Database Management Systems, Networking</p>
                                </div>
                                <div className="mt-4">
                                    <h4 className="font-semibold mb-2 text-sm">Key Projects:</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">School Management System, E-commerce Platform, Real-time Apps</p>
                                </div>
                                 <div className="mt-6">
                                    <a href="https://github.com/CPF-CADT" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-500 dark:text-blue-400 hover:underline font-medium">
                                        <Github size={18} className="mr-2"/>
                                        View my GitHub Profile
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedWrapper>
            </div>
        </section>
    );
};

// --- Contact Section ---
const ContactSection: React.FC = () => {
    const contactInfo: ContactInfo[] = [
        { icon: <Mail size={24} />, text: "your.email@example.com", href: "mailto:your.email@example.com" },
        { icon: <Linkedin size={24} />, text: "linkedin.com/in/yourname", href: "https://linkedin.com/in/yourname" },
        { icon: <Github size={24} />, text: "github.com/yourusername", href: "https://github.com/yourusername" },
        { icon: <Send size={24} />, text: "@yourusername", href: "https://t.me/yourusername" },
    ];

    return (
        <section id="contact" className="py-16 md:py-24 bg-gray-50 dark:bg-gray-950/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <AnimatedWrapper>
                    <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        I'm currently seeking backend internship opportunities. If you have a role that aligns with my skills, I'd love to hear from you!
                    </p>
                </AnimatedWrapper>
                <div className="max-w-md mx-auto space-y-4">
                    {contactInfo.map((item, index) => (
                        <AnimatedWrapper key={index} delay={index * 100}>
                            <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-white/20 dark:border-black/20 hover:border-blue-500/20">
                                <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">{item.icon}</div>
                                <span className="ml-4 text-gray-700 dark:text-gray-200">{item.text}</span>
                            </a>
                        </AnimatedWrapper>
                    ))}
                </div>
                 <div className="mt-12">
                    <AnimatedWrapper delay={contactInfo.length * 100}>
                         <a href="/resume.pdf" download className="group relative inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-1">
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
                <p>&copy; {new Date().getFullYear()} Phy Vathanak. All Rights Reserved.</p>
                <p className="text-sm mt-1">Built with React, Tailwind CSS, and a touch of magic ✨</p>
            </div>
        </footer>
    );
};

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
