import type { Project, SkillCategory, NavLink } from './definitions';
import { placeholderImages as allPlaceholderImages } from './placeholder-images';

export const placeholderImages = allPlaceholderImages;

const getImage = (id: string) => {
  const image = placeholderImages.find((img) => img.id === id);
  if (!image) {
    // Fallback to a default image if not found, to prevent crashes
    const fallback = placeholderImages.find(img => img.id === 'project-1');
    if (fallback) return fallback;
    
    // If even fallback is not there, create a dummy object
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

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Pharmastackx - AI-Assisted PWA Marketplace',
    description:
      "A digital healthcare infrastructure built to eliminate inventory invisibility in Nigeria's pharmaceutical market. It replaces fragmented manual searches with an automated, real-time network. The platform provides pharmacies with unique subdomains for their digital catalogs and notifies them instantly to confirm availability when a user searches for a drug.",
    technicalDescription:
      'A full-stack Progressive Web App marketplace built with Next.js and MongoDB. This project was developed from concept to deployment with AI assistance, featuring dynamic subdomain routing for vendors and real-time push notifications.',
    tags: [
      'Next.js',
      'MongoDB',
      'PWA',
      'AI-Assisted',
      'Subdomains',
      'Healthcare',
    ],
    image: getImage('project-1'),
    liveUrl: 'https://www.pharmastackx.com',
    sourceUrl: 'https://github.com/pharmastackx-cyber/Pharmastackx',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI-Assisted Development',
    skills: [
      'Prompt Engineering',
      'AI Code Generation',
      'Gemini & Copilot',
      'Iterative Prototyping',
      'AI Tool Integration',
      'Feature Scoping with AI',
    ],
  },
  {
    title: 'Product & UX',
    skills: [
      'Concept to Launch',
      'Feature Prioritization',
      'User-Centric Design',
      'Marketplace Functionality',
      'Subdomain Architecture',
      'Progressive Web Apps (PWA)',
    ],
  },
  {
    title: 'Technical Stack',
    skills: [
      'Next.js & React',
      'TypeScript',
      'Vercel Deployment',
      'MongoDB (NoSQL)',
      'Push Notifications',
      'Node.js',
      'Tailwind CSS',
    ],
  },
];
