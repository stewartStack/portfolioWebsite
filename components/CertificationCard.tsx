// components/CertificationCard.tsx
import Image from "next/image";
import type { Certification } from "@/lib/certifications";

type Props = { item: Certification };

export default function CertificationCard({ item }: Props) {
    const { name, issuer, logo, proofUrl, status, issuedOn, expiresOn, summary } = item;

    const isInProgress = status === "in_progress";
    const statusLabel = isInProgress ? "In Progress" : "Completed";
    const statusClasses = isInProgress
        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200"
        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200";

    return (
        <a
            href={proofUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glow-accent group block rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-900"
            aria-label={`${name} — ${issuer}`}
        >
            <div className="flex items-start gap-4">
                {/* Logo */}
                <div className="shrink-0 rounded-xl border border-gray-200 p-2 dark:border-neutral-800 bg-white dark:bg-neutral-900">
                    <Image
                        src={logo}
                        alt={`${issuer} logo`}
                        width={44}
                        height={44}
                        className="object-contain"
                    />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="truncate text-lg font-semibold">{name}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusClasses}`}>
              {statusLabel}
            </span>
                    </div>

                    <p className="mt-0.5 text-sm text-muted-foreground">{issuer}</p>

                    {summary && (
                        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
                            {summary}
                        </p>
                    )}

                    {/* Meta row */}
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                        {issuedOn && <span>Issued: {issuedOn}</span>}
                        {expiresOn && <span>Expires: {expiresOn}</span>}
                    </div>
                </div>

                {/* Arrow */}
                <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-70"
                >
                    <path
                        fill="currentColor"
                        d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707A1 1 0 0 1 8.707 5.293l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0Z"
                    />
                </svg>
            </div>
        </a>
    );
}
