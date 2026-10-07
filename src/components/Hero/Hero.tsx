"use client";

import { useRef, useState } from "react";
import type { SubmitEvent } from "react";
import Image from "next/image";
import {
  CalendarBlankIcon,
  CaretDownIcon,
  CaretRightIcon,
  UserRectangleIcon,
} from "@phosphor-icons/react/dist/ssr";
import heroImage from "@/assets/images/hero.jpg";
import Modal from "@/components/Modal/Modal";
import ConsultComplete from "./ConsultComplete";
import CustomerForm, { type Customer } from "./CustomerForm";
import DateTimePicker from "./DateTimePicker";
import { formatDateTime } from "./dateTime";
import { submitConsult } from "./submitConsult";
import styles from "./Hero.module.scss";

const TREATMENTS = [
  "색소 / 기미",
  "여드름 / 흉터",
  "모공 / 피부결",
  "리프팅 / 탄력",
  "기타",
];

export default function Hero() {
  // 지금 열려 있는 모달 (없으면 null)
  const [openModal, setOpenModal] = useState<
    "date" | "customer" | "done" | null
  >(null);
  // 모달에서 확정한 값
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  // 신청 시점에 체크돼 있던 시술 (완료 모달에 표시)
  const [treatments, setTreatments] = useState<string[]>([]);
  // 신청 버튼을 눌러본 뒤부터 빠진 항목 표시
  const [showErrors, setShowErrors] = useState(false);
  // 신청을 보내는 과정: 대기 → 보내는 중 → (실패하면) 실패
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const dateButtonRef = useRef<HTMLButtonElement>(null);
  const customerButtonRef = useRef<HTMLButtonElement>(null);

  const isSending = status === "sending";

  const closeModal = () => setOpenModal(null);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 보내는 중에 또 누르면 무시 (중복 신청 방지)
    if (isSending) return;

    // STEP 02·03이 비어 있으면 표시하고, 비어 있는 첫 항목으로 포커스를 옮김
    if (!dateTime || !customer) {
      setShowErrors(true);
      (!dateTime ? dateButtonRef : customerButtonRef).current?.focus();
      return;
    }

    // STEP 01에서 체크된 시술 읽기 (기다리는 동안 event 값이 사라지므로 먼저 읽어 둠)
    const formData = new FormData(event.currentTarget);
    const selected = formData.getAll("treatment").map(String);

    setStatus("sending");

    try {
      await submitConsult({
        treatments: selected,
        dateTime,
        name: customer.name,
        phone: customer.phone,
      });
      setTreatments(selected);
      setStatus("idle");
      setOpenModal("done");
    } catch {
      // 입력한 내용은 그대로 두고 실패 안내만 표시
      setStatus("failed");
    }
  };

  // 완료 모달을 닫으면 폼을 처음 상태로
  const finishConsult = () => {
    closeModal();
    formRef.current?.reset(); // 칩 체크 해제
    setDateTime(null);
    setCustomer(null);
    setTreatments([]);
    setShowErrors(false);
    setStatus("idle");
  };

  return (
    <section id="consult" className={styles.hero}>
      <h1 className={styles.srOnly}>온결피부과</h1>

      <Image
        src={heroImage}
        alt=""
        fill
        preload
        sizes="100vw"
        placeholder="blur"
        className={styles.bg}
      />

      <div className={styles.consult}>
        <h2 className={styles.tab}>상담신청</h2>

        <form
          ref={formRef}
          className={styles.panel}
          aria-busy={isSending}
          onSubmit={handleSubmit}
        >
          <div className={styles.fields}>
            {/* STEP 01 */}
            <div role="group" aria-labelledby="step-treatment">
              <p id="step-treatment" className={styles.stepLabel}>
                <span>STEP 01</span>
                시술 선택
                <small>선택</small>
              </p>
              <div className={styles.chips}>
                {TREATMENTS.map((name) => (
                  <label key={name} className={styles.chip}>
                    <input type="checkbox" name="treatment" value={name} />
                    <span>{name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* STEP 02 · 03 */}
            <div className={styles.stepRow}>
              <div className={styles.step}>
                <p className={styles.stepLabel}>
                  <span>STEP 02</span>
                  예약일 및 시간 선택
                  <small className={styles.required}>필수</small>
                </p>
                <button
                  ref={dateButtonRef}
                  type="button"
                  className={[
                    styles.control,
                    dateTime ? styles.filled : "",
                    showErrors && !dateTime ? styles.invalid : "",
                  ].join(" ")}
                  aria-haspopup="dialog"
                  aria-describedby={
                    showErrors && !dateTime ? "consult-date-error" : undefined
                  }
                  onClick={() => setOpenModal("date")}
                >
                  <CalendarBlankIcon size={16} aria-hidden="true" />
                  {dateTime
                    ? formatDateTime(dateTime)
                    : "예약일 및 시간을 선택해주세요"}
                  <CaretDownIcon
                    size={14}
                    aria-hidden="true"
                    className={styles.controlArrow}
                  />
                </button>
                {showErrors && !dateTime && (
                  <p
                    id="consult-date-error"
                    className={styles.stepError}
                    role="alert"
                  >
                    예약일과 시간을 선택해 주세요.
                  </p>
                )}
              </div>

              <div className={styles.step}>
                <p className={styles.stepLabel}>
                  <span>STEP 03</span>
                  고객 정보 입력
                  <small className={styles.required}>필수</small>
                </p>
                <button
                  ref={customerButtonRef}
                  type="button"
                  className={[
                    styles.control,
                    customer ? styles.filled : "",
                    showErrors && !customer ? styles.invalid : "",
                  ].join(" ")}
                  aria-haspopup="dialog"
                  aria-describedby={
                    showErrors && !customer
                      ? "consult-customer-error"
                      : undefined
                  }
                  onClick={() => setOpenModal("customer")}
                >
                  <UserRectangleIcon size={16} aria-hidden="true" />
                  {customer
                    ? `${customer.name} · ${customer.phone}`
                    : "이름과 연락처를 입력해주세요"}
                  <CaretRightIcon
                    size={14}
                    aria-hidden="true"
                    className={styles.controlArrow}
                  />
                </button>
                {showErrors && !customer && (
                  <p
                    id="consult-customer-error"
                    className={styles.stepError}
                    role="alert"
                  >
                    이름과 연락처를 입력해 주세요.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={styles.submit}>
            {/*
              보내는 중에는 disabled 대신 aria-disabled 사용
              (disabled를 쓰면 키보드 포커스가 버튼에서 떨어져 나감)
            */}
            <button
              type="submit"
              className={styles.submitButton}
              aria-disabled={isSending}
            >
              {isSending && (
                <span className={styles.spinner} aria-hidden="true" />
              )}
              {isSending
                ? "신청하는 중…"
                : status === "failed"
                  ? "다시 시도"
                  : "상담 신청하기"}
            </button>
            {status === "failed" && (
              <p className={styles.submitError} role="alert">
                <strong>신청을 보내지 못했습니다.</strong>
                인터넷 연결을 확인한 뒤 다시 시도해 주세요. 입력하신 내용은
                그대로 남아 있습니다.
              </p>
            )}
            <p className={styles.call}>
              전화 상담
              <a href="tel:02-512-0728">02 512 0728</a>
            </p>
          </div>
        </form>
      </div>

      {/* ---------- 모달 ---------- */}
      <Modal
        open={openModal === "date"}
        title="예약일 및 시간 선택"
        size="large"
        onClose={closeModal}
      >
        {openModal === "date" && (
          <DateTimePicker
            value={dateTime}
            onCancel={closeModal}
            onConfirm={(value) => {
              setDateTime(value);
              closeModal();
            }}
          />
        )}
      </Modal>

      <Modal
        open={openModal === "customer"}
        title="고객 정보 입력"
        onClose={closeModal}
      >
        {openModal === "customer" && (
          <CustomerForm
            value={customer}
            onCancel={closeModal}
            onConfirm={(value) => {
              setCustomer(value);
              closeModal();
            }}
          />
        )}
      </Modal>

      <Modal
        open={openModal === "done"}
        title="상담 신청 완료"
        onClose={finishConsult}
      >
        {openModal === "done" && dateTime && customer && (
                    <ConsultComplete
            name={customer.name}
            rows={[
              {
                label: "시술",
                value:
                  treatments.length > 0
                    ? treatments.join(", ")
                    : "상담 시 결정",
              },
              { label: "예약 일시", value: formatDateTime(dateTime) },
              { label: "연락처", value: customer.phone },
            ]}
            onClose={finishConsult}
          />
        )}
      </Modal>
    </section>
  );
}