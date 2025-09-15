import "@/styling/globals.css"
import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Your Name — Portfolio",
  description: "Projects, research, notes, and contact.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <body className="min-h-dvh antialiased">
      <header className="sticky top-0 border-b px-4 py-3 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between">
          <a href="/" className="font-semibold">Noah Stewart</a>
            <ul className="flex gap-4 text-sm">
                <li><a href="/projects" className="hover:underline">Projects</a></li>
                <li><a href="/readings" className="hover:underline">Readings</a></li>
                <li><a href="/research" className="hover:underline">Research</a></li>
                <li><a href="/resume" className="hover:underline">Resume</a></li>
                <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
      <footer className="mx-auto max-w-5xl px-4 py-10 text-sm opacity-70">
        © {new Date().getFullYear()} Noah Stewart
      </footer>
      </body>
      </html>
  );
}
