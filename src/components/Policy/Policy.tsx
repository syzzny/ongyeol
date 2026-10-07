import styles from "./Policy.module.scss";

type PolicySection = {
  title: string;
  body: string[];
};

type PolicyProps = {
  eyebrow: string;
  title: string;
  /** 마지막으로 고친 날짜 (예: 2026-10-07) */
  updated: string;
  lead: string;
  sections: PolicySection[];
};

/** 개인정보처리방침·이용약관처럼 글로만 이루어진 안내 페이지 */
export default function Policy({
  eyebrow,
  title,
  updated,
  lead,
  sections,
}: PolicyProps) {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>{eyebrow}</p>
            <h1 className={styles.title}>{title}</h1>
          </div>
          <p className={styles.updated}>
            최종 수정일{" "}
            <time dateTime={updated}>{updated.replaceAll("-", ".")}</time>
          </p>
        </header>

        <p className={styles.lead}>{lead}</p>

        <div className={styles.sections}>
          {sections.map((section, index) => (
            <section key={section.title} className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.number} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {section.title}
              </h2>
              <div className={styles.body}>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
