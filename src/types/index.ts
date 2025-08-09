import React from 'react';
import { type LucideProps } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  isPageLink?: boolean;
}

export interface TechStackItem {
  icon: React.ReactElement<LucideProps>;
  name: string;
}

export interface Project {
  title: string;
  icon: React.ReactElement<LucideProps>;
  overview: string;
  highlights: string[];
  stack: { [key: string]: string[] };
  contribution: string[];
  projectType: string;
  liveUrl?: string;
  codeUrl?: string;
  frontendUrl?: string;
  backendUrl?: string;
  inProgress?: boolean;
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  certificateUrl?: string;
}

export interface VolunteerExperience {
  role: string;
  organization: string;
  period: string;
  description: string;
  imageUrls: string[]; 
  certificateUrl?: string; 
}

export interface ContactInfo {
  icon: React.ReactElement<LucideProps>;
  text: string;
  href: string;
}

export interface EducationAchievement {
  title: string;
  description: string;
  slides: {
    url: string;
    caption: string;
  }[];
}

export interface EducationDetails {
  degree: string;
  university: string;
  period: string;
  description: string;
  certificateUrl: string;
  achievements: EducationAchievement[];
}

export interface EducationSlide {
  url: string;
  caption: string;
}

export type MilestoneType = 'award' | 'academic' | 'volunteer' | 'hackathon' | 'leadership';

export interface EducationMilestone {
  title: string;
  description: string;
  slides: EducationSlide[];
  certificateUrl?: string;
  type: MilestoneType;
}

export interface EducationStage {
  title: string;
  institution: string;
  period: string;
  milestones: EducationMilestone[];
}

export interface EducationJourney {
  mainTitle: string;
  mainDescription: string;
  stages: EducationStage[];
}
