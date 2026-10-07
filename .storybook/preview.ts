import type { Preview } from "@storybook/nextjs-vite";

// 사이트의 layout.tsx가 불러오는 글꼴과 공통 스타일을 Storybook에도 똑같이 적용
import "pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css";
import "@fontsource/bebas-neue";
import "../src/styles/globals.scss";
import "./preview.css";

const preview: Preview = {
  parameters: {
    // next/link, next/navigation이 App Router 방식으로 동작하도록
    nextjs: { appDirectory: true },
    // 접근성 검사에서 문제가 나오면 패널에 표시 (테스트를 실패시키지는 않음)
    a11y: { test: "todo" },
    options: {
      storySort: {
        order: ["디자인 기초", "공통 컴포넌트", "상담 신청", "레이아웃"],
      },
    },
  },
};

export default preview;
