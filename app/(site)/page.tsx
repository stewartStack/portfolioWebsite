"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";

function shuffleArray<T>(array: T[]): T[] {
    // Create a shallow copy to avoid modifying the original array
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
    let randomIndex: number;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
            shuffledArray[randomIndex],
            shuffledArray[currentIndex],
        ];
    }

    return shuffledArray;
}

// ------------ Carousel ------------
type Slide = { src: string; alt: string };
let slides: Slide[] = [
    { src: "/images/carousel/4dedd6a9-db65-4a49-bc87-e9ce24ec95f6.jpg", alt: "Columbia Picture" },
    { src: "/images/carousel/IMG_0839.jpg", alt: "Lax Trophy Pic" },
    { src: "/images/carousel/IMG_1422.jpg", alt: "Gameday Field Pic" },
    { src: "/images/carousel/IMG_1606.jpg", alt: "PPL R&D Presentation" },
    { src: "/images/carousel/IMG_1611.jpg", alt: "PPL Presentation 2" },
    { src: "/images/carousel/IMG_1948.jpeg", alt: "PPL Solar Site" },
    { src: "/images/carousel/IMG_4481.jpg", alt: "Garba" },
    { src: "/images/carousel/IMG_4657.jpg", alt: "Coal Mining Trip" },
    { src: "/images/carousel/IMG_4660.jpg", alt: "Coal Mining 2" },
    { src: "/images/carousel/IMG_7969.jpg", alt: "GSE Certificate" },
    { src: "/images/carousel/IMG_7975.jpg", alt: "GSE Team Pic" },
    { src: "/images/carousel/IMG_7976.jpg", alt: "GSE Celebration" },
    { src: "/images/carousel/IMG_7978.jpg", alt: "GSE Team Pic 2" },
    { src: "/images/carousel/IMG_9374.jpg", alt: "Solar Sheep" },
    { src: "/images/carousel/IMG_9396.jpg", alt: "PPL Site" },
    { src: "/images/carousel/IMG_9413.jpg", alt: "PPL Solar Site" },
    { src: "/images/carousel/KEV_0807a.jpg", alt: "Lax Game" },
];

function Carousel() {
    const trackRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const speedRef = useRef(4);           // ~pixels per 16ms frame; increase to scroll faster
    const pausedRef = useRef(false);
    const hoverRef = useRef(false);
    const isDraggingRef = useRef(false);
    const dragStartXRef = useRef<number | null>(null);
    const dragStartLeftRef = useRef<number | null>(null);
    const startRef = useRef(0); // pixel position of the middle block start
    const itemRef  = useRef(0); // measured width of one card + gap
    const blockRef = useRef(0); // width of 1 block (n * item)
    const [order, setOrder] = useState(slides);      // server & initial client render match

    useEffect(() => {
        setOrder(shuffleArray(slides));                 // shuffle after hydration
    }, []);

    const BASE = order.length;
    const loopSlides = useMemo(() => [...order, ...order, ...order], [order]);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;
        const onEnter = () => (hoverRef.current = true);
        const onLeave = () => (hoverRef.current = false);
        const onPointer = () => {
            pausedRef.current = true; setTimeout(() => (pausedRef.current = false), 2000);
        };
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
        el.addEventListener("pointerdown", onPointer);
        el.addEventListener("wheel", onPointer);
        return () => {
            el.removeEventListener("mouseenter", onEnter);
            el.removeEventListener("mouseleave", onLeave);
            el.removeEventListener("pointerdown", onPointer);
            el.removeEventListener("wheel", onPointer);
        };
    }, []);

    // compute one "item width" (card + gap) and center on middle copy
    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        //el.style.scrollBehavior = "auto";

        let raf: number | null = null;
        const centerOnce = () => {
            const first = el.children[0] as HTMLElement | undefined;
            if (!first) { raf = requestAnimationFrame(centerOnce); return; }

            const style = getComputedStyle(el);
            const gap = parseFloat(style.gap || style.columnGap || "0");
            const item = first.offsetWidth + gap;

            if (item > 0) {
                // ensure CSS doesn't animate this positioning
                el.style.scrollBehavior = "auto";
                el.scrollLeft = item * BASE;
                startRef.current = el.scrollLeft;      // save the origin of the middle block
                itemRef.current  = item;               // one card + gap
                blockRef.current = item * slides.length;
                // restore default (no smooth) for RAF control
                el.style.scrollBehavior = "auto";
                return;
            }
            raf = requestAnimationFrame(centerOnce);
        };

        raf = requestAnimationFrame(centerOnce);
        return () => { if (raf) cancelAnimationFrame(raf); };
    }, [BASE]);

    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        const onPointerDown = (e: PointerEvent) => {
            isDraggingRef.current = true;
            pausedRef.current = true;   // pause auto-scroll while dragging
            hoverRef.current = true;    // treat as hovered
            dragStartXRef.current = e.clientX;
            dragStartLeftRef.current = el.scrollLeft;
            el.setPointerCapture(e.pointerId);
            el.classList.add("dragging"); // cursor + user-select changes
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDraggingRef.current) return;
            const startX = dragStartXRef.current!;
            const startLeft = dragStartLeftRef.current!;
            const dx = e.clientX - startX;
            el.scrollLeft = startLeft - dx; // invert for natural horizontal drag
            e.preventDefault();             // prevent text selection while dragging
        };

        const end = (e: PointerEvent) => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            el.classList.remove("dragging");
            // stay paused if still hovered; otherwise resume shortly
            setTimeout(() => {
                if (!hoverRef.current) pausedRef.current = false;
            }, 200);
            if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
        };

        el.addEventListener("pointerdown", onPointerDown);
        el.addEventListener("pointermove", onPointerMove, { passive: false });
        el.addEventListener("pointerup", end);
        el.addEventListener("pointercancel", end);

        return () => {
            el.removeEventListener("pointerdown", onPointerDown);
            el.removeEventListener("pointermove", onPointerMove as any);
            el.removeEventListener("pointerup", end);
            el.removeEventListener("pointercancel", end);
        };
    }, []);


    useEffect(() => {
        const el = trackRef.current;
        if (!el) return;

        // Make sure browser isn't smoothing over our pixel scroll
        el.style.scrollBehavior = "auto";

        let last = performance.now();
        const step = (t: number) => {
            const dt = t - last;
            last = t;

            if (!pausedRef.current && !hoverRef.current && !isDraggingRef.current) {
                el.scrollLeft += (speedRef.current * dt) / 160;
            }

            // wrap-around relative to the middle block, factoring in viewport width
            const start = startRef.current;      // left edge of middle copy
            const block = blockRef.current;      // width of one block (n * item)
            const unit  = itemRef.current;       // one card + gap
            const EPS   = 0.5;
            if (block > 0 && unit > 0) {
                // Right edge of the viewport crosses the end of the middle block:
                const rightWrapAt = .9 * (start + block - el.clientWidth - EPS);
                // Left edge goes before (a bit left of) the start of the middle block:
                const leftWrapAt  = start - unit + EPS;  // leave ~1 card of slack
                if (el.scrollLeft > rightWrapAt) {
                    el.scrollLeft -= block; // jump back by exactly one block
                } else if (el.scrollLeft < leftWrapAt) {
                    el.scrollLeft += block; // jump forward by one block
                }
            }

            rafRef.current = requestAnimationFrame(step);
        };

        rafRef.current = requestAnimationFrame(step);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, []);


    return (
        <section aria-label="Photo carousel" className="space-y-3">
            <div className="relative rounded-[var(--radius)] overflow-hidden">
                <div
                    ref={trackRef}
                    className="flex gap-2 overflow-x-auto pb-2 no-scrollbar cursor-grab"
                >
                    {loopSlides.map((s, i) => (
                        <div key={i} className="relative w-48 shrink-0 aspect-[4/3] rounded-lg shadow overflow-hidden">
                            <Image
                                src={s.src}
                                alt={s.alt}
                                fill
                                priority={i === BASE} // prioritize the first card in the middle block
                                className="object-cover"
                                sizes="256px"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ------------ Scroll reveal (uses .reveal CSS) ------------
function useScrollReveal() {
    useEffect(() => {
        const opts: IntersectionObserverInit = { rootMargin: "0px 0px -20% 0px", threshold: 0.15 };
        const io = new IntersectionObserver((entries) => {
            for (const e of entries) {
                const target = e.target as HTMLElement;
                if (e.isIntersecting) {
                    target.dataset.inview = "true";
                    io.unobserve(target);
                }
            }
        }, opts);

        const nodes = document.querySelectorAll<HTMLElement>(".reveal");
        nodes.forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);
}

// ------------ Venn Diagram SVG ------------
type VennProps = { className?: string };
function Venn({ className = "" }: VennProps) {
    return (
        <svg
            className={`venn-svg w-full h-auto ${className}`}
            viewBox="0 0 600 360"
            role="img"
            aria-labelledby="vennTitle vennDesc"
        >
            <title id="vennTitle">Intersection of CS and IE skills</title>
            <desc id="vennDesc">Animated outline drawing and labeled skill areas.</desc>

            {/* Circle fills */}
            <defs>
                <clipPath id="leftCircle">
                    <circle cx="240" cy="180" r="130" />
                </clipPath>
                <clipPath id="rightCircle">
                    <circle cx="360" cy="180" r="130" />
                </clipPath>
            </defs>

            <circle className="venn-fill left" cx="240" cy="180" r="130" />
            <circle className="venn-fill right" cx="360" cy="180" r="130" />

            {/* Outlines that get “drawn” */}
            <circle className="venn-path" cx="240" cy="180" r="130" />
            <circle className="venn-path" cx="360" cy="180" r="130" />

            {/* Labels */}
            <text x="200" y="40" className="venn-cap">CS</text>
            <text x="390" y="40" className="venn-cap">IE</text>

            {/* CS-only bullets */}
            <g clipPath="url(#leftCircle)">
                <g className="venn-bullets" transform="translate(130,125)">
                    <text dx="30" dy="-20">Algorithms</text>
                    <text dy="22">Software</text>
                    <text dx="0" dy="36">Engineering</text>
                    <text dx="-12" dy="75">Machine Learning</text>
                    <text dy="120">Cloud Operations</text>
                </g>
            </g>

            {/* IE-only bullets */}
            <g clipPath="url(#rightCircle)">
                <g className="venn-bullets" transform="translate(360,125)">
                    <text dx="-10" dy="-30">Operations</text>
                    <text dx="20" dy="-16">Research</text>
                    <text dx="14" dy="22">Statistical</text>
                    <text dx="14" dy="36">Modeling</text>
                    <text dx="15" y="75">Supply Chain</text>
                    <text dy="120">Systems Design</text>
                </g>
            </g>

            {/* Intersection bullets – position near center overlap */}
            <g className="venn-bullets intersect" transform="translate(255,170)">
                <text dy="-40">Data Analytics</text>
                <text dx="-16" dy="-5">Artificial Intelligence</text>
                <text dx="-16" dy="30">Process Automation</text>
                <text dx="-11" dy="60">Modeling Systems</text>
            </g>
        </svg>
    );
}

export default function Home() {
    useScrollReveal();

    return (
        <section className="space-y-16">
            {/* Hero / Carousel */}
            <div className="space-y-6">
                <h1 className="text-4xl/tight font-bold">
                    Hello, I’m <span className="underline decoration-[var(--color-accent)]">Noah Stewart</span>.
                </h1>
                <p className=" opacity-90">
                    CS + IE double major @ Georgia Tech. I am passionate about energy, AI, optimization, and statistics.
                </p>
                <Carousel/>
            </div>

            {/* NEW: Animated Venn Diagram (CS ∩ IE) */}
            <section className="reveal grid items-center gap-8 md:grid-cols-[60%_40%]">
                <div className="venn-animate">
                    <Venn className="max-w-3xl w-full mx-auto" />
                </div>
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold">Why CS and IE?</h2>
                    <p className="opacity-90">
                        This overlap is my sweet spot: production-grade software informed by optimization and
                        statistics.
                        The diagram draws as you scroll here, highlighting the shared toolkit I use to ship results.
                    </p>
                    <ul className="list-disc pl-6 opacity-90 space-y-1">
                        <li>From algorithms to operations — models that turn into products.</li>
                        <li>Experimentation mindset — measure, iterate, deploy.</li>
                        <li>Energy focus — analytics + optimization that affect real grids.</li>
                    </ul>
                </div>
            </section>

            <section className="reveal grid items-center gap-8 md:grid-cols-2">
                {/* Personal Philosophy */}
                <div className="reveal space-y-4">
                    <h2 className="text-2xl font-semibold">Personal philosophy</h2>
                    <ul className="list-disc pl-6 space-y-2 opacity-90">
                        <li>Clarity over cleverness — readable systems scale.</li>
                        <li>Measure first — tooling & telemetry guide impact.</li>
                        <li>Make it fast — performance is a feature.</li>
                    </ul>
                </div>
                {/* Goals */}
                <div className="reveal space-y-4">
                    <h2 className="text-2xl font-semibold">Goals</h2>
                    <ul className="list-disc pl-6 space-y-2 opacity-90">
                        <li>Publish energy-intermittency analyses and tooling for planners.</li>
                        <li>Ship an interactive grid-sim demo on the web.</li>
                        <li>Intern on applied AI/optimization teams in energy/utilities.</li>
                    </ul>
                </div>
            </section>

                {/* (Optional) Quick links */}
                <section className="reveal grid gap-4 sm:grid-cols-2">
                    <a href="/projects" className="rounded-xl border p-4 hover:shadow">
                        <h3 className="font-semibold">Featured Projects →</h3>
                        <p className="text-sm opacity-80">Case studies with measurable impact.</p>
                    </a>
                    <a href="/notes" className="rounded-xl border p-4 hover:shadow">
                        <h3 className="font-semibold">Latest Notes →</h3>
                        <p className="text-sm opacity-80">Algorithms, probability, systems.</p>
                    </a>
                </section>
            </section>
            );
            }
