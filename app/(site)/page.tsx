import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
      <section className="space-y-8">
        <h1 className="text-3xl/tight font-bold">
          Hello, I’m <span className="underline decoration-[var(--color-accent)]">Your Name</span>.
        </h1>
        <p className="max-w-prose">
          I build <b>clean, fast</b> web apps and do research in energy/AI. This site is minimal by design:
          Next.js 15 + Tailwind v4 only.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <a className="rounded-xl border p-4 hover:shadow">
            <h2 className="font-semibold">Featured Project →</h2>
            <p className="text-sm opacity-80">
              A quick case study with measurable impact.
            </p>
          </a>
          <a className="rounded-xl border p-4 hover:shadow">
            <h2 className="font-semibold">Latest Note →</h2>
            <p className="text-sm opacity-80">
              Short write-ups on algorithms, probability, and systems.
            </p>
          </a>
        </div>
      </section>
  );
}
