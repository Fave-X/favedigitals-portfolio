import { ImageResponse } from "next/og";

export const alt = "Favour Tabugbo, on-chain data analyst";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Share card for the homepage, drawn in the site's own palette. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#121411",
          color: "#f0f2ee",
          padding: "72px 80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#3eb4a2", fontFamily: "monospace", letterSpacing: 2 }}>
          FAVEDIGITALS · ON-CHAIN DATA ANALYST
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, fontWeight: 700 }}>I trace where money moves on-chain</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#a6aca2", fontFamily: "sans-serif" }}>
            Stablecoin dashboards · Exploit fund tracing · Published research
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, fontFamily: "sans-serif" }}>
          <span>Favour Tabugbo</span>
          <span style={{ color: "#7e857a" }}>favedigitals.vercel.app</span>
        </div>
      </div>
    ),
    size,
  );
}
