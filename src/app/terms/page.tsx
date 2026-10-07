import type { Metadata } from "next";
import Policy from "@/components/Policy/Policy";

export const metadata: Metadata = {
  title: "이용약관 | 온결피부과",
  description:
    "온결피부과 사이트는 포트폴리오용 가상 사이트이며 실제 병원·진료와 관련이 없습니다.",
};

const SECTIONS = [
  {
    title: "사이트의 성격",
    body: [
      "이 사이트는 웹 퍼블리싱 포트폴리오로 만든 가상의 병원 사이트입니다.",
      "병원 이름, 의료진, 주소, 전화번호, 사업자등록번호를 비롯한 모든 정보는 지어낸 것이며, 실제 병원, 인물, 단체와 관련이 없습니다.",
    ],
  },
  {
    title: "예약과 상담",
    body: [
      "상담 신청과 진료 예약은 실제로 접수되지 않습니다.",
      "사이트에 적힌 전화번호와 주소로 연락하거나 방문하셔도 진료를 받으실 수 없습니다.",
    ],
  },
  {
    title: "의료 정보",
    body: [
      "시술 설명, 가격, 진료 일정, 뉴스룸의 글은 화면 구성을 위한 예시입니다.",
      "의학적 조언이 아니므로, 피부 고민이나 시술에 대해서는 실제 의료 기관에서 상담받으시기 바랍니다.",
    ],
  },
];

export default function TermsPage() {
  return (
    <Policy
      eyebrow="TERMS OF USE"
      title="이용약관"
      updated="2026-10-07"
      lead="온결피부과는 포트폴리오용으로 만든 가상의 병원 사이트입니다. 아래 내용을 확인하고 이용해 주세요."
      sections={SECTIONS}
    />
  );
}
