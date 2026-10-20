import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050505",
          color: "#f2efe8",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#e8875a" }}>
          {site.roleLine}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 92, letterSpacing: -4 }}>
            {`${site.firstName} ${site.lastName}`}
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "rgba(242,239,232,0.7)", marginTop: 12 }}>
            {site.intro}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
