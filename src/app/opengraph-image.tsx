import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Robson Rodrigues - Software Engineer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: "linear-gradient(90deg, #22c55e, #0ea5e9, #a855f7)",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 999,
            border: "1px solid rgba(34,197,94,0.3)",
            background: "rgba(34,197,94,0.08)",
            marginBottom: 24,
          }}
        >
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontSize: 18, color: "#22c55e", fontFamily: "monospace", letterSpacing: 2 }}>
            SOFTWARE ENGINEER
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: -2,
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          Robson Rodrigues
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: "#71717a",
            fontFamily: "monospace",
            letterSpacing: 1,
          }}
        >
          Next.js  {"  "}  React  {"  "}  TypeScript  {"  "}  Node.js
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 16,
            color: "#52525b",
            fontFamily: "monospace",
            letterSpacing: 4,
          }}
        >
          ROBSONRODRIGUESS.DEV
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
