"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { FeaturedRecipeCard } from "@/components/home/FeaturedRecipeCard";
import { recipeService } from "@/services/recipe.service";
import { Button } from "@/components/common/Button";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Heart, Search } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function SavedRecipesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSaved = async () => {
      if (!user?.email) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);

        const data = await recipeService.getSavedRecipes(user.email);

        setSavedRecipes(data || []);
      } catch (error) {
        toast.error("Failed to load saved recipes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSaved();
  }, [user]);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-20 bg-background min-h-screen">
        <Container>
          <div className="flex flex-col md:flex-row gap-8">
            <DashboardSidebar />

            <div className="flex-grow flex flex-col gap-8">
              <SectionTitle
                title="Saved Recipes"
                subtitle="Your personal cookbook. Find all the recipes you've saved for later."
              />

              <div className="bg-surface rounded-2xl border border-border shadow-sm p-6 min-h-[400px]">
                {isLoading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <FeaturedRecipeCard key={i} isLoading={true} />
                    ))}
                  </div>
                ) : savedRecipes.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                      <Heart size={48} className="opacity-80" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground">No saved recipes</h3>
                    <p className="text-foreground/60 max-w-md mx-auto mb-8">
                      You haven't saved any recipes yet. Explore our collection and click the heart icon to save your favorites here.
                    </p>
                    <Link href="/recipes">
                      <Button size="lg" className="flex items-center gap-2">
                        <Search size={18} />
                        Explore Recipes
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedRecipes.map((item) => (
                      <FeaturedRecipeCard
                        key={item._id}
                        recipe={item.recipe}
                      />
                    ))}
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
