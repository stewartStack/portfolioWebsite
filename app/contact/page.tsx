// app/contact/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact — Noah Stewart",
    description: "Get in touch for opportunities, research collaboration, or questions.",
};

export default function ContactPage({ searchParams }: { searchParams?: { sent?: string } }) {
    const sent = searchParams?.sent === "1";
    return (
        <main className="mx-auto max-w-3xl px-4 py-1">
            {sent && (
                <div className="mb-6 rounded-xl border border-emerald-300/40 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/40 dark:text-emerald-100">
                    <p className="text-sm">Thanks! Your message has been sent.</p>
                </div>
            )}

            <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
            <p className="mt-2 text-sm text-muted-foreground">
                I will reply as soon as I can!
            </p>

            <form className="mt-6 space-y-5" method="POST" action="/api/emails">
                {/* identify this form */}
                <input type="hidden" name="kind" value="contact" />
                {/* shared honeypot */}
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" />

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
                            placeholder="you@domain.com"
                            className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Subject (optional)</label>
                    <input
                        name="subject"
                        placeholder="Topic"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium">Message</label>
                    <textarea
                        name="message"
                        required
                        rows={5}
                        placeholder="How can I help?"
                        className="w-full rounded-lg border border-gray-300 p-2.5 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </main>
    );
}
