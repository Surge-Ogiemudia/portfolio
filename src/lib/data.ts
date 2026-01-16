import type { Project, SkillCategory, NavLink } from './definitions';
import { placeholderImages as allPlaceholderImages } from './placeholder-images';
import portfolioData from './portfolio-data.json';

export const placeholderImages = allPlaceholderImages;

const getImage = (id: string) => {
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
  name: 'Surge Ogiemudia',
  title: 'AI Product Builder',
  introduction:
    'I built my first product, a progressive web app, leveraging assistance from AI tools like Gemini and Copilot. The project was developed using Next.js, deployed on Vercel, and utilizes MongoDB for the database. It includes features like push notifications and subdomain functionality for its marketplace.',
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
  { href: '#review', label: 'AI Review' },
  { href: '#contact', label: 'Contact' },
];

const projectsData = portfolioData.projects as Array<Omit<Project, 'image'> & { imageId: string }>;

export const projects: Project[] = projectsData.map(p => ({
  ...p,
  image: getImage(p.imageId),
}));

export const skillCategories: SkillCategory[] = portfolioData.skillCategories;
