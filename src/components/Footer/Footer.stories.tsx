import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Footer from "./Footer";

/**
 * 모든 페이지 맨 아래에 들어가는 Footer입니다.
 * 위쪽 도구 모음의 화면 크기 버튼으로 태블릿·모바일 배치를 확인할 수 있습니다.
 */
const meta = {
  title: "레이아웃/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
