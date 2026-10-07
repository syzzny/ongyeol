import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Modal from "./Modal";
import styles from "./Modal.module.scss";

/**
 * 브라우저 기본 `<dialog>` 요소로 만든 모달입니다.
 * - `Esc` 키, 닫기 버튼, 어두운 배경을 누르면 닫힙니다.
 * - 열려 있는 동안 포커스가 모달 밖으로 나가지 않고, 닫으면 열었던 버튼으로 돌아갑니다.
 */
const meta = {
  title: "공통 컴포넌트/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    open: false,
    title: "모달 제목",
    onClose: () => {},
    children: null,
  },
  // 버튼을 눌러 직접 열고 닫아 볼 수 있게 함
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <button
          type="button"
          className={styles.primary}
          onClick={() => setOpen(true)}
        >
          모달 열기
        </button>

        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <div className={styles.body}>
            <p>모달 안에 들어가는 내용입니다.</p>
          </div>
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.secondary}
              onClick={() => setOpen(false)}
            >
              취소
            </button>
            <button
              type="button"
              className={styles.primary}
              onClick={() => setOpen(false)}
            >
              확인
            </button>
          </div>
        </Modal>
      </>
    );
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 크기 */
export const Medium: Story = {
  name: "기본 크기",
};

/** 달력처럼 넓은 내용을 담을 때 */
export const Large: Story = {
  name: "큰 크기",
  args: { size: "large", title: "예약일 및 시간 선택" },
};
