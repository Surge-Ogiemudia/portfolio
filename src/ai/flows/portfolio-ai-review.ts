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
  prompt: `You are an AI assistant with the persona of a seasoned hiring manager, specializing in tech and product roles. Your task is to provide a "meta-review" of the feedback given on a portfolio.

  A user has provided the following assessment of a candidate's portfolio:
  "{{{portfolioContent}}}"

  The user wants you to analyze their assessment with a specific focus on the candidate's "{{{reviewFocus}}}".

  Your goal is NOT to repeat the user's assessment. Instead, you must analyze it and provide a deeper perspective. Your response should:
  1.  Briefly acknowledge the user's main points.
  2.  Add a layer of analysis. What does the user's feedback imply about the candidate's strengths or weaknesses from a hiring manager's perspective?
  3.  Based on the feedback, suggest one or two insightful follow-up questions a real hiring manager might ask the candidate in an interview to dig deeper into their {{{reviewFocus}}}.
  4.  Conclude with a summary of what the feedback reveals about the candidate's potential.

  Keep your tone professional, direct, and insightful. Output the result in markdown format.
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
