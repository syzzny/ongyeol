import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import SectionHeader from "./SectionHeader";

/**
 * 메인 페이지의 각 섹션 맨 위에 놓는 제목 영역입니다.
 * 화면에 들어오면 제목이 아래에서 올라옵니다.
 */
const meta = {
  title: "공통 컴포넌트/SectionHeader",
  component: SectionHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    eyebrow: "OUR STANDARD",
    title: "정확한 피부 진단이 먼저입니다",
    description:
      "피부 상태를 충분히 확인한 뒤 필요한 치료만 제안합니다.",
  },
} satisfies Meta<typeof SectionHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 모습: 왼쪽에 제목, 오른쪽에 설명 */
export const Default: Story = {};

/** 설명이 없으면 제목만 표시됩니다. */
export const WithoutDescription: Story = {
  name: "설명 없음",
  args: { description: undefined },
};

/** 제목을 두 줄로 나누고 싶을 때는 `<br />`을 넣습니다. */
export const TwoLineTitle: Story = {
  name: "두 줄 제목",
  args: {
    title: (
      <>
        무엇보다 중요한 것은
        <br />
        정확한 피부 진단입니다
      </>
    ),
  },
};

/** 어두운 배경 섹션에서는 `tone="dark"`로 글자색을 뒤집습니다. */
export const Dark: Story = {
  name: "어두운 배경",
  args: { tone: "dark" },
  decorators: [
    (Story) => (
      <div style={{ padding: 32, background: "var(--color-bg-dark)" }}>
        <Story />
      </div>
    ),
  ],
};
