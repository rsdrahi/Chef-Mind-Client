"use client";

import { useEffect, useState } from "react";
import { Container } from "../common/Container";
import { SectionTitle } from "../common/SectionTitle";
import { FeaturedRecipeCard } from "./FeaturedRecipeCard";
import { Button } from "../common/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { recipeService } from "@/services/recipe.service";
import { Recipe } from "@/types";

export function FeaturedRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await recipeService.getFeaturedRecipes();
        if (response && Array.isArray(response)) {
          // Display only four recipes as requested
          setRecipes(response.slice(0, 4));
        } else {
          setError("Failed to load featured recipes.");
        }
      } catch (err) {
        setError("An error occurred while loading featured recipes.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const loadingCards = Array.from({ length: 4 }).map((_, i) => i);

  return (
    <section className="py-20 bg-background">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionTitle 
            title="Featured Recipes" 
            subtitle="Discover our hand-picked selection of the most delicious and highly-rated recipes from around the world."
          />
          <Link href="/recipes" className="shrink-0">
            <Button variant="outline" className="group">
              View All
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        
        {error ? (
          <div className="w-full p-8 text-center bg-surface border border-border rounded-2xl">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
          </div>
        ) : recipes.length === 0 && !isLoading ? (
          <div className="w-full p-8 text-center bg-surface border border-border rounded-2xl">
            <p className="text-foreground/70">No featured recipes found at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {isLoading 
              ? loadingCards.map((index) => (
                  <FeaturedRecipeCard key={index} isLoading={true} />
                ))
              : recipes.map((recipe) => (
                  <FeaturedRecipeCard key={recipe._id} isLoading={false} recipe={recipe} />
                ))
            }
          </div>
        )}
      </Container>
    </section>
  );
}
