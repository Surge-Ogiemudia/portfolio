'use server';

/**
 * @fileOverview An AI-powered portfolio review flow.
 *
 * - portfolioAiReview - A function that handles the portfolio review process.
 * - PortfolioAiReviewInput - The input type for the portfolioAiReview function.
 * - PortfolioAiReviewOutput - The return type for the portfolioAiReview function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioAiReviewInputSchema = z.object({
  portfolioContent: z
    .string()
    .describe('The content of the portfolio to be reviewed.'),
  reviewFocus: z
    .enum(['technical achievements', 'managerial skills'])
    .describe(
      'The focus of the review, either technical achievements or managerial skills.'
    ),
});
export type PortfolioAiReviewInput = z.infer<typeof PortfolioAiReviewInputSchema>;

const PortfolioAiReviewOutputSchema = z.object({
  feedback: z.string().describe('The AI-driven feedback on the portfolio.'),
});
export type PortfolioAiReviewOutput = z.infer<typeof PortfolioAiReviewOutputSchema>;

export async function portfolioAiReview(
  input: PortfolioAiReviewInput
): Promise<PortfolioAiReviewOutput> {
  return portfolioAiReviewFlow(input);
}

const portfolioAiReviewPrompt = ai.definePrompt({
  name: 'portfolioAiReviewPrompt',
  input: {schema: PortfolioAiReviewInputSchema},
  output: {schema: PortfolioAiReviewOutputSchema},
  prompt: `You are an AI portfolio review assistant providing feedback on portfolios.

  Review the following portfolio content with a focus on {{{reviewFocus}}}.

  Portfolio Content: {{{portfolioContent}}}

  Provide actionable feedback to improve the portfolio.
  Be direct and concise with your feedback.
  Try to provide feedback related to accomplishments as well as managerial skills.
  If the review focus is on technical achievements, comment on the technical depth of the projects.
  If the review focus is on managerial skills, focus on leadership.
  Output the result in markdown format.
  `,
});

const portfolioAiReviewFlow = ai.defineFlow(
  {
    name: 'portfolioAiReviewFlow',
    inputSchema: PortfolioAiReviewInputSchema,
    outputSchema: PortfolioAiReviewOutputSchema,
  },
  async input => {
    const {output} = await portfolioAiReviewPrompt(input);
    return output!;
  }
);
