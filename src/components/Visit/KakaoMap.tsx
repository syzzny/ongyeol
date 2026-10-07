"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { ArrowUpRight, MapPin } from "lucide-react";
import styles from "./KakaoMap.module.scss";

/* ---------- 카카오맵 SDK 중 여기서 쓰는 부분만 타입으로 적어둠 ---------- */

type LatLng = object;

type KakaoMapInstance = {
  relayout: () => void;
  setCenter: (position: LatLng) => void;
  addControl: (control: object, position: unknown) => void;
};

type KakaoMaps = {
  load: (callback: () => void) => void;
  LatLng: new (lat: number, lng: number) => LatLng;
  Map: new (
    container: HTMLElement,
    options: {
      center: LatLng;
      level: number;
      draggable?: boolean;
      scrollwheel?: boolean;
    },
  ) => KakaoMapInstance;
  Marker: new (options: { map: KakaoMapInstance; position: LatLng }) => object;
  ZoomControl: new () => object;
  ControlPosition: { RIGHT: unknown };
  services: {
    Geocoder: new () => {
      addressSearch: (
        address: string,
        callback: (result: { x: string; y: string }[], status: string) => void,
      ) => void;
    };
    Status: { OK: string };
  };
};

declare global {
  interface Window {
    kakao?: { maps: KakaoMaps };
  }
}

/* ---------- 컴포넌트 ---------- */

// .env.local 에 적어둔 JavaScript 키
const APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

type KakaoMapProps = {
  address: string; // 지도 중심으로 삼을 주소
};

export default function KakaoMap({ address }: KakaoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<{ map: KakaoMapInstance; position: LatLng }>(null);
  const startedRef = useRef(false); // 지도를 두 번 만들지 않기 위한 표시

  // loading: 불러오는 중 / ready: 지도 표시 / error: 키가 없거나 불러오기 실패
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    APP_KEY ? "loading" : "error",
  );

  // 카카오맵 사이트에서 같은 주소를 여는 링크
  const linkHref = `https://map.kakao.com/link/search/${encodeURIComponent(address)}`;

  /** SDK 파일을 다 받은 뒤 실행: 주소 → 좌표로 바꾸고 지도와 마커를 그림 */
  function initMap() {
    const kakao = window.kakao;
    if (!kakao || startedRef.current) return;
    startedRef.current = true;

    kakao.maps.load(() => {
      const geocoder = new kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result, searchStatus) => {
        const container = containerRef.current;

        if (searchStatus !== kakao.maps.services.Status.OK || !container) {
          setStatus("error");
          return;
        }

        const position = new kakao.maps.LatLng(
          Number(result[0].y), // 위도
          Number(result[0].x), // 경도
        );

        // 손가락으로 쓰는 기기에서는 지도를 고정 (페이지 스크롤을 지도가 가로채지 않게)
        const isTouch = window.matchMedia("(pointer: coarse)").matches;

        const map = new kakao.maps.Map(container, {
          center: position,
          level: 3, // 확대 정도 (숫자가 작을수록 가까이)
          draggable: !isTouch,
          scrollwheel: false, // 마우스 휠은 페이지 스크롤에만 쓰이게
        });

        new kakao.maps.Marker({ map, position });

        // 휠 확대를 껐으니 마우스 사용자에게는 + − 버튼을 제공
        if (!isTouch) {
          map.addControl(
            new kakao.maps.ZoomControl(),
            kakao.maps.ControlPosition.RIGHT,
          );
        }

        mapRef.current = { map, position };
        setStatus("ready");
      });
    });
  }

  // 지도 영역 크기가 바뀌면 지도를 다시 맞추고 병원 위치를 가운데로
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      if (!mapRef.current) return;

      mapRef.current.map.relayout();
      mapRef.current.map.setCenter(mapRef.current.position);
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.map}>
      {APP_KEY && (
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&libraries=services&autoload=false`}
          strategy="lazyOnload"
          onReady={initMap}
          onError={() => setStatus("error")}
        />
      )}

      {/* 카카오맵이 그려지는 자리 */}
      <div ref={containerRef} className={styles.canvas} />

      {/* 지도가 준비되기 전 · 불러오지 못했을 때 보이는 화면 */}
      {status !== "ready" && (
        <div className={styles.fallback}>
          <span className={styles.pin}>
            <MapPin size={24} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <p className={styles.fallbackTitle}>
            {status === "loading"
              ? "지도를 불러오는 중입니다"
              : "지도를 불러오지 못했습니다"}
          </p>
          <p className={styles.fallbackAddress}>{address}</p>
        </div>
      )}

      <a
        href={linkHref}
        target="_blank"
        rel="noreferrer"
        className={styles.open}
      >
        카카오맵에서 보기
        <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
      </a>
    </div>
  );
}