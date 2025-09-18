import "@/styling/globals.css"
import type { Metadata } from "next";
import AutoHideHeader from "@/components/AutoHideHeader";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Projects, research, notes, and contact.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body className="min-h-dvh antialiased">
      <AutoHideHeader />
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      <footer className="mx-auto max-w-5xl px-4 py-10 text-sm opacity-70">
        © {new Date().getFullYear()} Noah Stewart
      </footer>
      <Analytics />
      <SpeedInsights />
      </body>
      </html>
  );
}
