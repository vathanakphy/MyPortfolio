import { Mail, Linkedin, Github, Send } from "lucide-react";
import type { ContactInfo } from "../types";

export const contactInfo: ContactInfo[] = [
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