import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CustomerForm from "./CustomerForm";

/**
 * 상담 신청의 "고객 정보 입력" 폼입니다.
 * - 연락처는 숫자만 입력해도 하이픈이 자동으로 들어갑니다.
 * - 완료 버튼을 누른 뒤부터 오류를 표시하고, 첫 번째 오류 칸으로 포커스를 옮깁니다.
 */
const meta = {
  title: "상담 신청/CustomerForm",
  component: CustomerForm,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    value: null,
    onConfirm: () => {},
    onCancel: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ width: 480, maxWidth: "100vw" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CustomerForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 처음 열었을 때 */
export const Empty: Story = {
  name: "빈 상태",
};

/** 이미 입력한 값이 있을 때 (다시 열어 고치는 경우) */
export const Filled: Story = {
  name: "입력된 상태",
  args: { value: { name: "홍길동", phone: "010-1234-5678" } },
};
