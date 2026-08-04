import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

async function loadSyne() {
  const response = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/syne@5.2.5/latin-700-normal.ttf",
  );
  if (!response.ok) {
    throw new Error("Failed to load Syne font");
  }
  return response.arrayBuffer();
}

export default async function AppleIcon() {
  const syne = await loadSyne();

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
          background: "#241c14",
          color: "#f5f2eb",
          fontFamily: "Syne",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}
      >
        <div style={{ display: "flex", fontSize: 34 }}>Van Dijk</div>
        <div style={{ display: "flex", fontSize: 34, marginTop: 4 }}>
          <span>- Bosma</span>
          <span style={{ color: "#d4b45a" }}>.</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Syne",
          data: syne,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
