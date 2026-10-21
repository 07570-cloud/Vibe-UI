import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibe UI show - แหล่งรวมแรงบันดาลใจและพรีวิวโค้ด HTML",
  description: "อัปโหลดและชมผลงาน HTML สดๆ ผ่าน Live Preview หาแรงบันดาลใจและแชร์ผลงานของคุณกับคอมมูนิตี้",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={kanit.variable}>
      <body className="min-h-screen flex flex-col bg-[#FFF6DC] text-[#1E293B] antialiased selection:bg-[#FF95A5] selection:text-white">
        {children}
      </body>
    </html>
  );
}
