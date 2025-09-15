// app/api/og/route.tsx
import { ImageResponse } from "@vercel/og";
export const runtime = "edge";
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title") ?? "Your Portfolio";
    return new ImageResponse(
        <div style={{ display:"flex", width:"100%", height:"100%", padding:64, background:"#0b0b0b", color:"white" }}>
            <div style={{ fontSize:64, fontWeight:700 }}>{title}</div>
        </div>,
        { width: 1200, height: 630 }
    );
}
