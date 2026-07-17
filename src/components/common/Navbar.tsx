"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";
import { Container } from "./Container";
// Assuming auth client is used, we'll mock the hook for now to only show UI as requested
import { useSession } from "@/lib/auth-client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Recipes", href: "/recipes" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Saved", href: "/saved-recipes" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  
  // Using the real auth hook if it exists, otherwise it might be null
  const { data: session, isPending } = useSession();
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

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

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
            <Image
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
          
          {isPending ? (
            <div className="flex gap-2">
              <div className="w-20 h-10 animate-pulse bg-surface-hover rounded-full"></div>
              <div className="w-20 h-10 animate-pulse bg-surface-hover rounded-full"></div>
            </div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-md cursor-pointer hover:shadow-lg transition-shadow">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
              </Link>
              <Button variant="outline" size="sm" onClick={() => {/* Logout logic handled by auth-client */}}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
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
              
              {!isPending && !session ? (
                <div className="flex flex-col gap-2">
                  <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" className="w-full">
                    <Button variant="primary" className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              ) : session ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {session.user?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <p className="font-medium">{session.user?.name}</p>
                      <p className="text-xs text-foreground/60">{session.user?.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
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
