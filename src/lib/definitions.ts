import type { ImagePlaceholder } from './placeholder-images';

export type Project = {
  id: string;
  title: string;
  description: string;
  technicalDescription?: string;
  tags: string[];
  image: ImagePlaceholder;
  imageUrl?: string;
  liveUrl?: string;
  sourceUrl?: string;
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type NavLink = {
  href: string;
  label: string;
};

export type Education = {
  institution: string;
  degree: string;
  dateRange: string;
  description: string;
};

export type Certification = {
  name: string;
  issuingOrganization: string;
  date: string;
  url: string;
};
