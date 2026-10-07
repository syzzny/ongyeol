"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import clinicConsultation from "@/assets/images/clinic-consultation.jpg";
import clinicReception from "@/assets/images/clinic-reception.jpg";
import clinicTreatment from "@/assets/images/clinic-treatment.jpg";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { useCarousel } from "@/hooks/useCarousel";
import styles from "./Clinic.module.scss";

const SPACES = [
  {
    en: "RECEPTION",
    name: "안내 데스크",
    image: clinicReception,
    alt: "곡선형 소파와 낮은 테이블이 놓인 안내 데스크 앞 대기 공간",
  },
  {
    en: "CONSULTATION",
    name: "상담실",
    image: clinicConsultation,
    alt: "유리 벽으로 나뉜 독립 상담실",
  },
  {
    en: "TREATMENT ROOM",
    name: "시술실",
    image: clinicTreatment,
    alt: "시술 베드와 수납장이 놓인 시술실",
  },
];

export default function Clinic() {
  const { trackRef, progress, visible, handleScroll, scrollByPage } =
    useCarousel();

  // 진행 바 길이: 처음에는 보이는 만큼만 차 있고, 끝까지 넘기면 100%
  const filled = visible + progress * (1 - visible);

  const canScroll = visible < 1; // 넘길 사진이 있는지
  const atStart = progress <= 0.01;
  const atEnd = progress >= 0.99;

  return (
    <section
      id="clinic"
      className={styles.section}
      aria-labelledby="clinic-title"
    >
      <div className={styles.inner}>
        <SectionHeader
          id="clinic-title"
          eyebrow="THE CLINIC"
          title={
            <>
              머무는 동안 편안하고,
              <br />
              진료는 온전히 개인적으로
            </>
          }
          description="독립된 상담실과 정돈된 동선, 안정적인 조도를 통해 편안하고 사적인 진료 환경을 마련했습니다."
        />

        {/* ---------- 공간 사진 ---------- */}
        <ul ref={trackRef} className={styles.track} onScroll={handleScroll}>
          {SPACES.map((space) => (
            <li key={space.en} className={styles.item}>
              <figure className={styles.photo}>
                <Image
                  src={space.image}
                  alt={space.alt}
                  fill
                  sizes="(max-width: 767px) 85vw, 500px"
                  placeholder="blur"
                />
                <figcaption className={styles.label}>
                  <span lang="en">{space.en}</span> · {space.name}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {/* ---------- 진행 바 · 이전/다음 ---------- */}
        <div className={styles.footer}>
          <div
            className={styles.bar}
            style={{ "--filled": filled } as CSSProperties}
            aria-hidden="true"
          />

          <button
            type="button"
            className={styles.control}
            aria-label="이전 사진"
            disabled={!canScroll || atStart}
            onClick={() => scrollByPage(-1)}
          >
            <CaretLeftIcon size={20} weight="fill" />
          </button>
          <button
            type="button"
            className={styles.control}
            aria-label="다음 사진"
            disabled={!canScroll || atEnd}
            onClick={() => scrollByPage(1)}
          >
            <CaretRightIcon size={20} weight="fill" />
          </button>
        </div>
      </div>
    </section>
  );
}