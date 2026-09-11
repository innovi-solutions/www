import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = "INNOVI Solutions - The Forge for Custom Software & AI";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#080503",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
          <div style={{ width: 40, height: 2, backgroundColor: "rgba(250,250,249,0.4)" }} />
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "rgba(250,250,249,0.6)",
              fontFamily: "monospace",
            }}
          >
            The Forge
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 96, color: "#fafaf9", lineHeight: 1.05, letterSpacing: -2 }}>
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 32,
            fontSize: 30,
            color: "rgba(250,250,249,0.7)",
            maxWidth: 900,
          }}
        >
          Custom software, SaaS, data systems, and AI agents, shaped around how your business operates.
        </div>
      </div>
    ),
    { ...size },
  );
}
