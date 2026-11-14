import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        background: "linear-gradient(135deg, #2563eb, #7c3aed)",
        color: "white",
        fontSize: 22,
        fontWeight: 800,
      }}
    >
      PV
    </div>,
    size,
  );
}
