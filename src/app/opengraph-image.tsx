import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { SITE } from "@/lib/site";

export const alt = `${SITE.fullName} · professionele detailing bij u thuis`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadJpeg(filename: string) {
  const bytes = await readFile(join(process.cwd(), "public", "og", filename));
  return `data:image/jpeg;base64,${bytes.toString("base64")}`;
}

async function loadSyne() {
  const response = await fetch(
    "https://cdn.jsdelivr.net/fontsource/fonts/syne@5.2.5/latin-700-normal.ttf",
  );
  if (!response.ok) {
    throw new Error("Failed to load Syne font");
  }
  return response.arrayBuffer();
}

export default async function Image() {
  const [syne, one, two, three] = await Promise.all([
    loadSyne(),
    loadJpeg("1.jpg"),
    loadJpeg("2.jpg"),
    loadJpeg("3.jpg"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#241c14",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            gap: 6,
            padding: 6,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 780,
              height: 618,
              borderRadius: 14,
              backgroundImage: `url(${one})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 402,
              height: 618,
              gap: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                width: 402,
                height: 306,
                borderRadius: 14,
                backgroundImage: `url(${two})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div
              style={{
                display: "flex",
                width: 402,
                height: 306,
                borderRadius: 14,
                backgroundImage: `url(${three})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(20,16,12,0.15) 0%, rgba(20,16,12,0.12) 42%, rgba(20,16,12,0.78) 76%, rgba(20,16,12,0.94) 100%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: 56,
            right: 56,
            bottom: 48,
            display: "flex",
            flexDirection: "column",
            fontFamily: "Syne",
            color: "#f5f2eb",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {SITE.name}
            <span style={{ color: "#d4b45a" }}>.</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 30,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "rgba(245,242,235,0.9)",
            }}
          >
            Professionele detailing bij u thuis
          </div>
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
