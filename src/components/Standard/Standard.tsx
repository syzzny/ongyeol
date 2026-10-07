import {
  CalendarCheck,
  ScanFace,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./Standard.module.scss";

const PRINCIPLES = [
  {
    icon: ScanFace,
    title: "정확한 진단",
    description: "피부 상태와 원인을 면밀히 확인합니다.",
  },
  {
    icon: UserRoundCheck,
    title: "개인별 맞춤 치료",
    description: "생활 환경까지 고려해 계획을 설계합니다.",
  },
  {
    icon: ShieldCheck,
    title: "과도하지 않은 치료",
    description: "필요한 범위 안에서 안전하게 제안합니다.",
  },
  {
    icon: CalendarCheck,
    title: "지속적인 피부 관리",
    description: "치료 후 경과와 일상 관리를 함께 봅니다.",
  },
];

export default function Standard() {
  return (
    <section
      id="standard"
      className={styles.section}
      aria-labelledby="standard-title"
    >
      <div className={styles.inner}>
        <SectionHeader
          id="standard-title"
          eyebrow="OUR STANDARD"
          title={
            <>
              무엇보다 중요한 것은
              <br />
              정확한 피부 진단입니다
            </>
          }
          description="보이는 증상만 다루기보다 피부 장벽, 생활 습관, 과거 치료 이력을 함께 살펴 치료의 기준을 세웁니다."
        />

        <ul className={styles.list}>
          {PRINCIPLES.map(({ icon: Icon, title, description }) => (
            <li key={title} className={styles.item}>
              <Icon
                size={28}
                strokeWidth={1.5}
                aria-hidden="true"
                className={styles.icon}
              />
              <h3 className={styles.itemTitle}>{title}</h3>
              <p className={styles.itemDesc}>{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}