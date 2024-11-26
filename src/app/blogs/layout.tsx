import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog lists",
  description: "Blog lists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
