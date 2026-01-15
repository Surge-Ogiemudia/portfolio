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
  title: 'AI Product Manager & Builder',
  introduction:
    'I specialize in building and managing AI-driven products that solve complex problems. With a background in both engineering and product, I bridge the gap between technical possibilities and market needs.',
  email: 'hello@surgeogiemudia.ai',
  socials: {
    linkedin: 'https://www.linkedin.com/',
    github: 'https://github.com/',
  },
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
    title: 'Project Insight',
    description:
      'An AI-powered analytics platform that surfaces key business insights from unstructured data. Led the product from conception to a successful beta launch with 10 enterprise clients.',
    tags: ['Product Strategy', 'NLP', 'React', 'Python', 'AWS'],
    image: getImage('project-1'),
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 'project-2',
    title: 'Genie'
    ,
    description:
      'A generative AI tool for marketing teams to create high-quality ad copy. Managed a cross-functional team of 8 to deliver a 40% increase in user engagement post-launch.',
    tags: ['LLMs', 'Roadmap Planning', 'Next.js', 'Firebase'],
    image: getImage('project-2'),
    liveUrl: '#',
    sourceUrl: '#',
  },
  {
    id: 'project-3',
    title: 'Collab-AI',
    description:
      'Developed a real-time collaborative whiteboard with an AI assistant to help teams brainstorm and structure ideas. Built the initial prototype and scaled the backend infrastructure.',
    tags: ['Full-Stack Dev', 'WebSockets', 'Go', 'GCP'],
    image: getImage('project-3'),
    liveUrl: '#',
  },
];

export const skillCategories: SkillCategory[] = [
  {
    title: 'AI & Machine Learning',
    skills: [
      'Natural Language Processing',
      'Large Language Models',
      'Computer Vision',
      'Recommendation Systems',
      'Data Analysis',
      'Python',
      'PyTorch',
    ],
  },
  {
    title: 'Product Management',
    skills: [
      'Product Strategy',
      'Roadmap Planning',
      'User Research',
      'Agile Methodologies',
      'Go-to-Market Strategy',
      'A/B Testing',
      'Stakeholder Management',
    ],
  },
  {
    title: 'Technical Skills',
    skills: [
      'Next.js & React',
      'TypeScript',
      'Node.js',
      'Python & Go',
      'SQL & NoSQL',
      'AWS, GCP, Firebase',
      'Docker',
    ],
  },
];
