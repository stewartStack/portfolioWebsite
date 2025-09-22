// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.NOTIFY_TO!;
const FROM = process.env.NOTIFY_FROM!; // e.g., "Noah <noah@yourdomain.com>"

export async function POST(req: Request) {
    const form = await req.formData();

    // Honeypot (shared)
    const bot = (form.get("company_website") as string) || "";
    if (bot.trim() !== "") {
        return NextResponse.redirect(new URL(`/?sent=1`, req.url));
    }

    // Distinguish which form posted here
    const kind = (form.get("kind") as string) || "contact"; // "resume_request" | "contact"

    // Common fields
    const name = (form.get("name") as string) ?? "";
    const email = (form.get("email") as string) ?? "";
    const message = (form.get("message") as string) ?? "";
    const submittedAt = new Date().toISOString();

    // Resume-request extras
    const organization = (form.get("organization") as string) ?? "";
    const role = (form.get("role") as string) ?? "";
    const purpose = (form.get("purpose") as string) ?? "";
    const source = (form.get("source") as string) ?? "";
    const deadline = (form.get("deadline") as string) ?? "";
    const docs = form.getAll("docs") as string[]; // multi-checkbox

    // Contact extras
    const subjectInput = (form.get("subject") as string) ?? "";

    // Build email content
    const subject =
        kind === "resume_request"
            ? `Document request: ${name} (${email})`
            : `New contact message: ${name} (${email})${subjectInput ? " — " + subjectInput : ""}`;

    const html =
        kind === "resume_request"
            ? `
        <h2>New Request for Documents</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Organization:</strong> ${organization}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>Purpose:</strong> ${purpose}</p>
        <p><strong>Source:</strong> ${source}</p>
        <p><strong>Deadline:</strong> ${deadline || "—"}</p>
        <p><strong>Docs:</strong> ${docs.join(", ") || "—"}</p>
        <hr/>
        <p><strong>Additional notes:</strong><br/>${(message || "—").replace(/\n/g, "<br/>")}</p>
        <p style="color:#888">Submitted at: ${submittedAt}</p>
      `
            : `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subjectInput ? `<p><strong>Subject:</strong> ${subjectInput}</p>` : ""}
        <hr/>
        <p><strong>Message:</strong><br/>${(message || "—").replace(/\n/g, "<br/>")}</p>
        <p style="color:#888">Submitted at: ${submittedAt}</p>
      `;

    try {
        await resend.emails.send({
            from: FROM,
            to: TO,
            replyTo: email || undefined,
            subject,
            html,
        });
    } catch (err) {
        console.error("Resend error", err);
        // fall through to success redirect (don’t leak errors to users)
    }

    // Redirect to the appropriate page with a success flag
    const back =
        kind === "resume_request" ? "/resume?submitted=1" : "/contact?sent=1";
    return NextResponse.redirect(new URL(back, req.url));
}
