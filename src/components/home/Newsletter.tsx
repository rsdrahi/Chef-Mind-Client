import { Container } from "../common/Container";
import { Button } from "../common/Button";
import { Mail } from "lucide-react";

export function Newsletter() {
  return (
    <section className="py-20">
      <Container>
        <div className="relative rounded-3xl overflow-hidden bg-surface border border-border shadow-lg">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50 pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Get Fresh Recipes Weekly
              </h2>
              <p className="text-foreground/70 text-lg">
                Join our newsletter and receive curated recipes, cooking tips, and exclusive content straight to your inbox.
              </p>
            </div>
            
            <div className="w-full md:w-1/2 max-w-md">
              <form className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-foreground/40" />
                  </div>
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="block w-full pl-11 pr-4 py-4 rounded-xl border border-border bg-background text-foreground placeholder-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow shadow-sm"
                    required
                  />
                </div>
                <Button type="submit" size="lg" className="shrink-0 rounded-xl px-8">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-foreground/50 mt-3 text-center md:text-left">
                We care about your data. Read our <a href="#" className="underline hover:text-primary">Privacy Policy</a>.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
