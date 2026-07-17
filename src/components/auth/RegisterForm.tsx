"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "../common/Button";

export function RegisterForm() {
  return (
    <div className="w-full max-w-md mx-auto bg-surface p-8 rounded-3xl border border-border shadow-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Create Account</h2>
        <p className="text-foreground/70">Join ChefMind and start cooking</p>
      </div>

      <form className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="name">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-foreground/40" />
            </div>
            <input
              id="name"
              type="text"
              className="block w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="email">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-foreground/40" />
            </div>
            <input
              id="email"
              type="email"
              className="block w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-foreground/40" />
            </div>
            <input
              id="password"
              type="password"
              className="block w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
              placeholder="••••••••"
              required
            />
          </div>
          <p className="text-xs text-foreground/50 mt-1.5 ml-1">Must be at least 8 characters</p>
        </div>

        <Button type="submit" size="lg" className="w-full mt-2">
          Create Account
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-foreground/70 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
