import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bookmark } from "lucide-react";
import { Button } from "../common/Button";
import { Container } from "../common/Container";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="flex flex-col gap-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border w-fit mx-auto lg:mx-0 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-sm font-medium text-foreground/80">Smart cooking made easy</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight">
              Master your <br className="hidden lg:block" />
              kitchen with <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                ChefMind
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Discover millions of premium recipes, organize your weekly meals, and cook like a professional with our intelligent culinary assistant.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-4">
              <Link href="/recipes" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto group">
                  Explore Recipes
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/saved-recipes" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto group bg-surface">
                  <Bookmark className="mr-2 w-5 h-5 group-hover:fill-current transition-colors" />
                  Saved Recipes
                </Button>
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="flex items-center gap-4 justify-center lg:justify-start mt-8 pt-8 border-t border-border/50">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-surface overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-foreground/70">
                <span className="font-bold text-foreground">10,000+</span> home chefs <br />
                joined this week
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative z-10 w-full h-[400px] md:h-[500px] lg:h-[600px] animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-2xl -z-10 transform scale-95"></div>
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="/images/hero.png"
                alt="Chef preparing healthy food"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 bg-white dark:bg-surface p-4 rounded-2xl shadow-xl border border-border glass animate-bounce-slow hidden md:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">🥑</div>
              <div>
                <p className="text-xs text-foreground/60 font-medium">New Recipe</p>
                <p className="text-sm font-bold">Avocado Toast</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-surface p-4 rounded-2xl shadow-xl border border-border glass animate-pulse-slow hidden md:flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">🔥</div>
              <div>
                <p className="text-xs text-foreground/60 font-medium">Trending</p>
                <p className="text-sm font-bold">Spicy Noodles</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
