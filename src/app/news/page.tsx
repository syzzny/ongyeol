import type { Metadata } from "next";
import NewsList from "@/components/NewsList/NewsList";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "뉴스룸 | 온결피부과",
  description:
    "온결피부과의 언론 보도와 병원 소식, 의료진이 쓴 피부 칼럼을 모았습니다.",
};

export default function NewsIndexPage() {
  return (
    <main>
      {/* ---------- 페이지 제목 ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>NEWSROOM</p>
            {/* 한 줄씩 아래에서 올라오게 하려고 줄마다 감쌈 */}
            <h1 className={styles.title}>
              <span className={styles.line}>
                <span>온결의 소식과</span>
              </span>
              <span className={styles.line}>
                <span>피부 이야기를 전합니다</span>
              </span>
            </h1>
          </div>

          <p className={styles.lead}>
            언론 보도와 병원 소식, 의료진이 쓴 피부 칼럼을 모았습니다.
          </p>
        </div>
      </section>

      {/* ---------- 분류 버튼 + 글 목록 ---------- */}
      <NewsList />
    </main>
  );
}
