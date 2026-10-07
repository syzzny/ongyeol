"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CategoryNav.module.scss";

type CategoryNavProps = {
  categories: { id: string; name: string; count: number }[];
};

/**
 * 카테고리 목록
 * - 누르면 그 카테고리 위치로 이동
 * - 스크롤하면 지금 보고 있는 카테고리가 진하게 표시됨
 */
export default function CategoryNav({ categories }: CategoryNavProps) {
  const [activeId, setActiveId] = useState(categories[0].id);
  const listRef = useRef<HTMLUListElement>(null);

  // 화면 위에서 30% 지점에 걸친 카테고리를 "지금 보고 있는 것"으로 표시
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );

    for (const category of categories) {
      const section = document.getElementById(category.id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, [categories]);

  // 모바일(가로로 미는 탭)에서 현재 카테고리가 가려지지 않게 가운데로 옮김
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>("[aria-current]");
    if (!list || !link) return;

    list.scrollTo({
      left: link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  return (
    <nav className={styles.nav} aria-label="시술 카테고리">
      <ul ref={listRef} className={styles.list}>
        {categories.map((category) => (
          <li key={category.id}>
            <a
              href={`#${category.id}`}
              className={styles.link}
              aria-current={category.id === activeId ? "true" : undefined}
            >
              {category.name}
              <span className={styles.count}>{category.count}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
