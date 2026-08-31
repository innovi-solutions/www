import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

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
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f6f8",
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 800, color: "#1c2135", letterSpacing: -2 }}>
          {SITE_NAME.split(" ")[0].toUpperCase()}
        </div>
        <div style={{ marginTop: 14, width: 260, height: 16, background: "#b71316", borderRadius: 2 }} />
        <div
          style={{
            marginTop: 40,
            fontSize: 30,
            color: "#b71316",
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          The Forge for Custom Software & AI
        </div>
      </div>
    ),
    { ...size },
  );
}
