import type { Metadata } from "next";
import Image from "next/image";
import ConsultBanner from "@/components/ConsultBanner/ConsultBanner";
import { DAYS, DOCTORS } from "@/components/Doctors/data";
import type { Slot } from "@/components/Doctors/data";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "의료진 소개 | 온결피부과",
  description:
    "온결피부과의 피부과 전문의를 소개합니다. 진료 분야와 약력, 진료 일정을 확인하실 수 있습니다.",
};

/** 진료 일정표의 한 칸 */
function ScheduleCell({ slot }: { slot: Slot }) {
  if (slot === "진료") {
    return (
      <td>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.srOnly}>진료</span>
      </td>
    );
  }

  if (slot === "휴진") {
    return <td className={styles.off}>휴진</td>;
  }

  // 그 밖의 안내 문구 (예: "15시까지")
  return <td className={styles.note}>{slot}</td>;
}

export default function DoctorsPage() {
  return (
    <main>
      {/* ---------- 페이지 제목 ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>MEDICAL TEAM</p>
            {/* 한 줄씩 아래에서 올라오게 하려고 줄마다 감쌈 */}
            <h1 className={styles.title}>
              <span className={styles.line}>
                <span>상담부터 경과 확인까지</span>
              </span>
              <span className={styles.line}>
                <span>전문의가 직접 진료합니다</span>
              </span>
            </h1>
          </div>

          <p className={styles.lead}>
            온결피부과의 모든 진료는 피부과 전문의가 맡습니다. 처음 상담한
            의사가 시술과 이후 경과까지 함께 살핍니다.
          </p>
        </div>
      </section>

      {/* ---------- 의료진 한 명씩 ---------- */}
      {DOCTORS.map((doctor) => {
        // "박인홍 대표원장" → 이름과 직함으로 나눔
        const [personName, role] = doctor.name.split(" ");

        return (
          <section
            key={doctor.slug}
            id={doctor.slug}
            className={styles.profile}
            aria-labelledby={`${doctor.slug}-name`}
          >
            <div className={styles.profileInner}>
              {/* 사진: 오른쪽 내용을 읽는 동안 따라옴 */}
              <div className={styles.photoColumn}>
                <Reveal className={styles.photo} rootMargin="0px">
                  <Image
                    src={doctor.photo}
                    alt={`${doctor.name} 프로필 사진`}
                    fill
                    sizes="(max-width: 767px) 100vw, 480px"
                    placeholder="blur"
                  />
                </Reveal>
              </div>

              <div className={styles.content}>
                <h2 id={`${doctor.slug}-name`} className={styles.name}>
                  {personName}
                  <span className={styles.role}>{role}</span>
                </h2>
                <p className={styles.quote}>“{doctor.quote}”</p>
                <p className={styles.philosophy}>{doctor.philosophy}</p>

                <dl className={styles.details}>
                  <div className={styles.row}>
                    <dt>진료 분야</dt>
                    <dd>
                      <ul className={styles.fields}>
                        {doctor.fields.map((field) => (
                          <li key={field}>{field}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div className={styles.row}>
                    <dt>학력 · 경력</dt>
                    <dd>
                      <ul className={styles.list}>
                        {doctor.history.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div className={styles.row}>
                    <dt>학회 활동</dt>
                    <dd>
                      <ul className={styles.list}>
                        {doctor.societies.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div className={styles.row}>
                    <dt>진료 일정</dt>
                    <dd>
                      <table className={styles.schedule}>
                        <caption className={styles.srOnly}>
                          {doctor.name} 요일별 진료 일정
                        </caption>
                        <thead>
                          <tr>
                            <td />
                            {DAYS.map((day) => (
                              <th key={day} scope="col">
                                {day}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">오전</th>
                            {doctor.schedule.am.map((slot, index) => (
                              <ScheduleCell key={DAYS[index]} slot={slot} />
                            ))}
                          </tr>
                          <tr>
                            <th scope="row">오후</th>
                            {doctor.schedule.pm.map((slot, index) => (
                              <ScheduleCell key={DAYS[index]} slot={slot} />
                            ))}
                          </tr>
                        </tbody>
                      </table>
                      <p className={styles.scheduleNote}>
                        오전 10:00–13:00, 오후 14:00–19:00 · 일요일과 공휴일은
                        휴진입니다.
                      </p>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        );
      })}

      <ConsultBanner
        title="어느 원장에게 상담할지 고민되시나요?"
        description="상담을 신청하시면 피부 고민에 맞는 의료진을 안내해 드립니다."
      />
    </main>
  );
}
