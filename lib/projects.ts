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
    youtubeId?: string;   // NEW (e.g., "dQw4w9WgXcQ")
};

export const projects: Project[] = [
    {
        slug: "hardest-game",
        title: "The World's Hardest Game, Georgia Tech Edition",
        summary: "Gameboy Emulated Version of The World's Hardest Game in C",
        year: 2025,
        tags: ["constrained programming", "Emulation"],
        stack: ["C"],
        youtubeId: "ku-4nwQa_0U",
        writeUp: "See video above for example gameplay\nUsing C, I created a Georgia Tech version of the worlds hardest game with object detection, boundaries, and enemy collision. The game runs in docker on a Gameboy emulator, which also emulates the hardware capabilities of a Gameboy. This required me to consider the efficiency of my game throughout development and ensure it writes to the screen at the proper time to ensure there is no screen tearing. This game was developed in 1 week. If you would like to see the code, please reach out to me using the form. Georgia Tech policy does not allow me to publish the code publicly."
    },
    {
        slug: "renew-dash",
        title: "PPL Renewable Energy Dashboard",
        summary: "Developed fullstack dashboard showing real time renewable energy data",
        year: 2025,
        tags: ["Web Development", "Cloud Deployment", "Fullstack Web"],
        stack: ["React", "Vite", "Node.js", "Docker", "Google Cloud Run", "Firebase DB", "Typescript", "Javascript"],
        writeUp: "I am still working on porting this project over."
    },
    {
        slug: "battery-dispatch",
        title: "Battery Dispatch Optimizer",
        summary: "Automated Battery Dispatch with Python ",
        year: 2025,
        tags: ["energy", "python"],
        stack: ["Python"],
        writeUp: "I wrote python scripts to automate the control of kentucky's largest battery, operated by PPL Corporation. It incorporated recent research the R&D team had conducted on lithium-ion batteries to optimize safety, longevity, and efficiency. The script contained multiple operations modes, able to be controlled via a secure remote connection, and utilized object oriented programming to allow future modes to be easily added."
    },
    {
        slug: "personal-portfolio",
        title: "Personal Portfolio Website",
        summary: "Showcase personal portfolio using Next.js and TailwindCSS V4",
        year: 2025,
        tags: ["Web Development"],
        stack: ["Next.js", "React", "TailwindCSS", "Vercel", "Typescript"],
        writeUp: "I am still working on porting this project over."
    },
    {
        slug: "old-ML",
        title: "Machine Learning Projects (2020-2024)",
        summary: "Forecasted electricity demand and solar farm output with ML",
        year: 2024,
        tags: ["Machine Learning"],
        stack: ["Python", "R", "Pandas", "Tensorflow", "Scikit-Learn", "Pytorch", "XGBoost"],
        metrics: [{ label: "Peak cost ↓", value: "18%" }],
        writeUp: "I am still working on porting this project over."
    },
];
