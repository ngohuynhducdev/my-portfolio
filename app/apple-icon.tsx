import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Home-screen icon for iOS, which otherwise saves a screenshot of the page.
 *
 * Filled violet rather than the favicon's dark square: iOS drops the icon
 * straight onto the user's wallpaper with no plate behind it, so a dark mark
 * disappears on a dark background. Same treatment as the badge in
 * app/opengraph-image.tsx.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#a78bfa",
          color: "#0f172a",
          fontSize: 116,
          fontWeight: 800,
          fontFamily: "sans-serif",
          // Nudged up: the glyph's optical centre sits below the box's.
          lineHeight: 1,
          paddingBottom: 8,
        }}
      >
        D
      </div>
    ),
    { ...size },
  );
}
