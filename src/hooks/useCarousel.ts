"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type CarouselState = {
  page: number; // 지금 보고 있는 묶음 (0부터)
  pageCount: number; // 전체 묶음 수
  progress: number; // 스크롤 진행도 (0 ~ 1)
  visible: number; // 전체 길이 중 지금 화면에 보이는 비율 (0 ~ 1)
};

type CarouselOptions = {
  autoplay?: boolean; // true인 동안 자동으로 넘어감
  interval?: number; // 자동 넘김 간격 (ms)
};

/** 한 번 넘길 때 이동할 거리 = 보이는 폭 + 카드 사이 간격 */
function getStep(track: HTMLElement) {
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  return track.clientWidth + gap;
}

/**
 * 가로 스크롤 목록(캐러셀)에 필요한 계산을 모아둔 훅
 * - trackRef와 handleScroll을 스크롤되는 요소에 연결해서 사용
 */
export function useCarousel({
  autoplay = false,
  interval = 5000,
}: CarouselOptions = {}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [state, setState] = useState<CarouselState>({
    page: 0,
    pageCount: 1,
    progress: 0,
    visible: 0,
  });

  // 현재 스크롤 위치로 상태 다시 계산
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const step = getStep(track);
    const maxScroll = track.scrollWidth - track.clientWidth;
    const next: CarouselState = {
      page: Math.round(track.scrollLeft / step),
      pageCount: Math.max(1, Math.round(maxScroll / step) + 1),
      progress: maxScroll > 0 ? track.scrollLeft / maxScroll : 0,
      visible: track.clientWidth / track.scrollWidth,
    };

    // 값이 그대로면 다시 그리지 않음
    setState((prev) =>
      prev.page === next.page &&
      prev.pageCount === next.pageCount &&
      prev.progress === next.progress &&
      prev.visible === next.visible
        ? prev
        : next,
    );
  }, []);

  // 화면 크기가 바뀌면 다시 계산
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  /** 원하는 묶음으로 이동 */
  const scrollToPage = useCallback((page: number) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollTo({ left: page * getStep(track), behavior: "smooth" });
  }, []);

  /** 이전(-1) / 다음(1) 묶음으로 이동. 끝에서 다음을 누르면 처음으로 */
  const scrollByPage = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const atEnd = track.scrollLeft >= maxScroll - 1;
    const atStart = track.scrollLeft <= 1;

    let left = track.scrollLeft + direction * getStep(track);
    if (direction === 1 && atEnd) left = 0;
    if (direction === -1 && atStart) left = maxScroll;

    track.scrollTo({ left, behavior: "smooth" });
  }, []);

  // 자동 넘김. 묶음이 바뀔 때마다(state.page) 타이머를 새로 시작해서,
  // 직접 넘긴 직후에 곧바로 한 번 더 넘어가는 일을 막음
  useEffect(() => {
    if (!autoplay) return;

    const timer = setTimeout(() => scrollByPage(1), interval);
    return () => clearTimeout(timer);
  }, [autoplay, interval, scrollByPage, state.page]);

  return { trackRef, ...state, handleScroll: measure, scrollToPage, scrollByPage };
}