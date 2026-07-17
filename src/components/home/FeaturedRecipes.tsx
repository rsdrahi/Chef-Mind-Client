import { Container } from "../common/Container";
import { SectionTitle } from "../common/SectionTitle";
import { FeaturedRecipeCard } from "./FeaturedRecipeCard";
import { Button } from "../common/Button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FeaturedRecipes() {
  // We simulate 6 loading skeletons as requested
  const loadingCards = Array.from({ length: 6 }).map((_, i) => i);

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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {loadingCards.map((index) => (
            <FeaturedRecipeCard key={index} isLoading={true} />
          ))}
        </div>
      </Container>
    </section>
  );
}
