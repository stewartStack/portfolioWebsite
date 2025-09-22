// components/ResearchCard.tsx
import type {ResearchItem} from "@/lib/research";

type Props = {
    item: ResearchItem;
};

const tagColors: Record<string, string> = {
    "Energy Analytics": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
    "Optimization": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
    "Grid Simulation": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200",
};

export default function ResearchCard({item}: Props) {
    const {title, authors, abstract, tags, status, draftUrl, codeUrl} = item;

    return (
        <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-lg bg-white dark:bg-neutral-900">
            {/* Header */}
            <div className="mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>

                {/* Authors: bold your name */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {authors.map((a, i) => {
                        const isYou = /noah\s*stewart/i.test(a);
                        const nameEl = isYou ? (
                            <span key={a + i} className="font-semibold">
                {a}
              </span>
                        ) : (
                            <span key={a + i}>{a}</span>
                        );
                        return (
                            <span key={a + i}>
                {i > 0 && ", "} {nameEl}
              </span>
                        );
                    })}
                </p>
            </div>

            {/* Body */}
            <div className="space-y-4">
                <p className="text-base text-gray-700 dark:text-gray-300">{abstract}</p>

                {/* Tags */}
                {tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {tags.map((t) => {
                            const color = tagColors[t] ?? "bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-neutral-200";
                            return (
                                <span
                                    key={t}
                                    className={`px-3 py-1 text-xs font-medium rounded-full ${color}`}
                                >
                            {t}
                            </span>
                            );
                        })}
                    </div>
                )}
                {status && (
                    <p className="text-sm italic text-gray-500">
                        Status: {status}
                    </p>
                )}
            </div>

            {/* Footer */}
            {(draftUrl || codeUrl) && (
                <div className="mt-6 flex gap-3">
                    {draftUrl && (
                        <a
                            href={draftUrl}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
                        >
                            View Draft
                        </a>
                    )}
                    {codeUrl && (
                        <a
                            href={codeUrl}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 transition"
                        >
                            Code & Data
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
