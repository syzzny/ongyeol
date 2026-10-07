import { Check } from "lucide-react";
import modal from "@/components/Modal/Modal.module.scss";
import styles from "./ConsultComplete.module.scss";

type ConsultCompleteProps = {
  name: string; // 신청한 사람 이름
  rows: { label: string; value: React.ReactNode }[]; // 요약에 보여줄 항목들
  onClose: () => void;
};

export default function ConsultComplete({
  name,
  rows,
  onClose,
}: ConsultCompleteProps) {
  return (
    <>
      <div className={modal.body}>
        <div className={styles.message}>
          <span className={styles.icon} aria-hidden="true">
            <Check size={28} />
          </span>
          <p className={styles.headline}>
            {name} 님, 상담 신청이 완료되었습니다.
          </p>
          <p className={styles.desc}>
            예약 확정을 위해 입력하신 연락처로 안내드리겠습니다.
          </p>
        </div>

        {/* 신청 내용 요약 */}
        <dl className={styles.summary}>
          {rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={modal.footer}>
        <button type="button" className={modal.primary} onClick={onClose}>
          확인
        </button>
      </div>
    </>
  );
}