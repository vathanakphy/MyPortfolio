import { FaJava } from "react-icons/fa";
import { type TechStackItem } from "../types";
import { 
  SiC, SiCplusplus, SiPython, SiTypescript,
  SiNodedotjs, SiExpress, SiSocketdotio, SiReact, SiTailwindcss,
  SiMysql, SiMongodb, SiRedis,
  SiGithub, SiAmazonrds, SiDigitalocean, 
  SiApachespark, SiSwagger,
  SiUnity,
  SiNestjs
} from "react-icons/si";

export const techStack: { [key: string]: TechStackItem[] } = {
  "Programming Languages": [
    { icon: <SiC size={18} />, name: "C" },
    { icon: <SiCplusplus size={18} />, name: "C++" },
    { icon: <FaJava size={18} />, name: "Java" },
    { icon: <SiPython size={18} />, name: "Python" },
    { icon: <SiTypescript size={18} />, name: "TypeScript" },
  ],
  "Backend Tools & Skills": [
    { icon: <SiNodedotjs size={18} />, name: "Node.js" },
    { icon: <SiExpress size={18} />, name: "Express.js" },
    { icon: <SiNestjs size={18} />, name: "NestJS" },
    { icon: <SiSwagger size={18} />, name: "RESTful API Design" },
    { icon: <SiSocketdotio size={18} />, name: "Socket.IO" },
    { icon: <SiApachespark size={18} />, name: "API Integration" }, 
    { icon: <SiSwagger size={18} />, name: "Security" }, 
  ],
  "Frontend Tools": [
    { icon: <SiReact size={18} />, name: "React.js" },
    { icon: <SiTailwindcss size={18} />, name: "Tailwind CSS" },
  ],
  Databases: [
    { icon: <SiMysql size={18} />, name: "MySQL" },
    { icon: <SiMongodb size={18} />, name: "MongoDB" },
    { icon: <SiRedis size={18} />, name: "Redis" },
  ],
  Tools: [
    { icon: <SiGithub size={18} />, name: "Git/GitHub" },
    { icon: <SiAmazonrds size={18} />, name: "AWS RDS" },
    { icon: <SiUnity size={18} />, name: "Unity" },
    { icon: <SiDigitalocean size={18} />, name: "Digital Ocean" },
  ],
};
