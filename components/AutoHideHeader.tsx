'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AutoHideHeader() {
    // 1) Start with a server-safe default that matches SSR.
    const [hidden, setHidden] = useState(false);   // false on SSR & first CSR

    // 2) Only attach scroll logic AFTER mount.
    useEffect(() => {
        let lastY = window.scrollY;

        const onScroll = () => {
            const y = window.scrollY;
            // hide when scrolling down and you've scrolled a bit
            const shouldHide = y > lastY && y > 64;
            setHidden(shouldHide);
            lastY = y;
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header
            className={[
                "sticky top-0 z-50 border-b backdrop-blur transition-transform duration-300 ease-out will-change-transform",
                hidden ? "-translate-y-full" : "translate-y-0",
            ].join(" ")}
        >
            <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
                <Link href="/" className="font-semibold text-text">Noah Stewart</Link>
                <ul className="flex gap-2 sm:gap-4 text-xs sm:text-sm font-stretch-condensed">
                    <li><Link href="/projects"
                              className="text-text-muted hover:text-highlight link-underline transition-colors">Projects</Link>
                    </li>
                    <li><Link href="/readings"
                              className="text-text-muted hover:text-highlight link-underline transition-colors">Readings</Link>
                    </li>
                    <li><Link href="/research"
                              className="text-text-muted hover:text-highlight link-underline transition-colors">Research</Link>
                    </li>
                    <li><Link href="/resume"
                              className="text-text-muted hover:text-highlight link-underline transition-colors">Resume</Link>
                    </li>
                    <li><Link href="/certifications"
                              className="text-text-muted hover:text-highlight link-underline transition-colors">Certifications</Link>
                    </li>
                    <li><Link href="/contact"
                              className="text-text-muted hover:text-highlight link-underline transition-colors">Contact</Link>
                    </li>
                </ul>

            </nav>
        </header>
    );
}
