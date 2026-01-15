import { projects } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ExternalLink, Github, Wrench } from 'lucide-react';

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-16 py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Projects
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            Selected projects where I turned ideas into AI-powered realities.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col overflow-hidden transition-all hover:scale-105"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.image.imageUrl}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  data-ai-hint={project.image.imageHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">
                  {project.title}
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                {project.technicalDescription && (
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm">
                        <div className="flex items-center gap-2">
                          <Wrench className="h-4 w-4" />
                          Technical Snapshot
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-foreground/80">
                        {project.technicalDescription}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                {project.sourceUrl && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={project.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code`}
                    >
                      <Github />
                    </a>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button variant="outline" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
