"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import Link from "next/link";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import { CATEGORIES, getTone, toSlug } from "./data";
import styles from "./Treatments.module.scss";

type NavState = { canPrev: boolean; canNext: boolean };

/** 현재 스크롤 위치에서 좌우로 더 넘길 수 있는지 계산 */
function getNavState(prev: NavState, track: HTMLElement): NavState {
  const canPrev = track.scrollLeft > 1;
  const canNext = track.scrollLeft + track.clientWidth < track.scrollWidth - 1;

  // 값이 그대로면 기존 객체를 돌려줘서 불필요한 다시 그리기 방지
  if (prev.canPrev === canPrev && prev.canNext === canNext) return prev;
  return { canPrev, canNext };
}

export default function Treatments() {
  const [active, setActive] = useState(0); // 선택된 탭 번호
  const [nav, setNav] = useState<NavState>({ canPrev: false, canNext: false });
  const trackRef = useRef<HTMLUListElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  const category = CATEGORIES[active];

  // 탭이 바뀌거나 화면 크기가 바뀌면 좌우 버튼 상태 다시 계산
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(() => {
      setNav((prev) => getNavState(prev, track));
    });
    observer.observe(track);

    return () => observer.disconnect();
  }, [active]);

  // 카드 한 장만큼 좌우로 이동
  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.firstElementChild;
    if (!track || !card) return;

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (card.clientWidth + gap),
      behavior: "smooth",
    });
  };

  // VIEW 커서를 마우스 위치로 옮기고 보이기
  const moveCursor = (event: PointerEvent) => {
    const cursor = cursorRef.current;
    if (!cursor || event.pointerType !== "mouse") return;

    cursor.style.setProperty("--x", `${event.clientX}px`);
    cursor.style.setProperty("--y", `${event.clientY}px`);
    cursor.dataset.visible = "true";
  };

  const hideCursor = () => {
    if (cursorRef.current) cursorRef.current.dataset.visible = "false";
  };

  return (
    <section
      id="treatments"
      className={styles.section}
      aria-labelledby="treatments-title"
    >
      <div className={styles.inner}>
        <SectionHeader
          id="treatments-title"
          eyebrow="SIGNATURE TREATMENTS"
          title={
            <>
              카테고리별
              <br />
            시그니처 시술을 만나보세요
            </>
          }
          description="증상이 비슷해 보여도 원인과 치료 방법은 다를 수 있습니다. 피부 고민별 진료 정보를 확인해보세요."
        />

        {/* ---------- 카테고리 탭 ---------- */}
        <div className={styles.tabs} role="tablist" aria-label="시술 카테고리">
          {CATEGORIES.map((item, index) => (
            <button
              key={item.name}
              type="button"
              role="tab"
              id={`treatment-tab-${index}`}
              className={`${styles.tab} ${index === active ? styles.active : ""}`}
              aria-selected={index === active}
              aria-controls="treatment-panel"
              onClick={() => setActive(index)}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* ---------- 시술 카드 ---------- */}
        <div
          id="treatment-panel"
          role="tabpanel"
          aria-labelledby={`treatment-tab-${active}`}
        >
          <ul
            key={active}
            ref={trackRef}
            className={styles.track}
            onScroll={(event) => {
              const track = event.currentTarget;
              setNav((prev) => getNavState(prev, track));
            }}
          >
            {category.items.map((item, index) => (
              <li key={item.name} className={styles.item}>
                <Link
                  href={`/treatments/${toSlug(item.en)}`}
                  className={styles.card}
                  style={{ "--tone": getTone(index) } as CSSProperties}
                  onPointerEnter={moveCursor}
                  onPointerMove={moveCursor}
                  onPointerLeave={hideCursor}
                >
                  <p className={styles.cardEn} lang="en">
                    {item.en}
                  </p>
                  <div>
                    <h3 className={styles.cardName}>{item.name}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* 넘길 카드가 있을 때만 좌우 버튼 표시 */}
          {(nav.canPrev || nav.canNext) && (
            <div className={styles.nav}>
              <button
                type="button"
                className={styles.navButton}
                aria-label="이전 시술"
                disabled={!nav.canPrev}
                onClick={() => scrollByCard(-1)}
              >
                <CaretLeftIcon size={20} />
              </button>
              <button
                type="button"
                className={styles.navButton}
                aria-label="다음 시술"
                disabled={!nav.canNext}
                onClick={() => scrollByCard(1)}
              >
                <CaretRightIcon size={20} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 카드 위에서 마우스를 따라다니는 커서 */}
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
        VIEW
      </div>
    </section>
  );
}