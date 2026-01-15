import type { Project, SkillCategory, NavLink } from './definitions';
import { PlaceHolderImages } from './placeholder-images';

const getImage = (id: string) => {
  const image = PlaceHolderImages.find((img) => img.id === id);
  if (!image) {
    throw new Error(`Image with id ${id} not found`);
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
    title: 'AI-Assisted Product Development',
    description:
      'Leveraged AI tools like Gemini and Copilot to build a full-stack Progressive Web App from concept to deployment. This approach accelerated development and facilitated the implementation of complex features.',
    tags: ['AI-Assisted Development', 'Next.js', 'MongoDB', 'PWA'],
    image: getImage('project-1'),
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 'project-2',
    title: 'Marketplace with Subdomains',
    description:
      'Engineered a dynamic marketplace where users get their own subdomains. This required a robust architecture to handle routing, data isolation, and a seamless user experience across the platform.',
    tags: ['Next.js', 'Vercel', 'Subdomain Routing', 'UX Design'],
    image: getImage('project-2'),
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 'project-3',
    title: 'PWA with Push Notifications',
    description:
      'Developed and configured the application as a Progressive Web App (PWA) to provide a native-app-like experience, complete with offline capabilities and real-time push notifications to engage users.',
    tags: ['PWA', 'Service Workers', 'Push API', 'User Engagement'],
    image: getImage('project-3'),
    liveUrl: '#',
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
