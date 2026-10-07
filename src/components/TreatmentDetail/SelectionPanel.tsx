"use client";

import { useState } from "react";
import { RotateCcw, X } from "lucide-react";
import ConsultComplete from "@/components/Hero/ConsultComplete";
import CustomerForm, { type Customer } from "@/components/Hero/CustomerForm";
import Modal from "@/components/Modal/Modal";
import { formatPrice } from "@/components/Treatments/data";
import { useSelection } from "./SelectionProvider";
import styles from "./SelectionPanel.module.scss";

export default function SelectionPanel() {
  const { items, remove, clear } = useSelection();
  // 지금 열려 있는 모달 (없으면 null)
  const [openModal, setOpenModal] = useState<"customer" | "done" | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const isEmpty = items.length === 0;

  const closeModal = () => setOpenModal(null);

  // 완료 모달을 닫으면 담은 시술과 입력 정보를 비움
  const finish = () => {
    closeModal();
    clear();
    setCustomer(null);
  };

  return (
    <>
      <aside className={styles.panel} aria-labelledby="selection-title">
        <div className={styles.head}>
          <div>
            <h2 id="selection-title" className={styles.title}>
              선택한 시술
            </h2>
            <p className={styles.vat}>*부가세 별도</p>
          </div>
          <button
            type="button"
            className={styles.reset}
            aria-label="선택 초기화"
            disabled={isEmpty}
            onClick={clear}
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {isEmpty ? (
          <p className={styles.empty}>
            시술 옆의 + 버튼을 눌러
            <br />
            원하는 시술을 담아보세요.
          </p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <p className={styles.itemName}>{item.name}</p>
                <p className={styles.itemPrice}>{formatPrice(item.price)}</p>
                <button
                  type="button"
                  className={styles.remove}
                  aria-label={`${item.name} 빼기`}
                  onClick={() => remove(item.id)}
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.total}>
          <span>합계</span>
          <strong>{formatPrice(total)}</strong>
        </div>

        <button
          type="button"
          className={styles.cta}
          aria-haspopup="dialog"
          disabled={isEmpty}
          onClick={() => setOpenModal("customer")}
        >
          상담 신청하기
        </button>
      </aside>

      {/* 태블릿·모바일: 담은 시술이 있으면 화면 아래에 요약 바 고정 */}
      {!isEmpty && (
        <div className={styles.bar}>
          <p className={styles.barText}>
            <span>{items.length}개 선택</span>
            <strong>{formatPrice(total)}</strong>
          </p>
          <button
            type="button"
            className={styles.barCta}
            aria-haspopup="dialog"
            onClick={() => setOpenModal("customer")}
          >
            상담 신청
          </button>
        </div>
      )}

      {/* ---------- 모달: 연락처 입력 → 신청 완료 ---------- */}
      <Modal
        open={openModal === "customer"}
        title="상담 신청"
        onClose={closeModal}
      >
        {openModal === "customer" && (
          <CustomerForm
            value={customer}
            submitLabel="상담 신청하기"
            onCancel={closeModal}
            onConfirm={(value) => {
              setCustomer(value);
              setOpenModal("done");
            }}
          />
        )}
      </Modal>

      <Modal open={openModal === "done"} title="상담 신청 완료" onClose={finish}>
        {openModal === "done" && customer && (
          <ConsultComplete
            name={customer.name}
            rows={[
              {
                label: "선택 시술",
                value: (
                  <ul>
                    {items.map((item) => (
                      <li key={item.id}>{item.name}</li>
                    ))}
                  </ul>
                ),
              },
              { label: "합계", value: `${formatPrice(total)} (부가세 별도)` },
              { label: "연락처", value: customer.phone },
            ]}
            onClose={finish}
          />
        )}
      </Modal>
    </>
  );
}