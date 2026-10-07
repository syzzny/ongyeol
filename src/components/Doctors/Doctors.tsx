import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal/Reveal";
import { DOCTORS } from "./data";
import styles from "./Doctors.module.scss";

export default function Doctors() {
  return (
    <section id="doctors" aria-labelledby="doctors-title">
      <h2 id="doctors-title" className={styles.srOnly}>
        의료진 소개
      </h2>

      {DOCTORS.map((doctor) => (
        <article key={doctor.slug} className={styles.card}>
          <div className={styles.text}>
            <div className={styles.textInner}>
              <p className={styles.label}>MEDICAL TEAM</p>
              <h3 className={styles.name}>{doctor.name}</h3>
              <p className={styles.quote}>“{doctor.quote}”</p>

              <p className={styles.philosophy}>{doctor.philosophy}</p>

              <ul className={styles.career}>
                {doctor.career.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>

              <Link href={`/doctors#${doctor.slug}`} className={styles.more}>
                프로필 자세히 보기
              </Link>
            </div>
          </div>

          {/* 화면에 들어오면 사진이 아래에서 위로 드러남 */}
          <Reveal className={styles.photo}>
            <Image
              src={doctor.photo}
              alt={`${doctor.name} 프로필 사진`}
              fill
              sizes="(max-width: 767px) 100vw, 50vw"
              placeholder="blur"
            />
          </Reveal>
        </article>
      ))}
    </section>
  );
}
