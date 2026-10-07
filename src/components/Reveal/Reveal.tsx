"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  className?: string;
  // 어디까지 들어와야 "보인다"로 칠지. 기본값: 화면 아래쪽 15% 안으로 들어왔을 때
  rootMargin?: string;
  children: React.ReactNode;
};

/**
 * 화면에 들어오는 순간을 알려주는 감싸개
 * - 처음에는 아무 표시가 없다가, 스크롤해서 보이기 시작하면 data-visible 속성이 붙음
 * - 실제 움직임은 CSS에서 [data-visible] 유무로 정함
 */
export default function Reveal({
  className,
  rootMargin = "0px 0px -15% 0px",
  children,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setVisible(true);
        observer.disconnect(); // 한 번 보이면 더 지켜볼 필요 없음
      },
      { rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div
      ref={ref}
      className={className}
      data-visible={visible ? "" : undefined}
    >
      {children}
    </div>
  );
}
