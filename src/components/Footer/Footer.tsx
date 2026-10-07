import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import styles from "./Footer.module.scss";

// 병원 정보 — 한 줄에 들어가는 항목끼리 묶음
const INFO_LINES = [
  ["온결피부과의원", "대표자 김서윤", "사업자등록번호 214-93-07280"],
  ["서울특별시 강남구 도산대로 152, 5층", "대표전화 02 512 0728"],
  ["진료과목 피부과", "통신판매업 신고 제2026-서울강남-0728호"],
];

const SNS_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Naver Blog", href: "https://section.blog.naver.com/" },
  { label: "Kakao Channel", href: "https://pf.kakao.com/" },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <p className={styles.logo}>
              <span className={styles.symbol} aria-hidden="true" />
              <span className={styles.wordmark}>
                <strong>온결피부과</strong>
                <small>ONGYEOL DERMATOLOGY</small>
              </span>
            </p>
            <p className={styles.tagline}>
              피부의 본질을 살피고 필요한 치료만 정확하게 제안합니다.
            </p>
          </div>

          <address className={styles.info}>
            {INFO_LINES.map((line) => (
              <p key={line[0]} className={styles.infoLine}>
                {line.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </p>
            ))}
          </address>

          <ul className={styles.sns}>
            {SNS_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.snsLink}
                >
                  {link.label}
                  <ArrowUpRight size={14} aria-hidden="true" />
                  <span className={styles.hidden}>(새 창)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.bottom}>
          <ul className={styles.policy}>
            <li>
              {/* 개인정보처리방침은 눈에 띄게 표시 (관례) */}
              <Link href="/privacy" className={styles.policyLink}>
                <strong>개인정보처리방침</strong>
              </Link>
            </li>
            <li>
              <Link href="/terms" className={styles.policyLink}>
                이용약관
              </Link>
            </li>
          </ul>
          <p className={styles.copyright}>
            © 2026 ONGYEOL DERMATOLOGY. ALL RIGHTS RESERVED.
          </p>
        </div>

        <p className={styles.notice}>
          이 사이트는 포트폴리오용으로 만든 가상의 병원 사이트입니다. 실제
          병원·의료진·진료와 관련이 없습니다.
        </p>
      </div>
    </footer>
  );
}
