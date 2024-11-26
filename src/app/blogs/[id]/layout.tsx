import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "View details blog post",
  description: "View details blog post",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
