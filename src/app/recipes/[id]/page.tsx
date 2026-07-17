import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Container } from "@/components/common/Container";
import { Skeleton } from "@/components/common/Skeleton";

export default function RecipeDetailsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <Container>
          {/* Skeleton Layout for Recipe Details */}
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
              
              <Skeleton className="w-48 h-12 rounded-full mt-4" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <div className="lg:col-span-1 flex flex-col gap-6">
              <Skeleton className="w-48 h-8" />
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-12" />
              ))}
            </div>
            
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Skeleton className="w-48 h-8" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="w-12 h-12 shrink-0 rounded-full" />
                  <Skeleton className="w-full h-24" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
