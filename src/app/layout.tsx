import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@/styles/globals.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

export const metadata: Metadata = {
  // 공유 미리보기 이미지 주소를 만들 때 기준이 되는 사이트 주소
  metadataBase: new URL("https://ongyeol-smoky.vercel.app"),
  title: "온결피부과",
  description: "피부의 본질을 살피고 필요한 치료만 정확하게 제안합니다.",
  // 카카오톡·SNS 등에 링크를 붙였을 때 보이는 정보 (이미지는 opengraph-image.png)
  openGraph: {
    type: "website",
    siteName: "온결피부과",
    locale: "ko_KR",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={bebasNeue.variable}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}