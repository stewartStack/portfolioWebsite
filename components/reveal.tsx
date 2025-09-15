"use client";

import { useEffect, useRef } from "react";

type Props = {
    children: React.ReactNode;
    className?: string;
};

export function Reveal({ children, className = "" }: Props) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.dataset.inview = "true"; // triggers CSS state
                    io.disconnect();
                }
            },
            { rootMargin: "0px 0px -10% 0px" } // reveal a little early
        );

        io.observe(el);
        return () => io.disconnect();
    }, []);

    return (
        <div ref={ref} className={`reveal ${className}`}>
            {children}
        </div>
    );
}
