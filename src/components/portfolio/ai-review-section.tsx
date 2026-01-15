'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { portfolioAiReviewAction } from '@/app/actions';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { MotionSection } from '../shared/motion-section';

const reviewFormSchema = z.object({
  portfolioContent: z
    .string()
    .min(50, { message: 'Please provide at least 50 characters of feedback.' }),
  reviewFocus: z.enum(['technical achievements', 'managerial skills'], {
    required_error: 'You need to select a review focus.',
  }),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

export function AiReviewSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      portfolioContent: '',
      reviewFocus: 'technical achievements',
    },
  });

  async function onSubmit(data: ReviewFormValues) {
    setIsLoading(true);
    setAiFeedback(null);
    setError(null);

    const result = await portfolioAiReviewAction(data);

    if (result.success) {
      setAiFeedback(result.data.feedback);
    } else {
      setError(result.error || 'An unexpected error occurred.');
    }

    setIsLoading(false);
  }

  return (
    <MotionSection id="review" className="scroll-mt-16 bg-muted/50 py-24 sm:py-32">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            AI-Powered Review
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
            As a reviewer, share your thoughts on my portfolio. My AI assistant
            will analyze your input and provide a meta-review.
          </p>
        </div>
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Get an Instant AI Perspective
            </CardTitle>
            <CardDescription>
              Enter your assessment below, select a focus area, and see what the
              AI thinks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 md:grid-cols-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="portfolioContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Assessment of the Portfolio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., 'The projects demonstrate strong technical skills but could better highlight leadership experience...'"
                            className="min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="reviewFocus"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Focus the AI's Review On...</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="technical achievements" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Technical Achievements
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="managerial skills" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Managerial Skills
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Sparkles />
                    )}
                    Generate Feedback
                  </Button>
                </form>
              </Form>
              <div className="flex flex-col">
                <h3 className="mb-4 font-headline text-lg font-medium">
                  AI Assistant's Response
                </h3>
                <Card className="flex-grow bg-background">
                  <CardContent className="p-6">
                    {isLoading && (
                      <div className="flex flex-col items-center justify-center gap-4 text-center h-full">
                        <Bot className="h-10 w-10 animate-pulse text-primary" />
                        <p className="text-muted-foreground">
                          Analyzing your feedback...
                        </p>
                      </div>
                    )}
                    {error && (
                      <div className="text-destructive">{error}</div>
                    )}
                    {aiFeedback && (
                      <div
                        className="prose prose-sm dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: aiFeedback.replace(/\n/g, '<br />') }}
                      />
                    )}
                    {!isLoading && !aiFeedback && !error && (
                      <div className="flex flex-col items-center justify-center gap-4 text-center h-full">
                        <Bot className="h-10 w-10 text-muted-foreground/50" />
                        <p className="text-muted-foreground">
                          The AI's feedback will appear here.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MotionSection>
  );
}
