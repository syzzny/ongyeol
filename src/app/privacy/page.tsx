import type { Metadata } from "next";
import Policy from "@/components/Policy/Policy";

export const metadata: Metadata = {
  title: "개인정보처리방침 | 온결피부과",
  description:
    "온결피부과 사이트는 포트폴리오용 가상 사이트이며 개인정보를 수집하지 않습니다.",
};

const SECTIONS = [
  {
    title: "수집하는 개인정보",
    body: [
      "이 사이트는 방문자의 개인정보를 수집하거나 저장하지 않습니다.",
      "회원 가입과 로그인 기능이 없으며, 방문 기록을 분석하는 도구도 사용하지 않습니다.",
    ],
  },
  {
    title: "상담 신청 화면",
    body: [
      "상담 신청 화면은 화면이 어떻게 동작하는지 보여 주기 위해 만든 것입니다.",
      "입력한 이름, 연락처, 예약 일시는 브라우저 밖으로 전송되지 않고 어디에도 저장되지 않습니다. 페이지를 새로 고치면 모두 사라집니다.",
    ],
  },
  {
    title: "외부 서비스",
    body: [
      "오시는 길의 지도는 카카오맵을 불러와 보여 주고, 사이트는 Vercel을 통해 제공됩니다.",
      "이 과정에서 각 서비스가 접속 기록을 처리할 수 있으며, 이는 해당 서비스의 개인정보처리방침을 따릅니다.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <Policy
      eyebrow="PRIVACY POLICY"
      title="개인정보처리방침"
      updated="2026-10-07"
      lead="온결피부과는 포트폴리오용으로 만든 가상의 병원 사이트입니다. 실제로 운영되는 병원이 아니며, 방문자의 개인정보를 수집하지 않습니다."
      sections={SECTIONS}
    />
  );
}
