import { personalInfo } from '@/lib/data';
import { Button } from '../ui/button';
import { Mail } from 'lucide-react';

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
        <div className="mt-10">
          <Button size="lg" asChild>
            <a href={`mailto:${personalInfo.email}`}>
              <Mail />
              Get in Touch
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
