// ============================================================
// Root Layout
// ============================================================

import type { Metadata } from "next";
import { AppShell } from "@/components/layout";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "PropManage - Property Management Platform",
  description: "A production-oriented property management system for landlords and property managers",
  keywords: ["property management", "rental", "tenant", "landlord", "payments"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-50 antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
