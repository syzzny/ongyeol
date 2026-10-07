import Reveal from "@/components/Reveal/Reveal";
import styles from "./SectionHeader.module.scss";

type SectionHeaderProps = {
  id?: string; // 제목(h2)에 붙일 id
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  tone?: "light" | "dark"; // 어두운 배경 섹션은 "dark"
};

export default function SectionHeader({
  id,
  eyebrow,
  title,
  description,
  tone = "light",
}: SectionHeaderProps) {
  return (
    // 화면에 들어오면 제목이 아래에서 올라옴 (Reveal이 data-visible을 붙여줌)
    <Reveal
      className={`${styles.header} ${tone === "dark" ? styles.dark : ""}`}
    >
      <div className={styles.heading}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h2 id={id} className={styles.title}>
          <span className={styles.titleInner}>{title}</span>
        </h2>
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </Reveal>
  );
}
