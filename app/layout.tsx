import { Inter } from "next/font/google";
import "../src/index.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SocialSync - Social Media Management Platform",
  description:
    "Schedule and manage your posts across Instagram, Facebook, X, LinkedIn, Threads, Bluesky, and YouTube from a single dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
