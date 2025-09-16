"use client";
import { useEffect, useRef, useState } from "react";

export default function AutoHideHeader() {
    const [hidden, setHidden] = useState(false);
    const lastY = useRef(0);
    const downAccum = useRef(0);

    const THRESHOLD = 125; // px from top before we allow hiding
    const HOLD = 15;       // sustained downward px before we hide

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;
            const dy = y - lastY.current;
            lastY.current = y;

            // Near top: always show
            if (y <= THRESHOLD) {
                setHidden(false);
                downAccum.current = 0;
                return;
            }

            if (dy > 0) {
                // scrolling down: accumulate and hide after a bit
                downAccum.current += dy;
                if (downAccum.current > HOLD) setHidden(true);
            } else if (dy < 0) {
                // scrolling up: show immediately
                downAccum.current = 0;
                setHidden(false);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={[
                "sticky top-0 z-50 border-b backdrop-blur transition-transform duration-300 ease-out will-change-transform",
                hidden ? "-translate-y-full" : "translate-y-0",
            ].join(" ")}
        >
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                <a href="/" className="font-semibold">Noah Stewart</a>
                <ul className="flex gap-4 text-sm">
                    <li><a href="/projects" className="hover:underline">Projects</a></li>
                    <li><a href="/readings" className="hover:underline">Readings</a></li>
                    <li><a href="/research" className="hover:underline">Research</a></li>
                    <li><a href="/resume" className="hover:underline">Resume</a></li>
                    <li><a href="/contact" className="hover:underline">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}
