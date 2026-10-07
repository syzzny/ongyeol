import SelectionProvider from "@/components/TreatmentDetail/SelectionProvider";

// /treatments/ 아래 모든 페이지가 "담은 시술" 목록을 함께 씀
// → 다른 시술 페이지로 이동해도 담은 내용이 유지됨
export default function TreatmentsLayout({
  children,
}: LayoutProps<"/treatments">) {
  return <SelectionProvider>{children}</SelectionProvider>;
}