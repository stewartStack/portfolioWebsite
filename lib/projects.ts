export type Project = {
    slug: string;
    title: string;
    summary: string;
    year: number;
    tags: string[];
    stack: string[];
    writeUp?: string;
    metrics?: { label: string; value: string }[];
    images?: string; // /images/...
    links?: { code?: string; demo?: string };
};

export const projects: Project[] = [
    {
        slug: "battery-dispatch",
        title: "Battery Dispatch Optimizer",
        summary: "Automated Battery Dispatch with Python ",
        year: 2025,
        tags: ["energy", "python"],
        stack: ["Python"],
        metrics: [{ label: "Peak cost ↓", value: "18%" }],
        images: "/images/projects/batteryDEFAULT.png",
        links: { code: "https://github.com", demo: "#" }
    },
    {
        slug: "hardest-game",
        title: "The World's Hardest Game, Georgia Tech Edition",
        summary: "Gameboy Emulated Version of The World's Hardest Game in C",
        year: 2025,
        tags: ["constrained programming", "Emulation"],
        stack: ["C"],
        metrics: [{ label: "Peak cost ↓", value: "18%" }],
        links: { code: "https://github.com/you/dispatch", demo: "#" }
    },
    {
        slug: "old-ML",
        title: "Machine Learning Projects (2020-2024)",
        summary: "Forecasted electricity demand and solar farm output with ML",
        year: 2024,
        tags: ["Machine Learning"],
        stack: ["Python", "R", "Pandas", "Tensorflow", "Scikit-Learn", "Pytorch", "XGBoost"],
        metrics: [{ label: "Peak cost ↓", value: "18%" }],
        links: { code: "https://github.com/you/dispatch", demo: "#" }
    },
    {
        slug: "personal-portfolio",
        title: "Personal Portfolio Website",
        summary: "Showcase personal portfolio using Next.js and TailwindCSS V4",
        year: 2025,
        tags: ["Web Development"],
        stack: ["Next.js", "React", "TailwindCSS", "Vercel", "Typescript"],
        metrics: [{ label: "Peak cost ↓", value: "18%" }],
        links: { code: "https://github.com/you/dispatch", demo: "#" }
    },
    {
        slug: "renew-dash",
        title: "PPL Renewable Energy Dashboard",
        summary: "Developed fullstack dashboard showing real time renewable energy data",
        year: 2025,
        tags: ["Web Development", "Cloud Deployment", "Fullstack Web"],
        stack: ["React", "Vite", "Node.js", "Docker", "Google Cloud Run", "Firebase DB", "Typescript", "Javascript"],
        metrics: [{ label: "Peak cost ↓", value: "18%" }],
        links: { code: "https://github.com/you/dispatch", demo: "#" }
    }
];
