export type ResearchItem = {
    slug: string;
    title: string;
    authors: string[];            // order matters; we’ll bold you in the card
    year?: number;                // optional display
    status?: string;              // e.g., "Forthcoming (2025)"
    abstract: string;
    tags: string[];               // for future filters, same idea as projects
    draftUrl?: string;            // preprint / PDF
    codeUrl?: string;             // repo or data link
};

export const research: ResearchItem[] = [
    {
        slug: "ky-renewable-capacity-factors",
        title: "Renewable Energy Capacity Factors in Kentucky",
        authors: ["Noah Stewart", "Co-Author 1", "Co-Author 2"],
        status: "Forthcoming (2025)",
        abstract:
            "This study analyzes solar, wind, and hydro capacity factors across Kentucky, highlighting spatial and temporal variability in renewable output and implications for economic dispatch and grid integration.",
        tags: ["Energy Analytics", "Optimization", "Grid Simulation"],
        // draftUrl: "https://example.com/preprint.pdf",
        // codeUrl: "https://github.com/noahst/ky-capacity-factors",
    },
];
