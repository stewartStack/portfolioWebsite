import { projects } from "@/lib/projects";
export const dynamicParams = false; // fully static
import Image from "next/image";

export function generateStaticParams() {
    return projects.map(p => ({ slug: p.slug }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const p = projects.find(x => x.slug === params.slug)!;
    return (
        <article className="prose max-w-3xl">
            <h1 className="text-balance">{p.title}</h1>
            {p.metrics?.length ? (
                <ul className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    {p.metrics.map(m => (
                        <li key={m.label} className="rounded-lg border p-3">
                            <span className="block opacity-70">{m.label}</span>
                            <span className="text-lg font-semibold">{m.value}</span>
                        </li>
                    ))}
                </ul>
            ) : null}
            <p className="mt-6">{p.summary}</p>
            {p.images && (
                <Image
                src={p.images}
                alt={p.title}
                width={800}
                height={450}
                className={"rounded-lg border"}
                />
            )}
            {/* Add sections: Problem, Approach, Results, What I'd do next */}
        </article>
    );
}
