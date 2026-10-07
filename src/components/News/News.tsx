"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CaretLeftIcon,
  CaretRightIcon,
  PauseIcon,
  PlayIcon,
} from "@phosphor-icons/react/dist/ssr";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { useCarousel } from "@/hooks/useCarousel";
import { NEWS, formatDate } from "./data";
import styles from "./News.module.scss";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** 기기 설정에서 "동작 줄이기"를 켰는지 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED_MOTION);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false, // 서버에서는 알 수 없으니 false로 시작
  );
}

export default function News() {
  const [playing, setPlaying] = useState(true); // 재생·정지 버튼 상태
  const [reading, setReading] = useState(false); // 카드를 보고 있는지 (마우스·키보드 포커스)
  const reducedMotion = usePrefersReducedMotion();

  const { trackRef, page, pageCount, handleScroll, scrollToPage, scrollByPage } =
    useCarousel({
      // 카드를 보고 있거나 동작 줄이기 설정이면 멈춤
      autoplay: playing && !reading && !reducedMotion,
      interval: 5000,
    });

  return (
    <section id="news" className={styles.section} aria-labelledby="news-title">
      <div className={styles.inner}>
        <SectionHeader
          id="news-title"
          eyebrow="NEWSROOM"
          title={
            <>
              다양한 매체에 소개된
              <br />
              온결의 이야기를 만나보세요
            </>
          }
          description="언론 보도와 칼럼으로 전해진 온결피부과의 소식과 피부 건강 정보를 모았습니다."
        />

        {/* ---------- 기사 카드 ---------- */}
        <ul
          ref={trackRef}
          className={styles.track}
          onScroll={handleScroll}
          onPointerEnter={() => setReading(true)}
          onPointerLeave={() => setReading(false)}
          onFocus={() => setReading(true)}
          onBlur={() => setReading(false)}
        >
          {NEWS.map((item) => (
            <li key={item.slug} className={styles.item}>
              <Link href={`/news/${item.slug}`} className={styles.card}>
                <div className={styles.thumb}>
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 400px"
                    placeholder="blur"
                  />
                </div>
                <p className={styles.meta}>
                  <span className={styles.category}>{item.category}</span>
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </p>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </Link>
            </li>
          ))}
        </ul>

        {/* ---------- 컨트롤 ---------- */}
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.control}
            aria-label="이전 소식"
            onClick={() => scrollByPage(-1)}
          >
            <CaretLeftIcon size={20} weight="fill" />
          </button>

          <div className={styles.dots}>
            {Array.from({ length: pageCount }, (_, index) => (
              <button
                key={index}
                type="button"
                className={styles.dot}
                aria-label={`${index + 1}번째 묶음 보기`}
                aria-current={index === page ? "true" : undefined}
                onClick={() => scrollToPage(index)}
              />
            ))}
          </div>

          <button
            type="button"
            className={styles.control}
            aria-label="다음 소식"
            onClick={() => scrollByPage(1)}
          >
            <CaretRightIcon size={20} weight="fill" />
          </button>

          <button
            type="button"
            className={styles.control}
            aria-label={playing ? "자동 넘김 정지" : "자동 넘김 재생"}
            onClick={() => setPlaying((prev) => !prev)}
          >
            {playing ? (
              <PauseIcon size={20} weight="fill" />
            ) : (
              <PlayIcon size={20} weight="fill" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}