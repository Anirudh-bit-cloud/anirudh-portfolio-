import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { PortfolioProvider } from "@/context/PortfolioContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anirudh Saini — Developer & ML Engineer",
  description:
    "Anirudh Saini is a developer and AI/ML trainee at C-DAC MEPZ, studying Computer Science at SRMIST. Building predictive systems, explainable AI pipelines, and solid web software.",
  keywords: [
    "Anirudh Saini",
    "Machine Learning Engineer",
    "Full-Stack Developer",
    "SRMIST",
    "C-DAC MEPZ",
    "Python",
    "FastAPI",
    "React",
    "Spring Boot",
  ],
  authors: [{ name: "Anirudh Saini", url: "https://github.com/Anirudh-bit-cloud" }],
  openGraph: {
    title: "Anirudh Saini — Developer & ML Engineer",
    description:
      "AI/ML trainee at C-DAC MEPZ & Computer Science undergraduate at SRMIST. Building predictive engines and full-stack software.",
    url: "https://github.com/Anirudh-bit-cloud",
    siteName: "Anirudh Saini Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-sans antialiased bg-bg text-fg min-h-screen selection:bg-accent selection:text-accent-contrast`}
      >
        <PortfolioProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-contrast focus:rounded-md focus:text-xs focus:font-mono focus:outline-none"
          >
            Skip to main content
          </a>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
