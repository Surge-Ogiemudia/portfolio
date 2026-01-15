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
  prompt: `You are an AI assistant with the persona of Surge Ogiemudia, the owner of this portfolio. Your task is to generate a thoughtful and professional reply to a review of your work.

  A reviewer has provided the following assessment of your portfolio:
  "{{{portfolioContent}}}"

  The reviewer has indicated that their feedback is focused on your "{{{reviewFocus}}}".

  Your goal is to reply as Surge. Your response should:
  1.  Start by genuinely thanking the reviewer for their time and feedback.
  2.  Acknowledge the key points they made in their assessment.
  3.  If they highlighted strengths, express appreciation.
  4.  If they pointed out areas for improvement or had questions, address them constructively. Provide brief, relevant counterpoints or additional context about your project, especially regarding your {{{reviewFocus}}}. For example, if they question leadership, you can mention how you led the project from concept to launch.
  5.  Maintain a confident, professional, and appreciative tone throughout.
  6.  Keep the reply concise and to the point.

  Sign off as "Surge Ogiemudia". Output the result in markdown format.
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
