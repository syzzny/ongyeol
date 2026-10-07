"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { NEWS, formatDate } from "@/components/News/data";
import type { NewsItem } from "@/components/News/data";
import styles from "./NewsList.module.scss";

const ALL = "전체";

// 분류 버튼: "전체" + 기사에 쓰인 분류를 겹치지 않게 모음
const CATEGORIES = [ALL, ...new Set(NEWS.map((item) => item.category))];

/** 분류 · 날짜 한 줄 */
function Meta({ item }: { item: NewsItem }) {
  return (
    <p className={styles.meta}>
      <span className={styles.category}>{item.category}</span>
      <time dateTime={item.date}>{formatDate(item.date)}</time>
    </p>
  );
}

export default function NewsList() {
  const [selected, setSelected] = useState(ALL);

  const items =
    selected === ALL
      ? NEWS
      : NEWS.filter((item) => item.category === selected);

  // 가장 최신 글 하나는 크게, 나머지는 카드로
  const [featured, ...rest] = items;

  return (
    <div className={styles.wrap}>
      {/* ---------- 분류 버튼 ---------- */}
      <ul className={styles.filters} aria-label="분류">
        {CATEGORIES.map((category) => (
          <li key={category}>
            <button
              type="button"
              className={styles.filter}
              aria-pressed={category === selected}
              onClick={() => setSelected(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      {/* 화면 낭독기에 결과가 바뀌었음을 알림 */}
      <p className={styles.srOnly} aria-live="polite">
        {selected} {items.length}건
      </p>

      {/* key가 바뀌면 새로 그려지면서 나타나는 효과가 다시 실행됨 */}
      <div key={selected} className={styles.result}>
        {/* ---------- 대표 글 ---------- */}
        <Link href={`/news/${featured.slug}`} className={styles.featured}>
          <div className={styles.featuredPhoto}>
            <Image
              src={featured.image}
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 60vw"
              placeholder="blur"
              preload
            />
          </div>

          <div>
            <Meta item={featured} />
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <p className={styles.featuredDesc}>{featured.description}</p>
            <span className={styles.more}>자세히 보기</span>
          </div>
        </Link>

        {/* ---------- 나머지 글 ---------- */}
        {rest.length > 0 && (
          <ul className={styles.grid}>
            {rest.map((item) => (
              <li key={item.slug}>
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
                  <Meta item={item} />
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
