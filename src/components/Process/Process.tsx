import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./Process.module.scss";

const STEPS = [
  {
    title: "상담",
    description: "피부 고민과 생활 습관, 이전 치료 경험을 충분히 듣습니다.",
  },
  {
    title: "피부 상태 분석",
    description:
      "육안 진찰과 필요한 검사를 통해 현재 상태와 원인을 확인합니다.",
  },
  {
    title: "맞춤 치료 설계",
    description: "치료 순서, 간격, 주의사항을 이해하기 쉽게 안내합니다.",
  },
  {
    title: "경과 확인 및 관리",
    description: "피부 반응과 회복 과정을 살피며 계획을 세밀하게 조정합니다.",
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className={styles.section}
      aria-labelledby="process-title"
    >
      <div className={styles.inner}>
        <SectionHeader
          id="process-title"
          tone="dark"
          eyebrow="CARE PROCESS"
          title="상담부터 사후 관리까지"
          description="단계마다 충분히 설명하고, 피부 반응에 맞춰 속도를 조절합니다."
        />

        {/* 화면에 들어오면 1단계부터 차례로 나타남 */}
        <Reveal>
          <ol className={styles.list}>
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className={styles.item}
                style={{ "--i": index } as CSSProperties}
              >
                <div className={styles.top}>
                  {/* 1 → "01" */}
                  <span className={styles.number}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* 마지막 단계에는 화살표 없음 */}
                  {index < STEPS.length - 1 && (
                    <ArrowRight
                      size={18}
                      aria-hidden="true"
                      className={styles.arrow}
                    />
                  )}
                </div>

                <div>
                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.description}>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
