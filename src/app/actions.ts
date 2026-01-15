'use server';

import {
  portfolioAiReview,
  type PortfolioAiReviewInput,
  type PortfolioAiReviewOutput,
} from '@/ai/flows/portfolio-ai-review';
import { z } from 'zod';

const reviewFormSchema = z.object({
  portfolioContent: z.string(),
  reviewFocus: z.enum(['technical achievements', 'managerial skills']),
});

type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function portfolioAiReviewAction(
  input: PortfolioAiReviewInput
): Promise<Result<PortfolioAiReviewOutput>> {
  const parsedInput = reviewFormSchema.safeParse(input);
  if (!parsedInput.success) {
    return {
      success: false,
      error: 'Invalid input.',
    };
  }

  try {
    const output = await portfolioAiReview(parsedInput.data);
    return { success: true, data: output };
  } catch (e: any) {
    console.error(e);
    return {
      success: false,
      error: 'Failed to get AI feedback. Please try again.',
    };
  }
}
