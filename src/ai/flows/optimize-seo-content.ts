'use server';

/**
 * @fileOverview This file defines a Genkit flow for optimizing SEO content.
 *
 * - optimizeSeoContent - A function that optimizes input content for SEO.
 * - OptimizeSeoContentInput - The input type for the optimizeSeoContent function.
 * - OptimizeSeoContentOutput - The return type for the optimizeSeoContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeSeoContentInputSchema = z.object({
  content: z.string().describe('The content to be optimized for SEO.'),
});
export type OptimizeSeoContentInput = z.infer<typeof OptimizeSeoContentInputSchema>;

const OptimizeSeoContentOutputSchema = z.object({
  optimizedContent: z
    .string()
    .describe('The content optimized for SEO with suggested changes.'),
  explanation: z.string().describe('Explanation of the SEO optimizations performed.'),
});
export type OptimizeSeoContentOutput = z.infer<typeof OptimizeSeoContentOutputSchema>;

export async function optimizeSeoContent(input: OptimizeSeoContentInput): Promise<OptimizeSeoContentOutput> {
  return optimizeSeoContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeSeoContentPrompt',
  input: {schema: OptimizeSeoContentInputSchema},
  output: {schema: OptimizeSeoContentOutputSchema},
  prompt: `You are an SEO expert specializing in optimizing content for personal websites, particularly for entrepreneurs in the Philippines.

  Your task is to analyze the provided content and suggest improvements to enhance its search engine visibility. Focus on incorporating relevant keywords and SEO principles.

  The primary keywords to consider are: entrepreneur in the Philippines, business mentor, motivational speaker, startup coach.

  Provide the optimized content along with a clear explanation of the changes made and the SEO principles applied.

  Content to optimize:
  {{content}}`,
});

const optimizeSeoContentFlow = ai.defineFlow(
  {
    name: 'optimizeSeoContentFlow',
    inputSchema: OptimizeSeoContentInputSchema,
    outputSchema: OptimizeSeoContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
