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
        slug: "ky-renewable-research",
        title: "Renewable Energy Generation in Kentucky: A Yearlong Performance Review",
        authors: ["Noah Stewart", "Chad Alkire", "David Beyerle", "Declan Boyle", "Ezekiel A. Boggs", "Lawrence E. Holloway", "Aron Patrick"],
        status: "Forthcoming (2025)",
        abstract:
            "This study analyzes the performance of seven renewable energy assets within Kentucky, highlighting capacity factors, seasonal and daily trends, variability, and correlation with demand",
        tags: ["Energy Research", "Data Analysis", "Leadership"],
        // draftUrl: "https://example.com/preprint.pdf",
        // codeUrl: "https://github.com/noahst/ky-capacity-factors",
    },
];
