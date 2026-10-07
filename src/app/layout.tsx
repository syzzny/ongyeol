import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/styles/globals.scss";
import Header from "@/components/Header/Header";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  title: "온결피부과",
  description: "피부의 본질을 살피고 필요한 치료만 정확하게 제안합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={bebasNeue.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}