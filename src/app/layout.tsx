import type { Metadata } from "next";
import { Epilogue, Syne } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import { cn } from "@/lib/utils";

const epilogue = Epilogue({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "UX&GO Studio",
  description: "High-End UX/UI & No-Code Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(epilogue.variable, syne.variable, "bg-background text-foreground antialiased font-sans")}>
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
