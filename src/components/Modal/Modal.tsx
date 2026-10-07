"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
import styles from "./Modal.module.scss";

type ModalProps = {
  open: boolean;
  title: string;
  size?: "medium" | "large";
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({
  open,
  title,
  size = "medium",
  onClose,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  // open 값에 맞춰 브라우저 기본 모달 열고 닫기
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.modal} ${styles[size]}`}
      aria-labelledby={titleId}
      onClose={() => {
        // ESC처럼 브라우저가 직접 닫았을 때만 알림
        // 코드에서 닫은 경우 OPEN은 이미 false라서 건너뜀
        if (open) onClose();
      }}
      onClick={(event) => {
        // 모달 바깥(어두운 배경)을 눌렀을 때만 닫기
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.header}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        <button
          type="button"
          className={styles.close}
          aria-label="닫기"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      {children}
    </dialog>
  );
}