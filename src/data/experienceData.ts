export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  companyLogo?: string;
  companyInfo?: string;
  companyUrl?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "internship-1",
    company: "SINET",
    role: "Software Developer Intern",
    duration: "April 2026 - Present",
    location: "Phnom Penh, Cambodia",
    description: "Optimized and expanded the existing Attendance Management System by implementing new features to meet user requirements and improve efficiency.",
    responsibilities: [
      "Maintained and enhanced the attendance application, improving user experience and system performance.",
      "Developed and integrated new features based on end-user requirements and feedback.",
      "Testing ensure feature to release with stable."
    ],
    technologies: ["Django", "Bootsrap", "HTML", "CSS", "PostgreSQL"],
    companyLogo: "/sinet_logo.jpeg",
    companyInfo: "SINET, founded in 2009, is a leading Internet and Telecom Service provider in Cambodia, offering a nation-wide network backbone and operating over 200 active POPs.",
    companyUrl: "https://www.sinet.com.kh/"
  }
];
