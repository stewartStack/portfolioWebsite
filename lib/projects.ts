export type Project = {
    slug: string;
    title: string;
    summary: string;
    year: number;
    tags: string[];
    stack: string[];
    metrics?: { label: string; value: string }[];
    images?: string; // /images/...
    links?: { code?: string; demo?: string };
};

export const projects: Project[] = [
    {
        slug: "battery-dispatch",
        title: "Battery Dispatch Optimizer",
        summary: "Reduced peak charges via ML-backed dispatch.",
        year: 2025,
        tags: ["energy", "ml"],
        stack: ["Next.js", "Python API"],
        metrics: [{ label: "Peak cost ↓", value: "18%" }],
        images: "/images/projects/batteryDEFAULT.png",
        links: { code: "https://github.com", demo: "#" }
    },
    {
        slug: "hardest-game",
        title: "The World's Hardest Game, Georgia Tech Edition",
        summary: "Gameboy Emulated Version of The World's Hardest Game in C",
        year: 2025,
        tags: ["constrained programming", "C"],
        stack: ["Next.js", "Python API"],
        metrics: [{ label: "Peak cost ↓", value: "18%" }],
        links: { code: "https://github.com/you/dispatch", demo: "#" }

    }
];
