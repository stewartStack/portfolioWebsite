// app/resume/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Resume — Noah Stewart",
    description:
        "Preview a redacted resume and request the full version, cover letter, or transcript.",
    openGraph: {
        title: "Resume — Noah Stewart",
        description:
            "Preview a redacted resume and request the full version, cover letter, or transcript.",
        type: "website",
        url: "/resume",
    },
};

export default function ResumePage({
                                       searchParams,
                                   }: {
    searchParams?: { submitted?: string };
}) {
    const submitted = searchParams?.submitted === "1";

    return (
        <main className="mx-auto max-w-6xl px-4 py-12">
            {/* Banner */}
            {submitted && (
                <div className="mb-6 rounded-xl border border-emerald-300/40 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-100">
                    <p className="text-sm">
                        Thanks! Your request was received. I’ll follow up soon.
                    </p>
                </div>
            )}

            <div className="grid gap-8 md:grid-cols-[1.6fr_1fr]">
                {/* Left: resume preview (≈60–70%) */}
                <section className="rounded-2xl border border-gray-200 p-4 dark:border-neutral-800">
                    <div className="mb-3 flex items-baseline justify-between">
                        <h1 className="text-xl font-semibold">Resume (Redacted)</h1>
                        <p className="text-xs text-muted-foreground">
                            Click to view at full size
                        </p>
                    </div>

                    {/* Wrap the image in a link to open full-size in a new tab */}
                    <a
                        href="/images/resume/Redacted%20Resume%20Fall%202025.jpg"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open resume image in a new tab"
                        className="block overflow-hidden rounded-xl border border-gray-200 transition hover:shadow-lg dark:border-neutral-800"
                    >
                        <Image
                            src="/images/resume/Redacted%20Resume%20Fall%202025.jpg"
                            alt="Redacted resume preview"
                            width={1600}
                            height={2200}
                            priority
                            className="h-auto w-full object-contain"
                        />
                    </a>

                    <p className="mt-3 text-xs text-muted-foreground">
                        To protect personal info, sensitive details are hidden in this
                        preview. Use the form to request the full documents.
                    </p>
                </section>

                {/* Right: request form */}
                <section className="rounded-2xl border border-gray-200 p-6 dark:border-neutral-800">
                    <h2 className="text-lg font-medium">Request Full Documents</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Tell me who you are and what you need. I’ll reply with a secure
                        link.
                    </p>

                    <form className="mt-6 space-y-5" method="POST" action="/api/emails">
                        {/* identify this form */}
                        <input type="hidden" name="kind" value="resume_request"/>
                        {/* existing honeypot stays the same */}
                        <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden"/>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">Name</label>
                                <input
                                    name="name"
                                    required
                                    placeholder="Your name"
                                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="name@company.com"
                                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Organization
                                </label>
                                <input
                                    name="organization"
                                    placeholder="Company / School"
                                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Role / Title
                                </label>
                                <input
                                    name="role"
                                    placeholder="Recruiter, Hiring Manager, Professor, etc."
                                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Purpose / Context
                            </label>
                            <textarea
                                name="purpose"
                                required
                                placeholder="What will you use this for? Position, program, opportunity, etc."
                                rows={3}
                                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    How did you find me?
                                </label>
                                <input
                                    name="source"
                                    placeholder="Referral, LinkedIn, Career Fair, Google, etc."
                                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium">
                                    Deadline (optional)
                                </label>
                                <input
                                    type="date"
                                    name="deadline"
                                    className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                                />
                            </div>
                        </div>

                        {/* Document checkboxes */}
                        <fieldset className="space-y-2">
                            <legend className="mb-1 text-sm font-medium">
                                Which documents do you need?
                            </legend>
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" name="docs" value="full_resume" />
                                    <span>Full Resume</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" name="docs" value="cover_letter" />
                                    <span>Cover Letter</span>
                                </label>
                                <label className="flex items-center gap-2 text-sm">
                                    <input type="checkbox" name="docs" value="transcript" />
                                    <span>Transcript</span>
                                </label>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                You can select multiple.
                            </p>
                        </fieldset>

                        <div>
                            <label className="mb-1 block text-sm font-medium">
                                Additional notes (optional)
                            </label>
                            <textarea
                                name="message"
                                rows={3}
                                placeholder="Anything else I should know?"
                                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                            />
                        </div>

                        <label className="flex items-center gap-2 text-sm">
                            <input type="checkbox" name="consent" required />
                            <span>
                I consent to being contacted about this request and understand
                this is for legitimate recruiting/academic use.
              </span>
                        </label>

                        <div className="pt-2">
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                Submit Request
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
