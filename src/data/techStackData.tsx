import { type TechStackItem } from "../types";
import { Code, Server, ChevronsRight, Send, Cpu, Shield, Monitor, Database, GitMerge, TerminalSquare, Cloud } from "lucide-react";

export const techStack: { [key: string]: TechStackItem[] } = {
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