export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Recipe {
  _id: string;
  id?: string;
  title: string;
  description: string;
  image: string;
  category: string;
  cuisine: string;
  difficulty: "Easy" | "Medium" | "Hard" | string;
  time?: string;
  cookingTime?: number;
  servings?: number;
  ingredients?: string[];
  instructions?: string[];
  tags?: string[];
  author?: string | User;
  rating?: number;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RecipesResponse {
  success: boolean;
  currentPage: number;
  totalPages: number;
  totalRecipies: number; // matched backend spelling
  recipes: Recipe[];
}

export interface RecipeFilters {
  search?: string;
  category?: string;
  cuisine?: string;
  difficulty?: string;
  sort?: string;
  page?: number;
  limit?: number;
}
