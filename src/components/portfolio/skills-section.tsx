import { skillCategories } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BrainCircuit, Briefcase, Code } from 'lucide-react';

const iconMap: { [key: string]: React.ReactNode } = {
  'AI & Machine Learning': <BrainCircuit className="h-5 w-5" />,
  'Product Management': <Briefcase className="h-5 w-5" />,
  'Technical Skills': <Code className="h-5 w-5" />,
};

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-16 bg-muted/50 py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            My Expertise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            A blend of technical depth, product sense, and strategic thinking.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {skillCategories.map((category) => (
            <Card
              key={category.title}
              className="flex flex-col transition-all hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {iconMap[category.title]}
                  <span className="font-headline text-xl">{category.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
