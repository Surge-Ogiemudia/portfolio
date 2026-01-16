import type { Project, SkillCategory, NavLink, Education, Certification } from './definitions';
import { placeholderImages as allPlaceholderImages } from './placeholder-images';
import portfolioData from './portfolio-data.json';

export const placeholderImages = allPlaceholderImages;

const getImage = (id: string, url?: string) => {
  if (url) {
    return {
      id,
      description: 'Project image',
      imageUrl: url,
      imageHint: 'project'
    }
  }
  const image = placeholderImages.find((img) => img.id === id);
  if (!image) {
    const fallback = placeholderImages.find(img => img.id === 'project-1');
    if (fallback) return fallback;
    return {
      id: 'fallback',
      description: 'Fallback image',
      imageUrl: 'https://placehold.co/600x400',
      imageHint: 'placeholder'
    }
  }
  return image;
};

export const personalInfo = {
  name: portfolioData.name,
  title: portfolioData.role,
  introduction: portfolioData.bio,
  email: 'pogiemudia@gmail.com',
  socials: {
    linkedin: 'https://www.linkedin.com/in/osakpolor-ogiemudia-surge-3a00501ab/',
    github: 'https://github.com/',
  },
  whatsapp: '2349050006638',
};

export const navLinks: NavLink[] = [
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#qualifications', label: 'Qualifications' },
  { href: '#review', label: 'AI Review' },
  { href: '#contact', label: 'Contact' },
];

const projectsData = portfolioData.projects as Array<Omit<Project, 'image'> & { imageId: string, imageUrl?: string }>;

export const projects: Project[] = projectsData.map(p => ({
  ...p,
  image: getImage(p.imageId, p.imageUrl),
}));

export const skillCategories: SkillCategory[] = portfolioData.skillCategories || [];
export const education: Education[] = portfolioData.education || [];
export const certifications: Certification[] = portfolioData.certifications || [];
