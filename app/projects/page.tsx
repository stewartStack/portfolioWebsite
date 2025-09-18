"use client";  // important: enables React state/hooks
import { useMemo, useState } from "react";
import { projects } from "@/lib/projects"; // where your project data lives

const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort();

export default function ProjectsPage() {
    const [q, setQ] = useState("");
    const [tag, setTag] = useState<string | null>(null);

    // filter the projects based on search + tag
    const list = useMemo(() =>
            projects.filter(p =>
                (!tag || p.tags.includes(tag)) &&
                (q === "" || (p.title + p.summary).toLowerCase().includes(q.toLowerCase()))
            ),
        [q, tag]
    );

    return (
        <section className="space-y-6">
            {/* Controls */}
            <div className="flex gap-2">
                <input
                    className="border p-2 rounded"
                    placeholder="Search…"
                    value={q}
                    onChange={e => setQ(e.target.value)}
                />
                <select
                    className="border p-2 rounded"
                    value={tag ?? ""}
                    onChange={e => setTag(e.target.value || null)}
                >
                    <option value="">All</option>
                    {allTags.map(t => <option key={t}>{t}</option>)}
                </select>
            </div>

            {/* Project cards */}
            <div className="grid gap-4 sm:grid-cols-2">
                {list.map(p => (
                    <a
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className="rounded-xl border card--hover card--muted p-4 hover:shadow-lg transition"
                    >
                        <h3 className="font-semibold">{p.title}</h3>
                        <p className="text-sm opacity-80">{p.summary}</p>
                    </a>
                ))}
            </div>
        </section>
    );
}
