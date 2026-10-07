"use client";

import { createContext, useContext, useState } from "react";
import type { TreatmentOption } from "@/components/Treatments/data";

type SelectionValue = {
  items: TreatmentOption[]; // 담은 시술 목록
  toggle: (option: TreatmentOption) => void; // 담기 ↔ 빼기
  remove: (id: string) => void;
  clear: () => void;
};

const SelectionContext = createContext<SelectionValue | null>(null);

/** 담은 시술 목록을 읽고 바꾸는 훅 */
export function useSelection() {
  const value = useContext(SelectionContext);
  if (!value) {
    throw new Error("useSelection은 SelectionProvider 안에서만 쓸 수 있어요.");
  }
  return value;
}

export default function SelectionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<TreatmentOption[]>([]);

  const toggle = (option: TreatmentOption) => {
    setItems((prev) =>
      prev.some((item) => item.id === option.id)
        ? prev.filter((item) => item.id !== option.id)
        : [...prev, option],
    );
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clear = () => setItems([]);

  return (
    <SelectionContext value={{ items, toggle, remove, clear }}>
      {children}
    </SelectionContext>
  );
}