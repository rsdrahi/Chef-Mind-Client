import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { FeaturedRecipeCard } from "@/components/home/FeaturedRecipeCard";

export default function SavedRecipesPage() {
  const loadingCards = Array.from({ length: 4 }).map((_, i) => i);

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-20 min-h-screen">
        <Container>
          <SectionTitle 
            title="Saved Recipes" 
            subtitle="Your personal cookbook. Find all the recipes you've saved for later."
            className="mb-12"
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loadingCards.map((index) => (
              <FeaturedRecipeCard key={index} isLoading={true} />
            ))}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
