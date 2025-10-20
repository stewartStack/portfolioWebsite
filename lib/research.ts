export type ResearchItem = {
    slug: string;
    title: string;
    authors: string[];            // order matters; we’ll bold you in the card
    year?: number;                // optional display
    status?: string;              // e.g., "Forthcoming (2025)"
    abstract: string;
    tags: string[];               // for future filters, same idea as projects
    URL?: string;            // preprint / PDF
    codeUrl?: string;             // repo or data link
};

export const research: ResearchItem[] = [
    {
        slug: "ky-renewable-research",
        title: "The Rhythm of Renewables: Minute-by-Minute Insights from Kentucky",
        authors: ["David Beyerle","Noah Stewart", "Shaun Lavin", "Chad Alkire", "Heather Nikolic","Samuel Kelty", "Ezekiel A. Boggs", "Declan Boyle", "Lawrence E. Holloway", "Aron Patrick"],
        status: "Published",
        abstract:
            "This paper analyzes minute-by-minute performance data from seven renewable and storage assets owned and operated by the PPL Corporation in Kentucky, including hydroelectric, solar, wind, and lithium-ion battery systems. Using a full year of synchronized, high-resolution data from multiple sites in the Commonwealth, the study examines daily and seasonal capacity factor trends, explores correlations among generation types, and evaluates their alignment with utility load profiles.",
        tags: ["Energy Research", "Data Analysis", "Leadership"],
        URL: "https://uknowledge.uky.edu/ece_facpub/62/",
        // codeUrl: "https://github.com/noahst/ky-capacity-factors",
    },
];
