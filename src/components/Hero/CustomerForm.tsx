"use client";

import { useId, useState } from "react";
import type { SubmitEvent } from "react";
import modal from "@/components/Modal/Modal.module.scss";
import styles from "./CustomerForm.module.scss";

export type Customer = {
  name: string;
  phone: string;
};

type CustomerFormProps = {
  value: Customer | null;
  submitLabel?: string; // 완료버튼문구 (기본:'입력완료')
  onConfirm: (value: Customer) => void;
  onCancel: () => void;
};

/** 숫자만 남기고 010-1234-5678 형태로 하이픈 넣기 */
function formatPhone(input: string) {
  const digits = input.replace(/\D/g, "").slice(0, 11);

  if (digits.length < 4) return digits;
  if (digits.length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export default function CustomerForm({
  value,
  submitLabel = "입력 완료",
  onConfirm,
  onCancel,
}: CustomerFormProps) {
  const id = useId();
  const [name, setName] = useState(value?.name ?? "");
  const [phone, setPhone] = useState(value?.phone ?? "");
  const [agreed, setAgreed] = useState(value !== null);
  const [submitted, setSubmitted] = useState(false); // 확인 버튼을 눌러본 뒤부터 오류 표시

  const nameError =
    name.trim().length < 2 ? "이름을 2자 이상 입력해 주세요." : "";
  const phoneError = /^01[016789]\d{8}$/.test(phone.replace(/\D/g, ""))
    ? ""
    : "휴대폰 번호 11자리를 입력해 주세요.";
  const agreeError = agreed ? "" : "개인정보 수집·이용에 동의해 주세요.";

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (nameError || phoneError || agreeError) return;
    onConfirm({ name: name.trim(), phone });
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className={modal.body}>
        <div className={styles.fields}>
          <div className={styles.field}>
            <label htmlFor={`${id}-name`} className={styles.label}>
              이름
            </label>
            <input
              id={`${id}-name`}
              type="text"
              className={styles.input}
              placeholder="홍길동"
              autoComplete="name"
              value={name}
              aria-invalid={submitted && nameError !== ""}
              aria-describedby={`${id}-name-error`}
              onChange={(event) => setName(event.target.value)}
            />
            <p id={`${id}-name-error`} className={styles.error}>
              {submitted && nameError}
            </p>
          </div>

          <div className={styles.field}>
            <label htmlFor={`${id}-phone`} className={styles.label}>
              연락처
            </label>
            <input
              id={`${id}-phone`}
              type="tel"
              className={styles.input}
              placeholder="010-0000-0000"
              autoComplete="tel"
              inputMode="numeric"
              value={phone}
              aria-invalid={submitted && phoneError !== ""}
              aria-describedby={`${id}-phone-error`}
              onChange={(event) => setPhone(formatPhone(event.target.value))}
            />
            <p id={`${id}-phone-error`} className={styles.error}>
              {submitted && phoneError}
            </p>
          </div>

          <div className={styles.field}>
            <label className={styles.agree}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(event) => setAgreed(event.target.checked)}
              />
              <span>
                <strong>[필수] 개인정보 수집·이용 동의</strong>
                수집 항목: 이름, 연락처 · 이용 목적: 상담 예약 안내
              </span>
            </label>
            <p className={styles.error}>{submitted && agreeError}</p>
          </div>
        </div>
      </div>

      <div className={modal.footer}>
        <button type="button" className={modal.secondary} onClick={onCancel}>
          취소
        </button>
        <button type="submit" className={modal.primary}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}