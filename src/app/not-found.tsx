import type { Metadata } from "next";
import Link from "next/link";
import styles from "./not-found.module.scss";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다 | 온결피부과",
};

const LINKS = [
  { label: "병원소개", href: "/about" },
  { label: "의료진", href: "/doctors" },
  { label: "시술안내", href: "/treatments" },
  { label: "뉴스룸", href: "/news" },
];

/** 없는 주소로 들어왔을 때 보이는 화면 (404) */
export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>PAGE NOT FOUND</p>
            {/* 한 줄씩 아래에서 올라오게 하려고 줄마다 감쌈 */}
            <h1 className={styles.title}>
              <span className={styles.line}>
                <span>찾으시는 페이지가</span>
              </span>
              <span className={styles.line}>
                <span>없습니다</span>
              </span>
            </h1>
          </div>
          {/* 장식용 숫자 — 같은 내용을 제목이 전하므로 스크린리더에는 숨김 */}
          <p className={styles.code} aria-hidden="true">
            404
          </p>
        </div>

        <div className={styles.body}>
          <p className={styles.description}>
            주소가 바뀌었거나 삭제된 페이지일 수 있습니다. 주소를 다시
            확인하시거나 아래 메뉴에서 원하는 내용을 찾아보세요.
          </p>
          <Link href="/" className={styles.home}>
            홈으로 가기
          </Link>
        </div>

        <nav aria-label="주요 페이지">
          <ul className={styles.links}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
