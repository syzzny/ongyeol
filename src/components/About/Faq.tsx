"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import styles from "./Faq.module.scss";

// \u00a0 = 줄바꿈되지 않는 공백 (전화번호가 중간에서 끊기지 않게)
const FAQS = [
  {
    question: "예약은 어떻게 하나요?",
    answer:
      "홈페이지의 상담 신청에서 원하는 시술과 날짜를 남기시면 확인 전화를 드립니다. 전화(02\u00a0512\u00a00728)로도 예약하실 수 있습니다.",
  },
  {
    question: "상담만 받을 수도 있나요?",
    answer:
      "네. 상담과 피부 진단만 받으시고, 치료 여부는 충분히 생각한 뒤에 결정하셔도 됩니다.",
  },
  {
    question: "진료시간과 휴진일은 언제인가요?",
    answer:
      "평일은 10:00–19:00, 토요일은 10:00–15:00에 진료합니다. 점심시간은 13:00–14:00이며 일요일과 공휴일은 휴진입니다.",
  },
  {
    question: "주차할 수 있나요?",
    answer:
      "건물 내 주차장을 이용하실 수 있습니다. 지하철은 3호선 신사역 1번 출구에서 걸어서 6분 거리입니다.",
  },
  {
    question: "시술 후 불편한 점이 생기면 어떻게 하나요?",
    answer:
      "예약일을 기다리지 말고 전화 주세요. 담당 의료진이 상태를 확인하고 필요한 조치를 안내해 드립니다.",
  },
];

export default function Faq() {
  // 열려 있는 질문의 순서 (null이면 모두 닫힘)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className={styles.list}>
      {FAQS.map((faq, index) => {
        const isOpen = index === openIndex;

        return (
          <li key={faq.question} className={styles.item}>
            <h3>
              <button
                type="button"
                id={`faq-button-${index}`}
                className={styles.question}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {faq.question}
                <Plus
                  className={styles.icon}
                  size={20}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-button-${index}`}
              className={styles.panel}
              data-open={isOpen ? "" : undefined}
            >
              <div className={styles.panelInner}>
                <p className={styles.answer}>{faq.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
