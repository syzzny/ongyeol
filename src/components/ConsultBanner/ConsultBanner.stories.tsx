import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ConsultBanner from "./ConsultBanner";

/**
 * 서브 페이지 맨 아래에 놓는 상담 안내 박스입니다.
 * 제목과 설명만 바꿔서 의료진, 시술 안내 페이지에서 함께 씁니다.
 */
const meta = {
  title: "공통 컴포넌트/ConsultBanner",
  component: ConsultBanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    title: "어떤 시술이 맞는지 모르겠다면",
    description: "피부 상태를 먼저 확인하고 필요한 시술만 안내해 드립니다.",
  },
} satisfies Meta<typeof ConsultBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** 글이 길어져도 버튼이 아랫줄로 내려가며 모양이 유지되는지 확인합니다. */
export const LongText: Story = {
  name: "긴 문구",
  args: {
    title: "처음 방문이라 무엇부터 물어봐야 할지 모르겠다면 편하게 상담부터 받아 보세요",
    description:
      "진료 전 충분한 상담으로 피부 상태와 생활 습관을 확인하고, 필요하지 않은 시술은 권하지 않습니다. 상담만 받고 가셔도 괜찮습니다.",
  },
};
