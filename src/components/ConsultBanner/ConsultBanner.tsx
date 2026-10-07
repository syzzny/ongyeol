import Link from "next/link";
import styles from "./ConsultBanner.module.scss";

type ConsultBannerProps = {
  title: string;
  description: string;
};

/** 페이지 맨 아래에 놓는 상담 안내 박스 */
export default function ConsultBanner({
  title,
  description,
}: ConsultBannerProps) {
  return (
    <section className={styles.section} aria-labelledby="consult-banner-title">
      <div className={styles.panel}>
        <div>
          <h2 id="consult-banner-title" className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.actions}>
          <Link href="/#consult" className={styles.primary}>
            상담 신청하기
          </Link>
          <a href="tel:02-512-0728" className={styles.secondary}>
            전화 02 512 0728
          </a>
        </div>
      </div>
    </section>
  );
}
