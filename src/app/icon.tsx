import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
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

export default async function Icon() {
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
          letterSpacing: "-0.04em",
          lineHeight: 1.05,
        }}
      >
        <div style={{ display: "flex", fontSize: 92 }}>Van Dijk</div>
        <div style={{ display: "flex", fontSize: 92, marginTop: 8 }}>
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
