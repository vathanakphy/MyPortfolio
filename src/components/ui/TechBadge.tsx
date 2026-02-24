import React from "react";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiShadcnui,
  SiMui,
  SiFramer,
  SiReact,
  SiRedux,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSupabase,
  SiDocker,
  SiVercel,
  SiGit,
  SiGithub,
  SiPostman,
  SiNpm,
  SiMysql,
  SiRedis,
  SiSocketdotio,
  SiPython,
  SiC,
  SiCplusplus,
  SiFlutter,
  SiDart,
  SiNestjs,
  SiSwagger,
  SiUnity,
  SiDigitalocean,
  SiAmazon,
  SiVite,
  SiPrisma,
  SiPostgresql,
  SiFirebase,
  SiGraphql,
  SiLinux,
  SiSqlite,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

// Tech color mapping with icon and background colors
export const techColors: { [key: string]: { bg: string; text: string; icon: React.ReactNode } } = {
  // Languages
  "HTML": { bg: "bg-orange-600", text: "text-white", icon: <SiHtml5 size={14} /> },
  "HTML5": { bg: "bg-orange-600", text: "text-white", icon: <SiHtml5 size={14} /> },
  "CSS": { bg: "bg-blue-600", text: "text-white", icon: <SiCss3 size={14} /> },
  "CSS3": { bg: "bg-blue-600", text: "text-white", icon: <SiCss3 size={14} /> },
  "JavaScript": { bg: "bg-yellow-400", text: "text-black", icon: <SiJavascript size={14} /> },
  "TypeScript": { bg: "bg-blue-600", text: "text-white", icon: <SiTypescript size={14} /> },
  "Python": { bg: "bg-blue-500", text: "text-white", icon: <SiPython size={14} /> },
  "C": { bg: "bg-blue-700", text: "text-white", icon: <SiC size={14} /> },
  "C++": { bg: "bg-blue-800", text: "text-white", icon: <SiCplusplus size={14} /> },
  "C#": { bg: "bg-purple-600", text: "text-white", icon: <SiCplusplus size={14} /> },
  "Java": { bg: "bg-red-600", text: "text-white", icon: <FaJava size={14} /> },
  "Dart": { bg: "bg-sky-500", text: "text-white", icon: <SiDart size={14} /> },
  "Assembly": { bg: "bg-gray-700", text: "text-white", icon: null },
  "Bash": { bg: "bg-gray-800", text: "text-white", icon: <SiLinux size={14} /> },

  // Frontend
  "React": { bg: "bg-cyan-500", text: "text-white", icon: <SiReact size={14} /> },
  "React.js": { bg: "bg-cyan-500", text: "text-white", icon: <SiReact size={14} /> },
  "ReactJS": { bg: "bg-cyan-500", text: "text-white", icon: <SiReact size={14} /> },
  "Next.js": { bg: "bg-black", text: "text-white", icon: <SiNextdotjs size={14} /> },
  "NextJS": { bg: "bg-black", text: "text-white", icon: <SiNextdotjs size={14} /> },
  "Tailwind CSS": { bg: "bg-cyan-600", text: "text-white", icon: <SiTailwindcss size={14} /> },
  "Tailwindcss": { bg: "bg-cyan-600", text: "text-white", icon: <SiTailwindcss size={14} /> },
  "TailwindCSS": { bg: "bg-cyan-600", text: "text-white", icon: <SiTailwindcss size={14} /> },
  "shadcn/ui": { bg: "bg-zinc-800", text: "text-white", icon: <SiShadcnui size={14} /> },
  "Material UI": { bg: "bg-blue-500", text: "text-white", icon: <SiMui size={14} /> },
  "Framer Motion": { bg: "bg-pink-500", text: "text-white", icon: <SiFramer size={14} /> },
  "Redux": { bg: "bg-purple-600", text: "text-white", icon: <SiRedux size={14} /> },
  "Vite": { bg: "bg-purple-500", text: "text-white", icon: <SiVite size={14} /> },
  "Flutter": { bg: "bg-sky-400", text: "text-white", icon: <SiFlutter size={14} /> },
  "PrimeReact": { bg: "bg-blue-600", text: "text-white", icon: <SiReact size={14} /> },

  // Backend
  "Node.js": { bg: "bg-green-600", text: "text-white", icon: <SiNodedotjs size={14} /> },
  "NodeJS": { bg: "bg-green-600", text: "text-white", icon: <SiNodedotjs size={14} /> },
  "Express.js": { bg: "bg-gray-700", text: "text-white", icon: <SiExpress size={14} /> },
  "Express": { bg: "bg-gray-700", text: "text-white", icon: <SiExpress size={14} /> },
  "ExpressJS": { bg: "bg-gray-700", text: "text-white", icon: <SiExpress size={14} /> },
  "NestJS": { bg: "bg-red-600", text: "text-white", icon: <SiNestjs size={14} /> },
  "Socket.IO": { bg: "bg-black", text: "text-white", icon: <SiSocketdotio size={14} /> },
  "GraphQL": { bg: "bg-pink-600", text: "text-white", icon: <SiGraphql size={14} /> },

  // Databases
  "MongoDB": { bg: "bg-green-500", text: "text-white", icon: <SiMongodb size={14} /> },
  "MySQL": { bg: "bg-blue-700", text: "text-white", icon: <SiMysql size={14} /> },
  "PostgreSQL": { bg: "bg-blue-800", text: "text-white", icon: <SiPostgresql size={14} /> },
  "Redis": { bg: "bg-red-600", text: "text-white", icon: <SiRedis size={14} /> },
  "Supabase": { bg: "bg-emerald-600", text: "text-white", icon: <SiSupabase size={14} /> },
  "Firebase": { bg: "bg-amber-500", text: "text-white", icon: <SiFirebase size={14} /> },
  "Prisma": { bg: "bg-slate-800", text: "text-white", icon: <SiPrisma size={14} /> },
  "SQLite": { bg: "bg-sky-700", text: "text-white", icon: <SiSqlite size={14} /> },

  // DevOps & Tools
  "Docker": { bg: "bg-blue-500", text: "text-white", icon: <SiDocker size={14} /> },
  "Vercel": { bg: "bg-black", text: "text-white", icon: <SiVercel size={14} /> },
  "Git": { bg: "bg-orange-600", text: "text-white", icon: <SiGit size={14} /> },
  "GitHub": { bg: "bg-gray-900", text: "text-white", icon: <SiGithub size={14} /> },
  "Git/GitHub": { bg: "bg-gray-900", text: "text-white", icon: <SiGithub size={14} /> },
  "Postman": { bg: "bg-orange-500", text: "text-white", icon: <SiPostman size={14} /> },
  "npm": { bg: "bg-red-600", text: "text-white", icon: <SiNpm size={14} /> },
  "Swagger": { bg: "bg-green-600", text: "text-white", icon: <SiSwagger size={14} /> },
  "Digital Ocean": { bg: "bg-blue-600", text: "text-white", icon: <SiDigitalocean size={14} /> },
  "AWS RDS": { bg: "bg-orange-500", text: "text-white", icon: <SiAmazon size={14} /> },
  "AWS": { bg: "bg-orange-500", text: "text-white", icon: <SiAmazon size={14} /> },

  // Game Dev
  "Unity": { bg: "bg-gray-800", text: "text-white", icon: <SiUnity size={14} /> },

  // Auth & Security
  "JWT": { bg: "bg-purple-700", text: "text-white", icon: null },

  // Concepts (no specific icons)
  "OOP": { bg: "bg-indigo-600", text: "text-white", icon: null },
  "DSA": { bg: "bg-violet-600", text: "text-white", icon: null },
  "JDBC": { bg: "bg-red-700", text: "text-white", icon: null },
  "RESTful API Design": { bg: "bg-green-700", text: "text-white", icon: null },
  "API Integration": { bg: "bg-teal-600", text: "text-white", icon: null },
  "Security": { bg: "bg-red-700", text: "text-white", icon: null },
  "NavMesh AI": { bg: "bg-gray-600", text: "text-white", icon: null },
  "Raycasting": { bg: "bg-gray-600", text: "text-white", icon: null },
  "3D Spatial Audio": { bg: "bg-gray-600", text: "text-white", icon: null },
  "JSON Persistence": { bg: "bg-gray-600", text: "text-white", icon: null },
  "File handling": { bg: "bg-gray-600", text: "text-white", icon: null },
  "Pointer": { bg: "bg-gray-600", text: "text-white", icon: null },
  "Basic Algorithm": { bg: "bg-gray-600", text: "text-white", icon: null },
  "CPU 8085": { bg: "bg-gray-700", text: "text-white", icon: null },
  "Logic gate": { bg: "bg-gray-700", text: "text-white", icon: null },
  "Linux": { bg: "bg-yellow-600", text: "text-white", icon: <SiLinux size={14} /> },
  "Unix-based": { bg: "bg-gray-700", text: "text-white", icon: null },
  "Telegram Bot API": { bg: "bg-blue-500", text: "text-white", icon: null },
  "Flutter Stateful & Stateless widgets": { bg: "bg-sky-400", text: "text-white", icon: <SiFlutter size={14} /> },
  "Local state management": { bg: "bg-gray-600", text: "text-white", icon: null },
  "CRUD operations": { bg: "bg-gray-600", text: "text-white", icon: null },
  "Camera integration": { bg: "bg-gray-600", text: "text-white", icon: null },
  "SQLite)": { bg: "bg-sky-700", text: "text-white", icon: <SiSqlite size={14} /> },
};

// Default style for unknown techs
const defaultStyle = { bg: "bg-gray-700", text: "text-white", icon: null };

interface TechBadgeProps {
  name: string;
  size?: "sm" | "md";
}

export const TechBadge: React.FC<TechBadgeProps> = ({ name, size = "sm" }) => {
  const style = techColors[name] || defaultStyle;
  const sizeClasses = size === "sm" 
    ? "text-xs px-2 py-0.5 gap-1" 
    : "text-sm px-3 py-1 gap-1.5";

  return (
    <span className={`inline-flex items-center ${sizeClasses} rounded ${style.bg} ${style.text} font-medium`}>
      {style.icon}
      <span>{name}</span>
    </span>
  );
};

interface TechBadgeListProps {
  techs: string[];
  size?: "sm" | "md";
  limit?: number;
}

export const TechBadgeList: React.FC<TechBadgeListProps> = ({ techs, size = "sm", limit }) => {
  const displayTechs = limit ? techs.slice(0, limit) : techs;
  const remaining = limit && techs.length > limit ? techs.length - limit : 0;

  return (
    <div className="flex flex-wrap gap-1.5">
      {displayTechs.map((tech, i) => (
        <TechBadge key={i} name={tech} size={size} />
      ))}
      {remaining > 0 && (
        <span className="text-xs px-2 py-0.5 rounded bg-gray-500 text-white font-medium">
          +{remaining}
        </span>
      )}
    </div>
  );
};

export default TechBadge;
