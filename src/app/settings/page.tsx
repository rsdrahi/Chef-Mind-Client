"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { Container } from "@/components/common/Container";
import { SectionTitle } from "@/components/common/SectionTitle";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useTheme } from "next-themes";
import { Button } from "@/components/common/Button";
import { Moon, Sun, Monitor, Bell, Mail, Shield, Smartphone } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  
  // UI State only
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    newsletter: true
  });
  
  const [accountPrefs, setAccountPrefs] = useState({
    publicProfile: true,
    showEmail: false
  });

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-32 pb-20 bg-background min-h-screen">
        <Container>
          <div className="flex flex-col md:flex-row gap-8">
            <DashboardSidebar />
            
            <div className="flex-grow flex flex-col gap-8">
              <SectionTitle 
                title="Settings" 
                subtitle="Manage your account preferences and application settings."
              />
              
              <div className="flex flex-col gap-6">
                
                {/* Theme Settings */}
                <div className="bg-surface rounded-2xl border border-border shadow-sm p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-border pb-4">
                    <Monitor size={20} className="text-primary" />
                    Appearance
                  </h3>
                  
                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-foreground/70 mb-2">Select your preferred theme for the application interface.</p>
                    <div className="grid grid-cols-3 gap-4 max-w-lg">
                      <button 
                        onClick={() => setTheme('light')}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      >
                        <Sun size={24} className={theme === 'light' ? 'text-primary' : 'text-foreground/60'} />
                        <span className="text-sm font-medium">Light</span>
                      </button>
                      <button 
                        onClick={() => setTheme('dark')}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      >
                        <Moon size={24} className={theme === 'dark' ? 'text-primary' : 'text-foreground/60'} />
                        <span className="text-sm font-medium">Dark</span>
                      </button>
                      <button 
                        onClick={() => setTheme('system')}
                        className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${theme === 'system' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
                      >
                        <Monitor size={24} className={theme === 'system' ? 'text-primary' : 'text-foreground/60'} />
                        <span className="text-sm font-medium">System</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className="bg-surface rounded-2xl border border-border shadow-sm p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-border pb-4">
                    <Bell size={20} className="text-primary" />
                    Notifications
                  </h3>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <div className="mt-1"><Mail size={20} className="text-foreground/60" /></div>
                        <div>
                          <p className="font-medium text-foreground">Email Notifications</p>
                          <p className="text-sm text-foreground/60">Receive updates about your account and activity via email.</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifications.email} onChange={(e) => setNotifications(prev => ({...prev, email: e.target.checked}))} />
                        <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-4">
                        <div className="mt-1"><Smartphone size={20} className="text-foreground/60" /></div>
                        <div>
                          <p className="font-medium text-foreground">Push Notifications</p>
                          <p className="text-sm text-foreground/60">Receive instant push notifications in your browser.</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={notifications.push} onChange={(e) => setNotifications(prev => ({...prev, push: e.target.checked}))} />
                        <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Account Preferences */}
                <div className="bg-surface rounded-2xl border border-border shadow-sm p-6 md:p-8">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-border pb-4">
                    <Shield size={20} className="text-primary" />
                    Account Privacy
                  </h3>
                  
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Public Profile</p>
                        <p className="text-sm text-foreground/60">Allow others to see your profile and public recipes.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={accountPrefs.publicProfile} onChange={(e) => setAccountPrefs(prev => ({...prev, publicProfile: e.target.checked}))} />
                        <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Show Email on Profile</p>
                        <p className="text-sm text-foreground/60">Display your email address on your public profile page.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={accountPrefs.showEmail} onChange={(e) => setAccountPrefs(prev => ({...prev, showEmail: e.target.checked}))} />
                        <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-border flex justify-end">
                    <Button onClick={handleSave} size="lg">Save Preferences</Button>
                  </div>
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
