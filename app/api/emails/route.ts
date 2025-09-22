// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// helper so we only create the client when the POST actually runs
function getResend() {
    const key = process.env.RESEND_API_KEY;
    if (!key) {
        // Don't crash at import time / build time
        throw new Error("RESEND_API_KEY is missing at runtime");
    }
    return new Resend(key);
}

const TO = process.env.NOTIFY_TO || "";      // read, but don't throw at module scope
const FROM = process.env.NOTIFY_FROM || "";  // read, but don't throw at module scope

export async function POST(req: Request) {
    // Basic env guard at runtime (returns 500 instead of failing build)
    if (!process.env.RESEND_API_KEY || !TO || !FROM) {
        console.error("Email envs missing", {
            hasKey: !!process.env.RESEND_API_KEY,
            TO,
            FROM,
        });
        return new NextResponse("Server email not configured", { status: 500 });
    }

    const form = await req.formData();

    // honeypot
    if (((form.get("company_website") as string) || "").trim() !== "") {
        return NextResponse.redirect(new URL("/resume?submitted=1", req.url));
    }

    const kind = (form.get("kind") as string) || "contact";
    const name = (form.get("name") as string) || "";
    const email = (form.get("email") as string) || "";
    const message = (form.get("message") as string) || "";
    const submittedAt = new Date().toISOString();

    const organization = (form.get("organization") as string) || "";
    const role = (form.get("role") as string) || "";
    const purpose = (form.get("purpose") as string) || "";
    const source = (form.get("source") as string) || "";
    const deadline = (form.get("deadline") as string) || "";
    const docs = form.getAll("docs") as string[];

    const subject =
        kind === "resume_request"
            ? `Document request: ${name} (${email})`
            : `New contact message: ${name} (${email})${form.get("subject") ? " — " + form.get("subject") : ""}`;

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
        ${form.get("subject") ? `<p><strong>Subject:</strong> ${form.get("subject")}</p>` : ""}
        <hr/>
        <p><strong>Message:</strong><br/>${(message || "—").replace(/\n/g, "<br/>")}</p>
        <p style="color:#888">Submitted at: ${submittedAt}</p>
      `;

    try {
        const resend = getResend(); // create client here, at runtime
        await resend.emails.send({
            from: FROM,
            to: TO,
            replyTo: email || undefined,
            subject,
            html,
        });
    } catch (err) {
        console.error("Resend send error:", err);
        // Still succeed UX-wise, or return a 500 if you prefer:
        // return new NextResponse("Failed to send email", { status: 500 });
    }

    const back = kind === "resume_request" ? "/resume?submitted=1" : "/contact?sent=1";
    return NextResponse.redirect(new URL(back, req.url));
}
