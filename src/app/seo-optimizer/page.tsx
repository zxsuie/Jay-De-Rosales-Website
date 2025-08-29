"use client";

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { optimizeSeoContent, type OptimizeSeoContentOutput } from "@/ai/flows/optimize-seo-content";
import { Label } from "@/components/ui/label";

type FormState = {
  data: OptimizeSeoContentOutput | null;
  error: string | null;
};

const initialState: FormState = {
  data: null,
  error: null,
};

async function seoAction(_prevState: FormState, formData: FormData): Promise<FormState> {
  const content = formData.get("content") as string;
  if (!content) {
    return { data: null, error: "Content cannot be empty." };
  }

  try {
    const result = await optimizeSeoContent({ content });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { data: null, error: `Failed to optimize content: ${errorMessage}` };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="mt-4 w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Optimizing...
        </>
      ) : (
        "Optimize Now"
      )}
    </Button>
  );
}

export default function SeoOptimizerPage() {
  const [state, formAction] = useFormState(seoAction, initialState);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-10 border-b">
        <div className="container mx-auto flex h-16 items-center justify-start px-4 sm:px-6 lg:px-8">
          <Button asChild variant="ghost" size="sm" className="-ml-3">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">SEO Content Optimizer</h1>
            <p className="mt-2 text-muted-foreground">
              Paste your content below to get AI-powered suggestions to improve your site's visibility.
            </p>
          </div>

          <form action={formAction}>
            <div className="space-y-4">
              <Label htmlFor="content" className="text-base font-medium">Enter your content</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Paste your blog post, about page content, or any text here..."
                rows={12}
                required
                className="text-base"
              />
              <div className="flex justify-end">
                <SubmitButton />
              </div>
            </div>
          </form>

          {state.error && <p className="text-destructive mt-4 text-center">{state.error}</p>}
          
          {state.data && (
            <div className="mt-12 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-headline">
                    <Sparkles className="text-primary h-5 w-5" />
                    Optimized Content
                  </CardTitle>
                  <CardDescription>
                    Here's the AI-suggested version of your content, optimized for search engines.
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-neutral dark:prose-invert max-w-none text-foreground text-base">
                  <pre className="whitespace-pre-wrap font-body bg-secondary/30 p-4 rounded-md">{state.data.optimizedContent}</pre>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-headline">Explanation</CardTitle>
                  <CardDescription>
                    An explanation of the changes made and the SEO principles applied.
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-neutral dark:prose-invert max-w-none text-foreground/90 text-base">
                   <pre className="whitespace-pre-wrap font-body bg-secondary/30 p-4 rounded-md">{state.data.explanation}</pre>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
