import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock3, Repeat2, Sparkles } from "lucide-react";
import OptionList from "@/components/TreatmentDetail/OptionList";
import SelectionPanel from "@/components/TreatmentDetail/SelectionPanel";
import TreatmentNav from "@/components/TreatmentDetail/TreatmentNav";
import {
  CATEGORIES,
  findTreatment,
  getOptions,
  toSlug,
  withJosa,
} from "@/components/Treatments/data";
import styles from "./page.module.scss";

// 빌드할 때 모든 시술의 상세 페이지를 미리 만들어 둠
export function generateStaticParams() {
  return CATEGORIES.flatMap((category) =>
    category.items.map((item) => ({ slug: toSlug(item.en) })),
  );
}

// 브라우저 탭 제목과 검색 결과 설명
export async function generateMetadata({
  params,
}: PageProps<"/treatments/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = findTreatment(slug);
  if (!found) return {};

  return {
    title: `${found.treatment.name} | 온결피부과`,
    description: found.treatment.description,
  };
}

export default async function TreatmentPage({
  params,
}: PageProps<"/treatments/[slug]">) {
  const { slug } = await params;
  const found = findTreatment(slug);

  // 목록에 없는 주소면 404 페이지로
  if (!found) notFound();

  const { treatment, category, tone } = found;
  const options = getOptions(treatment);

  // 값이 있는 항목만 골라서 보여줌
  const metrics = [
    { icon: Clock3, label: "치료 시간", value: treatment.duration },
    { icon: Repeat2, label: "권장 과정", value: treatment.course },
    { icon: Sparkles, label: "예상 경과", value: treatment.recovery },
  ].filter((metric) => metric.value);

  return (
    <main className={styles.page} style={{ "--tone": tone } as CSSProperties}>
      <TreatmentNav activeCategory={category} activeSlug={slug} />

      <div className={styles.inner}>
        {/* ---------- 현재 위치 ---------- */}
        <nav aria-label="현재 위치">
          <ol className={styles.breadcrumb}>
            <li>
              <Link href="/#treatments">시그니처 시술</Link>
            </li>
            <li>{category}</li>
            <li aria-current="page">{treatment.name}</li>
          </ol>
        </nav>

        <div className={styles.layout}>
          <div>
            {/* ---------- 시술 소개 ---------- */}
            <header className={styles.intro}>
              <p className={styles.en} lang="en">
                {treatment.en}
              </p>
              <h1 className={styles.title}>
                {withJosa(treatment.name, "이란", "란")}?
              </h1>
              <p className={styles.description}>
                {withJosa(treatment.name, "은", "는")} {treatment.description}
                입니다.
              </p>

              {treatment.concerns && (
                <ul className={styles.concerns} aria-label="추천 고민">
                  {treatment.concerns.map((concern) => (
                    <li key={concern}>{concern}</li>
                  ))}
                </ul>
              )}

              {metrics.length > 0 && (
                <ul className={styles.metrics}>
                  {metrics.map(({ icon: Icon, label, value }) => (
                    <li key={label} className={styles.metric}>
                      <span className={styles.metricIcon}>
                        <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <div>
                        <p className={styles.metricLabel}>{label}</p>
                        <p className={styles.metricValue}>{value}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <p className={styles.note}>
                ※ 개인에 따라 부작용이 발생할 수 있으므로 상담 후 결정
                바랍니다.
              </p>
            </header>

            {/* ---------- 가격표 ---------- */}
            <OptionList options={options} />
          </div>

          {/* ---------- 선택한 시술 ---------- */}
          <SelectionPanel />
        </div>
      </div>
    </main>
  );
}