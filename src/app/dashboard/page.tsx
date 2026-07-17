import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Settings, Heart, ChefHat, User } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-20 bg-background min-h-screen">
        <Container>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
              <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm sticky top-24">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-md">
                    U
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground">User Name</h3>
                    <p className="text-xs text-foreground/60">user@example.com</p>
                  </div>
                </div>
                
                <nav className="flex flex-col gap-2">
                  <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium">
                    <User size={18} />
                    Profile
                  </Link>
                  <Link href="/saved-recipes" className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/70 hover:bg-surface-hover hover:text-foreground font-medium transition-colors">
                    <Heart size={18} />
                    Saved Recipes
                  </Link>
                  <Link href="/my-recipes" className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/70 hover:bg-surface-hover hover:text-foreground font-medium transition-colors">
                    <ChefHat size={18} />
                    My Recipes
                  </Link>
                  <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/70 hover:bg-surface-hover hover:text-foreground font-medium transition-colors">
                    <Settings size={18} />
                    Settings
                  </Link>
                </nav>
              </div>
            </aside>
            
            {/* Main Content */}
            <div className="flex-grow flex flex-col gap-8">
              <SectionTitle title="Dashboard" subtitle="Welcome back! Here's an overview of your activity." />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-2">
                  <div className="text-foreground/60 font-medium">Saved Recipes</div>
                  <div className="text-4xl font-bold text-primary">24</div>
                </div>
                <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-2">
                  <div className="text-foreground/60 font-medium">My Recipes</div>
                  <div className="text-4xl font-bold text-secondary">5</div>
                </div>
                <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm flex flex-col gap-2">
                  <div className="text-foreground/60 font-medium">Following</div>
                  <div className="text-4xl font-bold text-foreground">12</div>
                </div>
              </div>
              
              <div className="bg-surface rounded-2xl border border-border shadow-sm p-8">
                <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                <div className="flex flex-col gap-4 text-foreground/70">
                  <p>You saved "Spicy Noodles" 2 hours ago.</p>
                  <p>You created a new recipe "Avocado Toast" yesterday.</p>
                  <p>You updated your profile picture last week.</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
