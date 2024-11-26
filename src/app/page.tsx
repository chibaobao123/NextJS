import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HomePage",
  description: "...",
};

export default function Home() {
  // render data
  return (
    <div className="container">
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}
      ></div>
    </div>
  );
}
