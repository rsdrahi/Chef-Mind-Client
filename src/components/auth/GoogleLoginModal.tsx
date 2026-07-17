"use client";

import * as React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../common/Button";
import Image from "next/image";

export function GoogleLoginModal() {
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    // Check if it's the user's first visit
    const hasVisited = localStorage.getItem("chefmind_visited");
    if (!hasVisited) {
      // Show modal after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        localStorage.setItem("chefmind_visited", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background border border-border shadow-2xl rounded-3xl p-8 max-w-md w-full pointer-events-auto relative overflow-hidden"
            >
              {/* Decoration */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl"></div>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-foreground/50 hover:text-foreground bg-surface hover:bg-surface-hover rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="text-center mb-8 pt-4">
                <div className="w-16 h-16 bg-surface rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm border border-border">
                  <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Welcome to ChefMind</h3>
                <p className="text-foreground/70 text-sm">
                  Join our community of home chefs and unlock personalized recipe recommendations, meal planning, and more.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full flex items-center justify-center gap-3 bg-surface hover:bg-surface-hover h-14 rounded-xl text-base"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>
                
                <p className="text-center text-xs text-foreground/50 mt-2">
                  By joining, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
