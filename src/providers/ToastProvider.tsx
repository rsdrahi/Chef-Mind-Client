"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "var(--color-surface)",
          color: "var(--color-foreground)",
          border: "1px solid var(--color-border)",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          borderRadius: "0.75rem",
          padding: "16px",
          fontWeight: 500,
        },
        success: {
          iconTheme: {
            primary: "var(--color-primary)",
            secondary: "white",
          },
        },
        error: {
          iconTheme: {
            primary: "var(--color-destructive, #ef4444)",
            secondary: "white",
          },
        },
      }}
    />
  );
}
