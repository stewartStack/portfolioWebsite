// lib/certifications.ts

export type Certification = {
    slug: string;
    name: string;                // e.g., "Google Cloud Digital Leader"
    issuer: string;              // e.g., "Google Cloud", "Coursera", "Georgia Tech"
    logo: string;                // path under /public (e.g., "/logos/google-cloud.png")
    proofUrl: string;            // link to certificate/proof page
    status: "in_progress" | "completed";
    issuedOn?: string;           // e.g., "2025-06"
    expiresOn?: string;          // optional expiry
    summary?: string;            // optional short blurb
};

export const certifications: Certification[] = [
    // --- In Progress ---
    {
        slug: "microsoft-az900",
        name: "Microsoft Azure Fundamentals (AZ-900)",
        issuer: "Microsoft",
        logo: "/images/logos/microsoft-certified-fundamentals-badge.svg",
        proofUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/?practice-assessment-type=certification",
        status: "in_progress",
        summary: "Cloud concepts, Azure services, pricing, SLAs, and lifecycles.",
    },
    // --- Completed (examples) ---
    {
        slug: "coursera-linear-specialization",
        name: "Specialization: Linear Algebra from Elementary to Advanced",
        issuer: "Coursera + Johns Hopkins University",
        logo: "/images/logos/jh-logo.jpg",
        proofUrl: "https://coursera.org/share/b0d7585fd72db6a68139d5c38f16d213",
        status: "completed",
        issuedOn: "2024-10",
        summary: "Linear Algebra, Applied Mathematics",
    },
    {
        slug: "google-ai-specialization",
        name: "Specialization: Introduction to Generative AI Learning Path",
        issuer: "Coursera + Google",
        logo: "/images/logos/google-cloud-logo.png",
        proofUrl: "https://coursera.org/share/69f45dd8b7a72f293885e6a5c3c9ab25",
        status: "completed",
        issuedOn: "2024-11",
        summary: "Generative AI, Deep Learning, Prompt Patterns, Responsible AI",
    },
];
