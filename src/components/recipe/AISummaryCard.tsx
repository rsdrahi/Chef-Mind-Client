import { Sparkles } from "lucide-react";

export function AISummaryCard() {
  return (
    <div className="w-full relative overflow-hidden bg-gradient-to-br from-primary/10 via-surface to-secondary/10 border border-primary/20 rounded-3xl p-6 md:p-8 mt-8 shadow-sm group">
      {/* Background decorations */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-colors duration-500"></div>
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/20 rounded-full blur-2xl group-hover:bg-secondary/30 transition-colors duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shadow-sm border border-primary/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            AI Chef Summary
          </h3>
        </div>
        
        <div className="space-y-3 text-foreground/80 leading-relaxed text-sm md:text-base">
          <p>
            This recipe is a delightful balance of savory flavors and fresh ingredients, perfect for a quick weeknight dinner or a relaxed weekend meal. 
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Health benefits:</strong> Packed with essential vitamins and lean protein to keep you energized.</li>
            <li><strong>Chef's tip:</strong> For the best results, ensure your pan is perfectly heated before adding the main ingredients to achieve that beautiful sear.</li>
            <li><strong>Pairing:</strong> Best enjoyed with a crisp, dry white wine or a refreshing sparkling water with lime.</li>
          </ul>
        </div>
        
        <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface/50 border border-border text-xs text-foreground/60 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Powered by ChefMind AI
        </div>
      </div>
    </div>
  );
}
