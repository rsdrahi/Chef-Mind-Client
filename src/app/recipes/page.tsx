"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { FeaturedRecipeCard } from "@/components/home/FeaturedRecipeCard";
import { recipeService } from "@/services/recipe.service";
import { Recipe, RecipeFilters, Pagination } from "@/types";
import { Button } from "@/components/common/Button";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

// Wrapping the main content in a component that uses SearchParams
function RecipesContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for recipes and meta
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Local filter states derived from URL
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [cuisine, setCuisine] = useState(searchParams.get("cuisine") || "");
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "-createdAt");
  
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 12;

  // Fetch function
  const fetchRecipes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const filters: RecipeFilters = {
        search: searchParams.get("search") || undefined,
        category: searchParams.get("category") || undefined,
        cuisine: searchParams.get("cuisine") || undefined,
        difficulty: searchParams.get("difficulty") || undefined,
        sort: searchParams.get("sort") || "-createdAt",
        page: parseInt(searchParams.get("page") || "1"),
        limit: 12,
      };

      const response = await recipeService.getRecipes(filters);
      if (response && response.success) {
        setRecipes(response.recipes);
        setPagination({
          total: response.totalRecipies,
          page: response.currentPage,
          limit: 12,
          totalPages: response.totalPages,
        });
      } else {
        setError("Failed to load recipes.");
      }
    } catch (err) {
      setError("An error occurred while loading recipes.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  // Handle applying filters (updates URL)
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (cuisine) params.set("cuisine", cuisine);
    if (difficulty) params.set("difficulty", difficulty);
    if (sort) params.set("sort", sort);
    params.set("page", "1"); // reset to page 1 on filter change
    
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setCuisine("");
    setDifficulty("");
    setSort("-createdAt");
    router.push(pathname);
  };

  const handlePageChange = (newPage: number) => {
    if (!pagination) return;
    if (newPage < 1 || newPage > pagination.totalPages) return;
    
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadingCards = Array.from({ length: 12 }).map((_, i) => i);

  return (
    <Container>
      <SectionTitle 
        title="All Recipes" 
        subtitle="Browse our entire collection of delicious and healthy recipes."
        className="mb-8"
      />
      
      {/* Filters Section */}
      <div className="bg-surface border border-border rounded-2xl p-6 mb-10 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-foreground/40" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
              className="block w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              placeholder="Search recipes by title, ingredients..."
            />
          </div>
          
          <div className="flex gap-4 flex-col sm:flex-row">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">All Categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Desserts">Desserts</option>
              <option value="Healthy">Healthy</option>
              <option value="Snacks">Snacks</option>
            </select>

            <select
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">All Cuisines</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Asian">Asian</option>
              <option value="Indian">Indian</option>
              <option value="American">American</option>
              <option value="Mediterranean">Mediterranean</option>
            </select>

            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-sm text-foreground/60">Sort by:</span>
            <select
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                // Auto-apply sort change
                const params = new URLSearchParams(searchParams.toString());
                params.set("sort", e.target.value);
                params.set("page", "1");
                router.push(`${pathname}?${params.toString()}`);
              }}
              className="px-3 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="-createdAt">Newest First</option>
              <option value="createdAt">Oldest First</option>
              <option value="-rating">Highest Rated</option>
              <option value="time">Fastest to Cook</option>
            </select>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="ghost" onClick={clearFilters} className="flex-1 sm:flex-none">
              Clear
            </Button>
            <Button onClick={applyFilters} className="flex-1 sm:flex-none">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {error ? (
        <div className="w-full p-12 text-center bg-surface border border-border rounded-2xl">
          <p className="text-destructive mb-4 text-lg">{error}</p>
          <Button onClick={fetchRecipes} variant="outline">Try Again</Button>
        </div>
      ) : recipes.length === 0 && !isLoading ? (
        <div className="w-full p-16 text-center bg-surface border border-border rounded-2xl flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center mb-4">
            <Search className="w-10 h-10 text-foreground/30" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No recipes found</h3>
          <p className="text-foreground/70 mb-6 max-w-md mx-auto">
            We couldn't find any recipes matching your current filters. Try adjusting your search or clearing filters.
          </p>
          <Button onClick={clearFilters} variant="outline">Clear All Filters</Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {isLoading
              ? loadingCards.map((index) => (
                  <FeaturedRecipeCard key={index} isLoading={true} />
                ))
              : recipes.map((recipe) => (
                  <FeaturedRecipeCard key={recipe._id} isLoading={false} recipe={recipe} />
                ))}
          </div>

          {/* Pagination */}
          {!isLoading && pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: pagination.totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  // Simple pagination: show current, first, last, and surrounding pages
                  if (
                    pageNum === 1 || 
                    pageNum === pagination.totalPages || 
                    (pageNum >= pagination.page - 1 && pageNum <= pagination.page + 1)
                  ) {
                    return (
                      <Button
                        key={pageNum}
                        variant={pageNum === pagination.page ? "primary" : "ghost"}
                        className={`w-11 h-11 ${pageNum !== pagination.page ? "text-foreground" : ""}`}
                        onClick={() => handlePageChange(pageNum)}
                      >
                        {pageNum}
                      </Button>
                    );
                  } else if (
                    pageNum === pagination.page - 2 || 
                    pageNum === pagination.page + 2
                  ) {
                    return <span key={pageNum} className="flex items-center px-2 text-foreground/50">...</span>;
                  }
                  return null;
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </>
      )}
    </Container>
  );
}

export default function RecipesPage() {
  return (
    <>
      <main className="flex-grow pt-32 pb-20">
        <Suspense fallback={
          <Container>
            <SectionTitle title="All Recipes" subtitle="Loading recipes..." className="mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <FeaturedRecipeCard key={i} isLoading={true} />
              ))}
            </div>
          </Container>
        }>
          <RecipesContent />
        </Suspense>
      </main>
    </>
  );
}
