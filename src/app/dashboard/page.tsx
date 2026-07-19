"use client";

import { useEffect, useState } from "react";

import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

import { Mail, Calendar, Key } from "lucide-react";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>

      <main className="flex-grow pt-32 pb-20 bg-background min-h-screen">
        <Container>
          <div className="flex flex-col md:flex-row gap-8">
            <DashboardSidebar />

            <div className="flex-grow flex flex-col gap-8">
              <SectionTitle
                title="Profile Overview"
                subtitle="Manage your account information and preferences."
              />

              <div className="bg-surface rounded-2xl border border-border shadow-sm p-8">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border">
                  <div className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center font-bold text-4xl shadow-lg border-4 border-background">
                    {user?.displayName?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">
                      {user?.displayName || "User"}
                    </h2>

                    <p className="text-foreground/60">
                      Food Enthusiast
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background/50">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Mail size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-0.5">
                        Email Address
                      </p>

                      <p className="text-sm font-medium text-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background/50">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Calendar size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-0.5">
                        Account Created
                      </p>

                      <p className="text-sm font-medium text-foreground">
                        {user?.metadata.creationTime
                          ? new Date(
                            user.metadata.creationTime
                          ).toLocaleDateString()
                          : "Recently"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-background/50">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Key size={20} />
                    </div>

                    <div>
                      <p className="text-xs text-foreground/50 font-medium uppercase tracking-wider mb-0.5">
                        Auth Provider
                      </p>

                      <p className="text-sm font-medium text-foreground">
                        {user?.providerData?.[0]?.providerId === "google.com"
                          ? "Google"
                          : "Email & Password"}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}