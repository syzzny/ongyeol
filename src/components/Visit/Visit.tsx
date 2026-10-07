import SectionHeader from "@/components/SectionHeader/SectionHeader";
import KakaoMap from "./KakaoMap";
import styles from "./Visit.module.scss";

// 진료시간표 — closed: true 면 흐린 색으로 표시
const HOURS = [
  { label: "평일", time: "10:00 – 19:00" },
  { label: "토요일", time: "10:00 – 15:00" },
  { label: "점심시간", time: "13:00 – 14:00" },
  { label: "일요일 · 공휴일", time: "휴진", closed: true },
];

export default function Visit() {
  return (
    <section id="visit" className={styles.section} aria-labelledby="visit-title">
      <div className={styles.inner}>
        <SectionHeader
          id="visit-title"
          eyebrow="VISIT & INFORMATION"
          title="진료 안내와 오시는 길"
        />

        <div className={styles.layout}>
          {/* ---------- 지도 ---------- */}
          <KakaoMap address="서울 강남구 도산대로 152" />

          {/* ---------- 방문 정보 ---------- */}
          <dl className={styles.info}>
            <div className={styles.row}>
              <dt>전화</dt>
              <dd>
                <a href="tel:02-512-0728" className={styles.phone}>
                  02 512 0728
                </a>
              </dd>
            </div>

            <div className={styles.row}>
              <dt>주소</dt>
              <dd>서울특별시 강남구 도산대로 152, 5층</dd>
            </div>

            <div className={styles.row}>
              <dt>지하철</dt>
              <dd>3호선 신사역 1번 출구 도보 6분</dd>
            </div>

            <div className={styles.row}>
              <dt>주차</dt>
              <dd>건물 내 주차 가능</dd>
            </div>

            <div className={styles.row}>
              <dt>진료시간</dt>
              <dd>
                <ul className={styles.hours}>
                  {HOURS.map((item) => (
                    <li
                      key={item.label}
                      className={item.closed ? styles.closed : undefined}
                    >
                      <span>{item.label}</span>
                      <span>{item.time}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}