import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Robson Rodrigues - Software Engineer & Fullstack Developer";
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
          overflow: "hidden",
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 60%)",
            top: -100,
            left: -100,
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)",
            bottom: -50,
            right: -50,
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 60%)",
            top: "50%",
            right: "25%",
            filter: "blur(40px)",
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
            background: "linear-gradient(90deg, #22c55e, #06b6d4, #8b5cf6, #ec4899)",
          }}
        />

        {/* Left decorative bar */}
        <div
          style={{
            position: "absolute",
            left: 60,
            top: 60,
            bottom: 60,
            width: 3,
            borderRadius: 8,
            background: "linear-gradient(180deg, #22c55e, transparent 70%)",
            opacity: 0.4,
          }}
        />

        {/* Status badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 24px",
            borderRadius: 999,
            border: "1px solid rgba(34,197,94,0.25)",
            background: "rgba(34,197,94,0.06)",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 12px rgba(34,197,94,0.6)",
            }}
          />
          <span
            style={{
              fontSize: 14,
              color: "#22c55e",
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Available for work
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: -4,
              lineHeight: 1,
              marginBottom: 4,
            }}
          >
            ROBSON
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              letterSpacing: -4,
              lineHeight: 1,
              background: "linear-gradient(90deg, #22c55e, #06b6d4)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            RODRIGUES
          </div>
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: 20,
            color: "#a1a1aa",
            marginTop: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Software Engineer & Fullstack Developer
        </div>

        {/* Tech stack pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 28,
          }}
        >
          {["React", "Next.js", "TypeScript", "Node.js", "Python"].map(
            (tech) => (
              <div
                key={tech}
                style={{
                  padding: "6px 18px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  fontSize: 14,
                  color: "#71717a",
                  fontWeight: 600,
                  letterSpacing: 1,
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "#3f3f46",
              letterSpacing: 3,
              fontWeight: 700,
            }}
          >
            BRASÍLIA, DF — BRAZIL
          </div>
          <div
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#3f3f46",
            }}
          />
          <div
            style={{
              fontSize: 14,
              color: "#3f3f46",
              letterSpacing: 3,
              fontWeight: 700,
            }}
          >
            ROBSONDEV.VERCEL.APP
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
