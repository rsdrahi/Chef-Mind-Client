import Link from "next/link";
import { Skeleton } from "../common/Skeleton";
import { Recipe } from "@/types";

export interface FeaturedRecipeCardProps {
  isLoading?: boolean;
  recipe?: Recipe;
}

export function FeaturedRecipeCard({ isLoading = true, recipe }: FeaturedRecipeCardProps) {
  if (isLoading || !recipe) {
    return (
      <div className="flex flex-col gap-3 p-4 rounded-2xl bg-surface border border-border shadow-sm">
        <Skeleton className="w-full h-48 rounded-xl" />
        <div className="flex justify-between items-center mt-2">
          <Skeleton className="w-20 h-5" />
          <Skeleton className="w-16 h-5" />
        </div>
        <Skeleton className="w-full h-6 mt-1" />
        <Skeleton className="w-2/3 h-6" />
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
          <Skeleton className="w-8 h-8 rounded-full" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
    );
  }

  const authorName = typeof recipe.author === 'string' ? recipe.author : recipe.author?.name || "Unknown Author";

  return (
    <div className="group flex flex-col gap-3 p-4 rounded-2xl bg-surface border border-border shadow-sm hover:shadow-md transition-shadow h-full">
      <div className="relative w-full h-48 rounded-xl overflow-hidden bg-surface-hover shrink-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
        <img src={recipe.image || "/images/placeholder.jpg"} alt={recipe.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 right-3 z-20 bg-white/90 dark:bg-black/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-foreground">
          ⭐ {recipe.rating || "New"}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-2 text-xs font-medium text-foreground/60 shrink-0">
        <span className="flex items-center gap-1">⏱️ {recipe.time || `${recipe.cookingTime || 30} mins`}</span>
        <span className="flex items-center gap-1">🍳 {recipe.difficulty}</span>
      </div>
      
      <h3 className="font-bold text-lg text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2 shrink-0">
        {recipe.title}
      </h3>

      <p className="text-sm text-foreground/70 line-clamp-2 flex-grow">
        {recipe.description}
      </p>
      
      <div className="flex items-center justify-between gap-2 mt-auto pt-4 border-t border-border shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
            {authorName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-medium text-foreground/80 truncate max-w-[80px] sm:max-w-[100px]">{authorName}</span>
        </div>
        <Link href={`/recipes/${recipe._id}`} className="shrink-0">
          <button className="text-xs font-semibold bg-surface-hover hover:bg-primary hover:text-white px-3 py-1.5 rounded-lg transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
