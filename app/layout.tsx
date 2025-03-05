import { Inter } from "next/font/google";
import "../src/index.css";
import { Suspense } from "react";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Instagram Post Scheduler",
  description: "Schedule and manage your Instagram posts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
