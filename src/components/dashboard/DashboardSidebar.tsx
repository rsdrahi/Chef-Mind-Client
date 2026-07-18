"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Settings, Heart, ChefHat, User, LogOut } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "../common/Button";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { useEffect, useState } from "react";

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm sticky top-24 animate-pulse">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-surface-hover"></div>

            <div className="flex flex-col gap-2">
              <div className="w-24 h-4 bg-surface-hover rounded"></div>
              <div className="w-32 h-3 bg-surface-hover rounded"></div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-full h-12 bg-surface-hover rounded-xl"
              />
            ))}
          </div>
        </div>
      </aside>
    );
  }

  const links = [
    {
      href: "/dashboard",
      label: "Profile",
      icon: User,
    },
    {
      href: "/saved-recipes",
      label: "Saved Recipes",
      icon: Heart,
    },
    {
      href: "/my-recipes",
      label: "My Recipes",
      icon: ChefHat,
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-surface rounded-2xl border border-border p-6 shadow-sm sticky top-24">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-md">
            {user?.displayName?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="overflow-hidden">
            <h3 className="font-bold text-foreground truncate">
              {user?.displayName || "User"}
            </h3>

            <p className="text-xs text-foreground/60 truncate">
              {user?.email}
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {links.map((link) => {
            const Icon = link.icon;

            const isActive =
              pathname === link.href ||
              (link.href !== "/dashboard" &&
                pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/70 hover:bg-surface-hover hover:text-foreground"
                )}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}