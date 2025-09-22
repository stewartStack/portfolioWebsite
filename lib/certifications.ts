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
        slug: "gcp-associate-cloud-engineer",
        name: "Associate Cloud Engineer",
        issuer: "Google Cloud",
        logo: "/logos/google-cloud.png",
        proofUrl: "https://example.com/proof/gcp-associate-cloud-engineer",
        status: "in_progress",
        summary: "Hands-on with IAM, GCE, GKE, Cloud Storage, and network basics.",
    },

    // --- Completed (examples) ---
    {
        slug: "coursera-ml-specialization",
        name: "Machine Learning Specialization",
        issuer: "Coursera (Andrew Ng / DeepLearning.AI)",
        logo: "/logos/coursera.png",
        proofUrl: "https://example.com/proof/coursera-ml-specialization",
        status: "completed",
        issuedOn: "2024-12",
        summary: "Supervised learning, regularization, and ML strategy foundations.",
    },
    {
        slug: "microsoft-az900",
        name: "Microsoft Azure Fundamentals (AZ-900)",
        issuer: "Microsoft",
        logo: "/logos/azure.png",
        proofUrl: "https://example.com/proof/az-900",
        status: "completed",
        issuedOn: "2024-05",
        summary: "Cloud concepts, Azure services, pricing, SLAs, and lifecycles.",
    },
];
