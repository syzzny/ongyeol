"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { CATEGORIES, toSlug } from "@/components/Treatments/data";
import styles from "./TreatmentNav.module.scss";

type TreatmentNavProps = {
  activeCategory: string;
  activeSlug: string;
};

export default function TreatmentNav({
  activeCategory,
  activeSlug,
}: TreatmentNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const current = CATEGORIES.find((item) => item.name === activeCategory);

  // 좁은 화면에서 현재 메뉴가 가려져 있으면 가운데로 오도록 가로 스크롤
  useEffect(() => {
    navRef.current?.querySelectorAll("ul").forEach((list) => {
      const active = list.querySelector<HTMLElement>("[aria-current]");
      if (!active) return;

      list.scrollLeft =
        active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2;
    });
  }, [activeSlug]);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="시술 메뉴">
      {/* 1단: 카테고리 */}
      <ul className={styles.categories}>
        {CATEGORIES.map((category) => (
          <li key={category.name}>
            <Link
              href={`/treatments/${toSlug(category.items[0].en)}`}
              className={styles.category}
              aria-current={category.name === activeCategory ? "true" : undefined}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* 2단: 현재 카테고리의 시술 */}
      <ul className={styles.treatments}>
        {current?.items.map((item) => {
          const slug = toSlug(item.en);

          return (
            <li key={slug}>
              <Link
                href={`/treatments/${slug}`}
                className={styles.treatment}
                aria-current={slug === activeSlug ? "page" : undefined}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}