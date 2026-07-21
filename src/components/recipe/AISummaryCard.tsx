"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { generateRecipeSummary } from "@/services/recipe.service";
import { Button } from "@/components/common/Button";
import toast from "react-hot-toast";

interface AISummaryCardProps {
  title: string;
  description: string;
  ingredients: string[];
}

interface AIData {
  summary: string;
  healthBenefits: string;
  chefTip: string;
  pairing: string;
}

export function AISummaryCard({
  title,
  description,
  ingredients,
}: AISummaryCardProps) {
  const [aiData, setAiData] = useState<AIData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateAI = async () => {
    try {
      setIsLoading(true);

      const result = await generateRecipeSummary({
        title,
        description,
        ingredients,
      });

      if (result.success) {
        setAiData(result.data);
        toast.success("AI insights generated successfully!");
      } else {
        toast.error("Failed to generate AI insights");
      }
    } catch (error) {
      console.error("AI Error:", error);
      toast.error("Failed to generate AI insights");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-primary/10 via-surface to-secondary/10 border border-primary/20 rounded-3xl p-6 md:p-8 mt-8 shadow-sm group">

      {/* Background decorations */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors duration-500"></div>

      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/20 rounded-full blur-2xl group-hover:bg-secondary/30 transition-colors duration-500"></div>

      <div className="relative z-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-sm border border-primary/20">
            <Sparkles className="w-5 h-5" />
          </div>

          <h3 className="text-xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AI Chef Summary
          </h3>
        </div>

        {/* Generate Button */}
        {!aiData && (
          <div className="space-y-4">
            <p className="text-foreground/70 text-sm md:text-base">
              Get AI-powered insights about this recipe, including health
              benefits, chef tips, and the best pairing recommendations.
            </p>

            <Button
              onClick={handleGenerateAI}
              isLoading={isLoading}
            >
              <Sparkles className="w-4 h-4 mr-2" />

              {isLoading
                ? "Generating AI Insights..."
                : "Generate AI Insights"}
            </Button>
          </div>
        )}

        {/* AI Response */}
        {aiData && (
          <div className="space-y-4 text-foreground/80 leading-relaxed text-sm md:text-base">

            {/* Summary */}
            <p>
              {aiData.summary}
            </p>

            {/* AI Information */}
            <ul className="list-disc pl-5 space-y-2">

              <li>
                <strong>Health benefits:</strong>{" "}
                {aiData.healthBenefits}
              </li>

              <li>
                <strong>Chef's tip:</strong>{" "}
                {aiData.chefTip}
              </li>

              <li>
                <strong>Pairing:</strong>{" "}
                {aiData.pairing}
              </li>

            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/50 border border-border text-xs text-foreground/60 backdrop-blur-sm">

          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>

            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>

          Powered by ChefMind AI
        </div>

      </div>
    </div>
  );
}