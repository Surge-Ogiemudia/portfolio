import type { ImagePlaceholder } from './placeholder-images';

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: ImagePlaceholder;
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
