// app/certifications/page.tsx
import type { Metadata } from "next";
import CertificationCard from "@/components/CertificationCard";
import { certifications } from "@/lib/certifications";

export const metadata: Metadata = {
    title: "Certifications — Noah Stewart",
    description:
        "Current and completed certifications with verified links. Cloud, ML, and analytics credentials.",
    openGraph: {
        title: "Certifications — Noah Stewart",
        description:
            "Current and completed certifications with verified links. Cloud, ML, and analytics credentials.",
        type: "website",
        url: "/certifications",
    },
};

export default function CertificationsPage() {
    const inProgress = certifications.filter((c) => c.status === "in_progress");
    const completed = certifications.filter((c) => c.status === "completed");

    return (
        <main className="mx-auto max-w-5xl px-4 py-1">
            {/* Hero */}
            <section className="mb-10">
                <h1 className="text-4xl font-semibold tracking-tight">Certifications</h1>
                <p className="mt-3 max-w-2xl text-pretty text-sm/6 text-muted-foreground">
                    Proof-backed credentials. Click any card to view verification or details.
                </p>
            </section>

            {/* In Progress */}
            <section className="space-y-4 mb-10">
                <h2 className="text-xl font-medium">Currently Working Towards</h2>
                {inProgress.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        Nothing in progress right now—new goals coming soon.
                    </p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {inProgress.map((item) => (
                            <CertificationCard key={item.slug} item={item} />
                        ))}
                    </div>
                )}
            </section>

            {/* Completed */}
            <section className="space-y-4">
                <h2 className="text-xl font-medium">Completed</h2>
                {completed.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No completed certifications yet—check back soon.
                    </p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2">
                        {completed.map((item) => (
                            <CertificationCard key={item.slug} item={item} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
