import { Recipe, RecipeFilters, RecipesResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const recipeService = {
  async getRecipes(filters?: RecipeFilters): Promise<RecipesResponse> {
    try {
      const url = new URL(`${API_URL}/recipes`);

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // dynamic for search/filters
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching recipes:", error);
      throw error;
    }
  },

  async getFeaturedRecipes(): Promise<Recipe[]> {
    try {
      const response = await fetch(`${API_URL}/recipes/featured`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour, or change as needed
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch featured recipes: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching featured recipes:", error);
      throw error;
    }
  },

  async getRecipeById(id: string): Promise<Recipe> {
    try {
      const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch recipe with id ${id}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching recipe ${id}:`, error);
      throw error;
    }
  },

  async createRecipe(recipe: Partial<Recipe>): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      });
      if (!response.ok) throw new Error(`Failed to create recipe: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error creating recipe:", error);
      throw error;
    }
  },

  async updateRecipe(id: string, recipe: Partial<Recipe>): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
      });
      if (!response.ok) throw new Error(`Failed to update recipe: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(`Error updating recipe ${id}:`, error);
      throw error;
    }
  },

  async deleteRecipe(id: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/recipes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Failed to delete recipe: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(`Error deleting recipe ${id}:`, error);
      throw error;
    }
  },

  async getSavedRecipes(email: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_URL}/saved-recipes?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        cache: 'no-store',
      });
      if (!response.ok) throw new Error(`Failed to fetch saved recipes: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
      throw error;
    }
  },

  async saveRecipe(recipeId: string, userEmail: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/saved-recipes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId, userEmail }),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to save recipe`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error saving recipe:", error);
      throw error;
    }
  },

  async removeSavedRecipe(id: string): Promise<any> {
    try {
      const response = await fetch(`${API_URL}/saved-recipes/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error(`Failed to remove saved recipe: ${response.statusText}`);
      return await response.json();
    } catch (error) {
      console.error(`Error removing saved recipe ${id}:`, error);
      throw error;
    }
  }
};
