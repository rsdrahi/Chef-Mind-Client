"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { recipeService } from "@/services/recipe.service";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { Button } from "@/components/common/Button";
import { ArrowLeft, Save, Plus, Trash2, Tag as TagIcon } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AddRecipePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);


  // Form State
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    category: "Breakfast",
    cuisine: "Italian",
    difficulty: "Easy",
    cookingTime: 30,
    servings: 2,
    description: "",
    featured: false,
  });

  const [ingredients, setIngredients] = useState<string[]>([""]);
  const [instructions, setInstructions] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([""]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleDynamicChange = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number, value: string) => {
    setter(prev => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleAddField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => [...prev, ""]);
  };

  const handleRemoveField = (setter: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("You must be logged in to create a recipe");
      return;
    }

    const finalIngredients = ingredients.filter(i => i.trim() !== "");
    const finalInstructions = instructions.filter(i => i.trim() !== "");
    const finalTags = tags.filter(i => i.trim() !== "");

    if (finalIngredients.length === 0) return toast.error("Please add at least one ingredient.");
    if (finalInstructions.length === 0) return toast.error("Please add at least one instruction.");

    try {
      setIsLoading(true);

      const payload = {
        ...formData,
        author: user.email,
        ingredients: finalIngredients,
        instructions: finalInstructions,
        tags: finalTags,
      };

      await recipeService.createRecipe(payload);
      toast.success("Recipe created successfully!");
      router.push("/my-recipes");
    } catch (error) {
      toast.error("Failed to create recipe. Please try again.");
    } finally {
      setIsLoading(false);
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
              <div className="flex items-center gap-4">
                <Link href="/my-recipes">
                  <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full bg-surface">
                    <ArrowLeft size={18} />
                  </Button>
                </Link>
                <SectionTitle title="Create Recipe" subtitle="Share your delicious creation." />
              </div>

              <div className="bg-surface rounded-2xl border border-border shadow-sm p-6 md:p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Recipe Title <span className="text-red-500">*</span></label>
                      <input
                        required
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                        placeholder="E.g., Creamy Tomato Pasta"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Image URL <span className="text-red-500">*</span></label>
                      <input
                        required
                        type="url"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>

                  {/* Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                      >
                        <option>Breakfast</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Dessert</option>
                        <option>Snack</option>
                        <option>Beverage</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Cuisine</label>
                      <select
                        name="cuisine"
                        value={formData.cuisine}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                      >
                        <option>Italian</option>
                        <option>Mexican</option>
                        <option>Asian</option>
                        <option>American</option>
                        <option>Indian</option>
                        <option>Mediterranean</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Difficulty</label>
                      <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                      >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                      </select>
                    </div>
                  </div>

                  {/* Numbers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Cooking Time (minutes)</label>
                      <input
                        required
                        type="number"
                        min="1"
                        name="cookingTime"
                        value={formData.cookingTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-foreground">Servings</label>
                      <input
                        required
                        type="number"
                        min="1"
                        name="servings"
                        value={formData.servings}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">Description <span className="text-red-500">*</span></label>
                    <textarea
                      required
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-shadow resize-none"
                      placeholder="A short description of this recipe..."
                    ></textarea>
                  </div>

                  <hr className="border-border my-2" />

                  {/* Dynamic Ingredients */}
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-medium text-foreground flex items-center justify-between">
                      <span>Ingredients <span className="text-red-500">*</span></span>
                    </label>
                    {ingredients.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          required
                          value={item}
                          onChange={(e) => handleDynamicChange(setIngredients, idx, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-shadow"
                          placeholder="e.g. 2 cups flour"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="p-3 text-destructive hover:bg-destructive/10 shrink-0 h-[50px] w-[50px]"
                          onClick={() => handleRemoveField(setIngredients, idx)}
                          disabled={ingredients.length === 1}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" className="w-fit mt-1" onClick={() => handleAddField(setIngredients)}>
                      <Plus size={16} className="mr-1" /> Add Ingredient
                    </Button>
                  </div>

                  {/* Dynamic Instructions */}
                  <div className="flex flex-col gap-3 mt-4">
                    <label className="text-sm font-medium text-foreground flex items-center justify-between">
                      <span>Instructions <span className="text-red-500">*</span></span>
                    </label>
                    {instructions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-surface-hover flex items-center justify-center text-sm font-medium mt-2">
                          {idx + 1}
                        </div>
                        <textarea
                          required
                          value={item}
                          onChange={(e) => handleDynamicChange(setInstructions, idx, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/50 outline-none transition-shadow resize-none"
                          placeholder="Describe this step..."
                          rows={2}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          className="p-3 text-destructive hover:bg-destructive/10 shrink-0 h-[50px] w-[50px] mt-1"
                          onClick={() => handleRemoveField(setInstructions, idx)}
                          disabled={instructions.length === 1}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" className="w-fit mt-1" onClick={() => handleAddField(setInstructions)}>
                      <Plus size={16} className="mr-1" /> Add Step
                    </Button>
                  </div>

                  {/* Dynamic Tags */}
                  <div className="flex flex-col gap-3 mt-4">
                    <label className="text-sm font-medium text-foreground flex items-center justify-between">
                      <span>Tags</span>
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {tags.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1 bg-surface-hover border border-border px-3 py-1.5 rounded-xl">
                          <TagIcon size={14} className="text-foreground/60" />
                          <input
                            value={item}
                            onChange={(e) => handleDynamicChange(setTags, idx, e.target.value)}
                            className="bg-transparent border-none outline-none w-24 text-sm"
                            placeholder="e.g. vegan"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveField(setTags, idx)}
                            className="text-foreground/40 hover:text-destructive transition-colors ml-1"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                      <Button type="button" variant="ghost" size="sm" className="h-[38px] px-3 bg-surface-hover" onClick={() => handleAddField(setTags)}>
                        <Plus size={16} />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-6">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      className="w-5 h-5 rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor="featured" className="text-sm font-medium text-foreground cursor-pointer">
                      Mark as Featured Recipe
                    </label>
                  </div>

                  <div className="mt-4 flex justify-end pt-6 border-t border-border">
                    <Button type="submit" size="lg" className="px-8 flex items-center gap-2" isLoading={isLoading}>
                      <Save size={18} />
                      Save Recipe
                    </Button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
