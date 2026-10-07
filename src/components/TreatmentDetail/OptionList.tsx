"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { formatPrice } from "@/components/Treatments/data";
import type { TreatmentOption } from "@/components/Treatments/data";
import { useSelection } from "./SelectionProvider";
import styles from "./OptionList.module.scss";

const SORTS = [
  { key: "default", label: "기본순" },
  { key: "low", label: "낮은 가격순" },
  { key: "high", label: "높은 가격순" },
] as const;

type SortKey = (typeof SORTS)[number]["key"];

export default function OptionList({ options }: { options: TreatmentOption[] }) {
  const [sort, setSort] = useState<SortKey>("default");
  const { items, toggle } = useSelection();

  // 원본 순서는 그대로 두고, 복사본을 정렬
  const sorted =
    sort === "default"
      ? options
      : [...options].sort((a, b) =>
          sort === "low" ? a.price - b.price : b.price - a.price,
        );

  return (
    <section aria-labelledby="option-title">
      <div className={styles.toolbar}>
        <h2 id="option-title" className={styles.count}>
          시술 옵션 <strong>{options.length}</strong>개
        </h2>

        <div className={styles.sorts} role="group" aria-label="정렬">
          {SORTS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={styles.sort}
              aria-pressed={sort === item.key}
              onClick={() => setSort(item.key)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <ul>
        {sorted.map((option) => {
          const selected = items.some((item) => item.id === option.id);
          // 할인율 = (1 - 판매가 ÷ 원래 가격) × 100
          const discount = option.originalPrice
            ? Math.round((1 - option.price / option.originalPrice) * 100)
            : 0;

          return (
            <li key={option.id} className={styles.row}>
              <div className={styles.info}>
                {option.badge && (
                  <span className={styles.badge}>{option.badge}</span>
                )}
                <p className={styles.name}>{option.name}</p>
                {option.note && <p className={styles.note}>{option.note}</p>}
              </div>

              <div className={styles.priceBox}>
                {option.originalPrice && (
                  <del className={styles.original}>
                    {formatPrice(option.originalPrice)}
                  </del>
                )}
                <p className={styles.price}>
                  {discount > 0 && (
                    <span className={styles.discount}>{discount}%</span>
                  )}
                  {formatPrice(option.price)}
                </p>
              </div>

              <button
                type="button"
                className={styles.add}
                aria-pressed={selected}
                aria-label={`${option.name} ${selected ? "빼기" : "담기"}`}
                onClick={() => toggle(option)}
              >
                {selected ? <Check size={22} /> : <Plus size={22} />}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}