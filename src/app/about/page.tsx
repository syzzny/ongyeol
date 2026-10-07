import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import consultationImage from "@/assets/images/clinic-consultation.jpg";
import receptionImage from "@/assets/images/clinic-reception.jpg";
import treatmentRoomImage from "@/assets/images/clinic-treatment.jpg";
import loungeImage from "@/assets/images/hero.jpg";
import laserImage from "@/assets/images/news-06.jpg";
import Faq from "@/components/About/Faq";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "병원 소개 | 온결피부과",
  description:
    "온결피부과는 충분히 듣고, 정확히 진단하고, 필요한 만큼만 치료합니다.",
};

const STATS = [
  { label: "개원", value: "2010", unit: "년" },
  { label: "전국 지점", value: "10", unit: "곳" },
  { label: "월 평균 진료", value: "4,800", unit: "건" },
  { label: "다시 찾는 비율", value: "82", unit: "%" },
];

const STORIES = [
  {
    title: "진단이 치료보다 먼저입니다",
    description:
      "같은 증상도 원인은 사람마다 다릅니다. 온결은 상담과 피부 진단을 먼저 하고, 그 결과에 맞는 치료만 권합니다. 필요하지 않은 시술은 권하지 않습니다.",
    image: consultationImage,
    alt: "유리 벽으로 나뉜 독립 상담실",
    link: { label: "진단 원칙 보기", href: "/#standard" },
  },
  {
    title: "상담한 의사가 끝까지 진료합니다",
    description:
      "처음 상담한 전문의가 시술과 경과 확인까지 직접 맡습니다. 진료 기록이 한 사람에게 이어지기 때문에, 피부 변화에 맞춰 계획을 바로 조정할 수 있습니다.",
    image: laserImage,
    alt: "의료진이 레이저 시술을 하는 모습",
    link: { label: "의료진 보기", href: "/doctors" },
  },
  {
    title: "머무는 시간도 진료의 일부입니다",
    description:
      "상담실과 시술실을 독립된 공간으로 나누고, 조도와 동선을 차분하게 정리했습니다. 다른 사람의 시선을 신경 쓰지 않고 편하게 이야기하실 수 있습니다.",
    image: receptionImage,
    alt: "곡선형 소파가 놓인 대기 공간",
    link: { label: "공간 둘러보기", href: "/#clinic" },
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* ---------- 첫 화면 ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>ABOUT ONGYEOL</p>
            {/* 한 줄씩 아래에서 올라오게 하려고 줄마다 감쌈 */}
            <h1 className={styles.title}>
              <span className={styles.line}>
                <span>피부의 본질을 살피고</span>
              </span>
              <span className={styles.line}>
                <span>필요한 치료만 정확하게</span>
              </span>
            </h1>
            <p className={styles.lead}>
              온결피부과는 2010년 개원 이후 같은 원칙으로 진료해 왔습니다.
              충분히 듣고, 정확히 진단하고, 필요한 만큼만 치료합니다.
            </p>
          </div>

          <div className={styles.heroMedia}>
            <div className={styles.mainPhoto}>
              <Image
                src={loungeImage}
                alt="아치형 거울과 곡선 벤치가 놓인 온결피부과 라운지"
                fill
                sizes="(max-width: 1199px) 100vw, 700px"
                placeholder="blur"
                preload
              />
            </div>
            <div className={styles.subPhoto}>
              <Image
                src={treatmentRoomImage}
                alt="시술 베드가 놓인 시술실"
                fill
                sizes="(max-width: 767px) 40vw, 240px"
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 숫자 ---------- */}
      <section className={styles.stats} aria-labelledby="stats-title">
        <h2 id="stats-title" className={styles.srOnly}>
          숫자로 보는 온결피부과
        </h2>
        {/* 첫 화면 바로 아래라서, 조금이라도 보이면 바로 시작 */}
        <Reveal className={styles.statsInner} rootMargin="0px">
          <dl className={styles.statList}>
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={styles.stat}
                style={{ "--i": index } as CSSProperties}
              >
                <dt>{stat.label}</dt>
                <dd>
                  <span className={styles.number}>
                    <span>{stat.value}</span>
                  </span>
                  <span className={styles.unit}>{stat.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ---------- 온결이 진료하는 방식 ---------- */}
      <section className={styles.stories} aria-labelledby="stories-title">
        <div className={styles.storiesInner}>
          <h2 id="stories-title" className={styles.srOnly}>
            온결이 진료하는 방식
          </h2>

          {STORIES.map((story) => (
            <article key={story.title} className={styles.story}>
              <Reveal className={styles.storyPhoto}>
                <Image
                  src={story.image}
                  alt={story.alt}
                  fill
                  sizes="(max-width: 1199px) 100vw, 600px"
                  placeholder="blur"
                />
              </Reveal>

              <div className={styles.storyText}>
                <h3 className={styles.storyTitle}>{story.title}</h3>
                <p className={styles.storyDesc}>{story.description}</p>
                <Link href={story.link.href} className={styles.storyLink}>
                  {story.link.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ---------- 약속 ---------- */}
      <section className={styles.promise} aria-labelledby="promise-title">
        <Reveal className={styles.promiseInner}>
          {/* 둥글게 도는 글자 도장 */}
          <svg
            className={styles.emblem}
            viewBox="0 0 120 120"
            aria-hidden="true"
          >
            <defs>
              <path
                id="emblem-circle"
                d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0"
              />
            </defs>
            <text className={styles.emblemText}>
              <textPath
                href="#emblem-circle"
                textLength="286"
                lengthAdjust="spacing"
              >
                ONGYEOL DERMATOLOGY • SINCE 2010 •
              </textPath>
            </text>
            <circle cx="60" cy="60" r="9" className={styles.emblemDot} />
          </svg>

          <h2 id="promise-title" className={styles.promiseText}>
            <span className={styles.line}>
              <span>처음 상담부터 마지막 경과 확인까지</span>
            </span>
            <span className={styles.line}>
              <span>같은 기준으로 살피고</span>
            </span>
            <span className={styles.line}>
              <span>필요한 만큼만 치료하겠습니다</span>
            </span>
          </h2>
          <p className={styles.promiseSign}>온결피부과 의료진 일동</p>
        </Reveal>
      </section>

      {/* ---------- 자주 묻는 질문 ---------- */}
      <section className={styles.faq} aria-labelledby="faq-title">
        <div className={styles.faqInner}>
          <div className={styles.faqHead}>
            <p className={styles.eyebrow}>FAQ</p>
            <h2 id="faq-title" className={styles.faqTitle}>
              자주 묻는 질문
            </h2>
            <p className={styles.faqDesc}>
              예약과 진료, 방문에 대해 많이 물어보시는 내용을 모았습니다.
            </p>
          </div>

          <Faq />
        </div>
      </section>

      {/* ---------- 상담 안내 ---------- */}
      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.ctaPanel}>
          <div>
            <h2 id="cta-title" className={styles.ctaTitle}>
              피부 고민, 상담으로 시작하세요
            </h2>
            <p className={styles.ctaDesc}>
              원하는 시술과 날짜를 남기시면 확인 후 연락드립니다.
            </p>
          </div>

          <div className={styles.ctaActions}>
            <Link href="/#consult" className={styles.ctaPrimary}>
              상담 신청하기
            </Link>
            <a href="tel:02-512-0728" className={styles.ctaSecondary}>
              전화 02 512 0728
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
