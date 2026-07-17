import { ImageResponse } from "next/og";
import { PERSONAL_INFO, SITE } from "@/lib/constants";

export const alt = SITE.ogImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 30% 20%, #2e1065 0%, #0f172a 55%)",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#a78bfa",
            fontSize: 28,
            fontWeight: 600,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#a78bfa",
              color: "#0f172a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            D
          </div>
          Available for work
        </div>

        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, lineHeight: 1.1 }}>
          {PERSONAL_INFO.name}
        </div>
        <div style={{ display: "flex", fontSize: 44, color: "#a78bfa", marginTop: 12 }}>
          {PERSONAL_INFO.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#a1a1aa",
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          React · Next.js · TypeScript · Tailwind CSS
        </div>
      </div>
    ),
    { ...size },
  );
}
