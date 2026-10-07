import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ConsultBanner from "@/components/ConsultBanner/ConsultBanner";
import CategoryNav from "@/components/TreatmentIndex/CategoryNav";
import { CATEGORIES, toSlug } from "@/components/Treatments/data";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "시술안내 | 온결피부과",
  description:
    "온결피부과에서 진료하는 시술을 카테고리별로 확인하실 수 있습니다.",
};

// 카테고리마다 페이지 안에서 쓸 위치 이름(id)을 붙임 → #category-1, #category-2 …
const GROUPS = CATEGORIES.map((category, index) => ({
  ...category,
  id: `category-${index + 1}`,
}));

export default function TreatmentsPage() {
  return (
    <main>
      {/* ---------- 페이지 제목 ---------- */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div>
            <p className={styles.eyebrow}>TREATMENTS</p>
            {/* 한 줄씩 아래에서 올라오게 하려고 줄마다 감쌈 */}
            <h1 className={styles.title}>
              <span className={styles.line}>
                <span>진단 결과에 맞춰</span>
              </span>
              <span className={styles.line}>
                <span>필요한 시술만 권합니다</span>
              </span>
            </h1>
          </div>

          <p className={styles.lead}>
            온결피부과에서 진료하는 시술을 한곳에 모았습니다. 시술을 누르면
            설명과 가격을 확인하실 수 있습니다.
          </p>
        </div>
      </section>

      {/* ---------- 카테고리 | 시술 목록 ---------- */}
      <div className={styles.layout}>
        <CategoryNav
          categories={GROUPS.map((group) => ({
            id: group.id,
            name: group.name,
            count: group.items.length,
          }))}
        />

        <div className={styles.groups}>
          {GROUPS.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className={styles.group}
              aria-labelledby={`${group.id}-title`}
            >
              <h2 id={`${group.id}-title`} className={styles.groupTitle}>
                {group.name}
              </h2>

              <ul>
                {group.items.map((item) => (
                  <li key={item.en}>
                    <Link
                      href={`/treatments/${toSlug(item.en)}`}
                      className={styles.row}
                    >
                      <span className={styles.en} lang="en">
                        {item.en}
                      </span>
                      <strong className={styles.name}>{item.name}</strong>
                      <span className={styles.desc}>{item.description}</span>
                      <ArrowUpRight
                        className={styles.arrow}
                        size={20}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <ConsultBanner
        title="어떤 시술이 맞을지 모르겠다면"
        description="상담과 피부 진단을 먼저 받아보세요. 필요한 시술만 안내해 드립니다."
      />
    </main>
  );
}
