import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          background: "#0a0a0a",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 800, color: "#ffffff", lineHeight: 1 }}>
          N
        </div>
        <div style={{ marginTop: 4, width: 28, height: 5, background: "#b71316", borderRadius: 1 }} />
      </div>
    ),
    { ...size },
  );
}
