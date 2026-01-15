import { personalInfo } from '@/lib/data';
import { Button } from '../ui/button';
import { Linkedin, Mail } from 'lucide-react';

const WhatsappIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    <path d="M14.05 16.97C13.6 15.72 12.38 15 11 15s-2.6.72-3.05 1.97" />
  </svg>
);

export function HeroSection() {
  return (
    <section id="home" className="py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-primary sm:text-6xl">
          {personalInfo.name}
        </h1>
        <h2 className="mt-4 font-headline text-2xl font-medium tracking-tight sm:text-4xl">
          {personalInfo.title}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground/80">
          {personalInfo.introduction}
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button size="lg" asChild variant="outline">
            <a href={`https://wa.me/${personalInfo.whatsapp}`} target="_blank" rel="noopener noreferrer">
              <WhatsappIcon />
              WhatsApp
            </a>
          </Button>
          <Button size="lg" asChild variant="outline">
            <a href={`mailto:${personalInfo.email}`}>
              <Mail />
              Email
            </a>
          </Button>
          <Button size="lg" asChild variant="outline">
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin />
              LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
