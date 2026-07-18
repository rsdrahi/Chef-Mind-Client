"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Recipe } from "@/types";
import { recipeService } from "@/services/recipe.service";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Edit, Trash2, Plus, Clock, ChefHat } from "lucide-react";
import toast from "react-hot-toast";

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const fetchMyRecipes = async () => {
    if (!user?.email) return;
    try {
      setIsLoading(true);
      // Fetch recipes and filter locally since backend doesn't support author query param
      const data = await recipeService.getRecipes({ limit: 100 });
      const userEmail = user.email;
      const myRecipes = data.recipes.filter(r => r.author === userEmail);
      setRecipes(myRecipes);
    } catch (error) {
      toast.error("Failed to fetch your recipes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRecipes();
  }, [user]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this recipe?")) return;

    try {
      setIsDeleting(id);
      await recipeService.deleteRecipe(id);
      toast.success("Recipe deleted successfully");
      setRecipes(recipes.filter(r => r._id !== id));
    } catch (error) {
      toast.error("Failed to delete recipe");
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-20 bg-background min-h-screen">
        <Container>
          <div className="flex flex-col md:flex-row gap-8">
            <DashboardSidebar />

            <div className="flex-grow flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <SectionTitle title="My Recipes" subtitle="Manage recipes you have created." />
                <Link href="/my-recipes/add">
                  <Button variant="primary" className="flex items-center gap-2">
                    <Plus size={18} />
                    Create Recipe
                  </Button>
                </Link>
              </div>

              <div className="bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
                {isLoading ? (
                  <div className="p-12 flex justify-center">
                    <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                  </div>
                ) : recipes.length === 0 ? (
                  <div className="p-12 text-center flex flex-col items-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                      <ChefHat size={40} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">No Recipes Yet</h3>
                    <p className="text-foreground/60 mb-6 max-w-md">
                      You haven't created any recipes yet. Start sharing your culinary creations with the world!
                    </p>
                    <Link href="/my-recipes/add">
                      <Button>Create Your First Recipe</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-hover border-b border-border text-foreground/70 text-sm">
                          <th className="p-4 font-medium">Recipe</th>
                          <th className="p-4 font-medium">Category</th>
                          <th className="p-4 font-medium hidden md:table-cell">Details</th>
                          <th className="p-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recipes.map(recipe => (
                          <tr key={recipe._id} className="border-b border-border hover:bg-surface-hover/50 transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-hover shrink-0 relative">
                                  <img
                                    src={recipe.image || "/images/placeholder.jpg"}
                                    alt={recipe.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <p className="font-bold text-foreground line-clamp-1">{recipe.title}</p>
                                  <p className="text-xs text-foreground/60">{recipe.cuisine}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                                {recipe.category}
                              </span>
                            </td>
                            <td className="p-4 hidden md:table-cell">
                              <div className="flex flex-col gap-1 text-sm text-foreground/70">
                                <div className="flex items-center gap-1">
                                  <Clock size={14} /> {recipe.cookingTime || 30} mins
                                </div>
                                <div className="flex items-center gap-1 text-xs">
                                  Diff: <span className="font-medium">{recipe.difficulty}</span>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Link href={`/my-recipes/edit/${recipe._id}`}>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-primary hover:text-primary">
                                    <Edit size={16} />
                                  </Button>
                                </Link>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  onClick={() => handleDelete(recipe._id)}
                                  isLoading={isDeleting === recipe._id}
                                >
                                  {isDeleting !== recipe._id && <Trash2 size={16} />}
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
