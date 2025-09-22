// app/research/page.tsx
import type { Metadata } from "next";
import { research } from "@/lib/research";
import ResearchCard from "@/components/ResearchCard";

export const metadata: Metadata = {
    title: "Research — Noah Stewart",
    description:
        "Exploring energy analytics, optimization, and applied computer science. Publications, preprints, and works in progress.",
    openGraph: {
        title: "Research — Noah Stewart",
        description:
            "Exploring energy analytics, optimization, and applied computer science. Publications, preprints, and works in progress.",
        type: "website",
        url: "/research",
    },
};

export default function ResearchPage() {
    return (
        <main className="mx-auto max-w-5xl px-4 py-1">
            {/* Hero */}
            <section className="mb-10">
                <h1 className="text-4xl font-semibold tracking-tight">Research</h1>
                <p className="mt-3 text-pretty text-sm/6 text-muted-foreground">
                    Exploring energy analytics, optimization, and applied computer science. This page will grow as new papers and preprints are released.
                </p>
            </section>

            {/* Content */}
            <section className="space-y-8">
                {research.map((item) => (
                    <ResearchCard key={item.slug} item={item} />
                ))}

                {/* Future work / placeholder */}
                <div className="rounded-2xl border border-gray-200 p-6 dark:border-neutral-800">
                    <h2 className="text-base font-medium">More coming soon</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Actively developing follow-up work on capacity-factor variability,
                        battery dispatch, and grid integration. Check back for preprints,
                        slides, and code links.
                    </p>
                </div>
            </section>
        </main>
    );
}
