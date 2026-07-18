"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./Container";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import toast from "react-hot-toast";

const publicNavLinks = [
  { name: "Home", href: "/" },
  { name: "Recipes", href: "/recipes" },
];

const privateNavLinks = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Saved Recipes", href: "/saved-recipes" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Firebase User:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isHomePage = pathname === "/";

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await signOut(auth);

      toast.success("Logged out successfully.");

      router.push("/");
    } catch (error) {
      toast.error("Failed to logout");
      console.error(error);
    }
  };

  const navLinks = user
    ? [...publicNavLinks, ...privateNavLinks]
    : publicNavLinks;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled || !isHomePage
          ? "glass shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-white shadow-sm flex items-center justify-center p-1 group-hover:shadow-md transition-shadow">
            <img
              src="/images/logo.png"
              alt="ChefMind Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <span
            className={cn(
              "font-bold text-xl tracking-tight transition-colors",
              !isScrolled && isHomePage ? "text-white drop-shadow-md" : "text-foreground"
            )}
          >
            Chef<span className="text-primary">Mind</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 bg-surface/50 dark:bg-surface/20 backdrop-blur-md px-2 py-1 rounded-full border border-border/50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                pathname === link.href
                  ? "bg-primary text-white shadow-sm"
                  : "text-foreground/80 hover:text-foreground hover:bg-surface-hover"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          {loading ? (
            <div className="flex gap-2">
              <div className="w-20 h-10 animate-pulse bg-surface-hover rounded-full"></div>
              <div className="w-20 h-10 animate-pulse bg-surface-hover rounded-full"></div>
            </div>
          ) : user ? (
            <div className="flex items-center gap-4 pl-2">
              <Link href="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md">
                  {user.displayName?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className={cn(
                  "font-medium text-sm",
                  !isScrolled && isHomePage ? "text-white drop-shadow-md" : "text-foreground"
                )}>
                  {user.displayName}
                </span>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className={cn(!isScrolled && isHomePage ? "text-white hover:text-white/80 hover:bg-white/10" : "")} onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button variant="primary" size="sm" onClick={() => router.push('/register')}>
                Get Started
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-foreground bg-surface rounded-full shadow-sm"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg md:hidden"
          >
            <div className="flex flex-col p-4 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-4 py-3 rounded-xl font-medium transition-colors",
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-surface-hover"
                  )}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-border my-2 w-full" />

              {!loading && !user ? (
                <div className="flex flex-col gap-2">
                  <Button variant="outline" className="w-full" onClick={() => { setIsMobileMenuOpen(false); router.push('/login'); }}>
                    Login
                  </Button>
                  <Button variant="primary" className="w-full" onClick={() => { setIsMobileMenuOpen(false); router.push('/register'); }}>
                    Get Started
                  </Button>
                </div>
              ) : user ? (
                <div className="flex flex-col gap-2">
                  <Link href="/dashboard" className="flex items-center gap-3 px-2 py-2 hover:bg-surface-hover rounded-xl transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {user.displayName?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{user.displayName}</p>
                      <p className="text-xs text-foreground/60">{user.email}</p>
                    </div>
                  </Link>
                  <Button variant="outline" className="w-full mt-2" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
