import type { StaticImageData } from "next/image";
import doctorKim from "@/assets/images/doctor-kim.jpg";
import doctorPark from "@/assets/images/doctor-park.jpg";

// 진료 일정 한 칸: 진료 / 휴진 / 그 밖의 안내 문구(예: "15시까지")
export type Slot = "진료" | "휴진" | (string & {});

export type Doctor = {
  slug: string; // 주소에 쓰이는 이름 → /doctors#slug
  name: string;
  quote: string;
  philosophy: string;
  career: string[]; // 메인 화면에 보이는 요약 약력
  photo: StaticImageData;

  // ↓ 의료진 소개 페이지용
  fields: string[]; // 진료 분야
  history: string[]; // 학력 · 경력
  societies: string[]; // 학회 활동
  schedule: { am: Slot[]; pm: Slot[] }; // 월 ~ 토 순서
};

export const DAYS = ["월", "화", "수", "목", "금", "토"];

export const DOCTORS: Doctor[] = [
  {
    slug: "park",
    name: "박인홍 대표원장",
    quote:
      "빠른 변화보다 피부가 스스로 건강해질 수 있는 방향을 함께 찾겠습니다.",
    philosophy:
      "충분한 문진과 관찰을 바탕으로 치료의 이유와 예상 경과를 설명합니다. 환자가 이해하고 선택할 수 있는 진료를 중요하게 생각합니다.",
    career: [
      "서울대학교 의과대학 졸업 · 피부과 전문의",
      "대한피부과학회 정회원 · 대한여드름주사학회 정회원",
      "전 서울대학교병원 피부과 임상강사",
    ],
    photo: doctorPark,
    fields: ["리프팅레이저", "안티에이징", "필러·페이스볼륨", "바디라인"],
    history: [
      "서울대학교 의과대학 졸업",
      "서울대학교병원 피부과 전공의 수료",
      "피부과 전문의",
      "전 서울대학교병원 피부과 임상강사",
    ],
    societies: ["대한피부과학회 정회원", "대한여드름주사학회 정회원"],
    schedule: {
      am: ["진료", "진료", "진료", "휴진", "진료", "진료"],
      pm: ["진료", "진료", "진료", "진료", "진료", "15시까지"],
    },
  },
  {
    slug: "kim",
    name: "김서윤 대표원장",
    quote: "모든 진료에 제 이름을 걸고, 끝까지 책임지겠습니다.",
    philosophy:
      "충분한 문진과 관찰을 바탕으로 치료의 이유와 예상 경과를 설명합니다. 환자가 이해하고 선택할 수 있는 진료를 중요하게 생각합니다.",
    career: [
      "서울대학교 의과대학 졸업 · 피부과 전문의",
      "대한피부과학회 정회원 · 대한여드름주사학회 정회원",
      "전 서울대학교병원 피부과 임상강사",
    ],
    photo: doctorKim,
    fields: ["색소·모공·여드름", "스킨부스터", "스킨케어"],
    history: [
      "서울대학교 의과대학 졸업",
      "서울대학교병원 피부과 전공의 수료",
      "피부과 전문의",
      "전 서울대학교병원 피부과 임상강사",
    ],
    societies: ["대한피부과학회 정회원", "대한여드름주사학회 정회원"],
    schedule: {
      am: ["휴진", "진료", "진료", "진료", "진료", "진료"],
      pm: ["진료", "진료", "휴진", "진료", "진료", "15시까지"],
    },
  },
];
