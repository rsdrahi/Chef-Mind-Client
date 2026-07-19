"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Container } from "@/components/common/Container";
import { Skeleton } from "@/components/common/Skeleton";
import { Button } from "@/components/common/Button";
import { Clock, ChefHat, Flame, Users, Bookmark, ArrowLeft, Tag } from "lucide-react";
import { recipeService } from "@/services/recipe.service";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Recipe } from "@/types";
import toast from "react-hot-toast";
import { AISummaryCard } from "@/components/recipe/AISummaryCard";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function RecipeDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const response = await recipeService.getRecipeById(id);
        if (response && response._id) {
          setRecipe(response);
        } else {
          setError("Recipe not found.");
        }
      } catch (err) {
        setError("Failed to load recipe details.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleSaveRecipe = async () => {
    if (!user?.email) {
      toast.error("Please login first");
      router.push("/login");
      return;
    }

    try {
      setIsSaving(true);

      await recipeService.saveRecipe(recipe!._id, user.email);

      toast.success("Recipe saved successfully");
    } catch (error: any) {
      toast.error(error?.message || "Failed to save recipe");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex-grow pt-32 pb-20">
        <Container>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="w-full lg:w-1/2">
              <Skeleton className="w-full aspect-[4/3] rounded-3xl" />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col gap-6">
              <Skeleton className="w-24 h-8 rounded-full" />
              <Skeleton className="w-3/4 h-12" />
              <Skeleton className="w-full h-24" />

              <div className="flex gap-4">
                <Skeleton className="w-32 h-12 rounded-xl" />
                <Skeleton className="w-32 h-12 rounded-xl" />
                <Skeleton className="w-32 h-12 rounded-xl" />
              </div>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  if (error || !recipe) {
    return (
      <main className="flex-grow pt-32 pb-20 flex items-center justify-center min-h-[60vh]">
        <Container className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
          <p className="text-xl text-foreground/70 mb-8">{error || "Recipe not found."}</p>
          <Button onClick={() => router.push("/recipes")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recipes
          </Button>
        </Container>
      </main>
    );
  }

  const authorName = typeof recipe.author === 'string' ? recipe.author : recipe.author?.name || "Unknown Author";
  const dateFormatted = recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString() : "Recently";

  return (
    <ProtectedRoute>
      <main className="flex-grow pt-32 pb-20">
        <Container>
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-16">
            <div className="w-full lg:w-1/2">
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-border">
                <img
                  src={recipe.image || "/images/placeholder.jpg"}
                  alt={recipe.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                  {recipe.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-sm font-semibold border border-secondary/20">
                  {recipe.cuisine}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
                {recipe.title}
              </h1>

              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-border">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                  {authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-foreground">{authorName}</p>
                  <p className="text-xs text-foreground/60">Published on {dateFormatted}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-surface rounded-2xl border border-border">
                  <Clock className="w-5 h-5 text-primary mb-1" />
                  <span className="text-xs text-foreground/60">Time</span>
                  <span className="font-semibold text-foreground text-sm">{recipe.time || `${recipe.cookingTime || 30}m`}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-surface rounded-2xl border border-border">
                  <Users className="w-5 h-5 text-primary mb-1" />
                  <span className="text-xs text-foreground/60">Serves</span>
                  <span className="font-semibold text-foreground text-sm">{recipe.servings || 2}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-surface rounded-2xl border border-border">
                  <ChefHat className="w-5 h-5 text-primary mb-1" />
                  <span className="text-xs text-foreground/60">Difficulty</span>
                  <span className="font-semibold text-foreground text-sm">{recipe.difficulty}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-surface rounded-2xl border border-border">
                  <Flame className="w-5 h-5 text-primary mb-1" />
                  <span className="text-xs text-foreground/60">Rating</span>
                  <span className="font-semibold text-foreground text-sm">⭐ {recipe.rating || "N/A"}</span>
                </div>
              </div>

              <div className="flex gap-4 mt-auto">
                <Button
                  onClick={handleSaveRecipe}
                  isLoading={isSaving}
                  className="flex-1"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Recipe
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Ingredients Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-surface border border-border rounded-3xl p-6 shadow-sm">
                <h3 className="text-2xl font-bold text-foreground mb-6 pb-4 border-b border-border">Ingredients</h3>
                <ul className="flex flex-col gap-4">
                  {(recipe.ingredients && recipe.ingredients.length > 0) ? (
                    recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                        </div>
                        <span className="text-foreground/80 leading-relaxed">{ingredient}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-foreground/60 italic">No ingredients listed.</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 flex flex-col gap-10">
              {/* Description */}
              <section>
                <h3 className="text-2xl font-bold text-foreground mb-4">About this recipe</h3>
                <p className="text-foreground/80 leading-relaxed text-lg whitespace-pre-wrap">
                  {recipe.description}
                </p>
                <AISummaryCard />
              </section>

              {/* Instructions */}
              <section>
                <h3 className="text-2xl font-bold text-foreground mb-6">Instructions</h3>
                <div className="flex flex-col gap-6">
                  {(recipe.instructions && recipe.instructions.length > 0) ? (
                    recipe.instructions.map((step, idx) => (
                      <div key={idx} className="flex gap-5">
                        <div className="shrink-0 w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center font-bold shadow-sm">
                          {idx + 1}
                        </div>
                        <p className="text-foreground/80 leading-relaxed pt-1.5">
                          {step}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-foreground/60 italic">No instructions listed.</p>
                  )}
                </div>
              </section>

              {/* Tags */}
              {recipe.tags && recipe.tags.length > 0 && (
                <section className="pt-8 border-t border-border mt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-5 h-5 text-foreground/50" />
                    <h3 className="text-lg font-bold text-foreground">Tags</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recipe.tags.map((tag, idx) => (
                      <span key={idx} className="px-4 py-2 bg-surface border border-border rounded-full text-sm text-foreground/70 hover:bg-surface-hover cursor-pointer transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </Container>
      </main>
    </ProtectedRoute>
  );
}
