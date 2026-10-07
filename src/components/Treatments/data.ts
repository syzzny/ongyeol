export type TreatmentOption = {
  id: string; // 선택 목록에서 구분하는 고유 값 (자동으로 붙음)
  name: string;
  price: number; // 판매가 (원)
  originalPrice?: number; // 할인 전 가격 — 있으면 할인율이 표시됨
  badge?: string; // 이름 위 작은 라벨 (예: "첫 방문 혜택")
  note?: string; // 구성 설명 (예: "써마지 1회 + 진정 관리 1회")
};

export type Treatment = {
  en: string; // 카드 위쪽 영문 이름
  name: string; // 한글 이름
  description: string;

  // ↓ 상세 페이지용 — 비워두면 그 항목은 화면에 나오지 않음
  concerns?: string[]; // 추천 고민 (예: ["기미", "잡티"])
  duration?: string; // 치료 시간 (예: "약 20–30분")
  course?: string; // 권장 과정 (예: "3–5회 · 3–4주 간격")
  recovery?: string; // 예상 경과 (예: "붉음 1–2일")
  options?: Omit<TreatmentOption, "id">[]; // 가격표 — 비워두면 예시 가격표가 나옴
};
export type TreatmentCategory = {
  name: string;
  items: Treatment[];
};

export const CATEGORIES: TreatmentCategory[] = [
  {
    name: "리프팅레이저",
    items: [
      {
        en: "ONDA",
        name: "온다리프팅",
        description: "마이크로웨이브로 지방층과 탄력을 함께 관리하는 리프팅 시술",
      },
      {
        en: "INMODE",
        name: "인모드",
        description: "다중 RF로 지방 감소와 탄력 개선을 동시에 유도하는 시술",
      },
      {
        en: "THERMAGE",
        name: "써마지",
        description: "고주파 열로 진피 콜라겐 재생을 유도하는 리프팅 시술",
      },
      {
        en: "OLIGIO",
        name: "올리지오",
        description: "고주파로 진피층을 자극해 탄력과 주름을 개선하는 시술",
      },
      {
        en: "SHURINK UNIVERSE",
        name: "슈링크유니버스",
        description: "집속 초음파로 피부 탄력을 단계적으로 끌어올리는 시술",
      },
    ],
  },
  {
    name: "필러·페이스볼륨",
    items: [
      {
        en: "JUVEDERM",
        name: "쥬비덤",
        description: "히알루론산 필러로 꺼진 부위의 볼륨을 채우는 시술",
      },
      {
        en: "RESTYLANE",
        name: "레스틸렌",
        description: "히알루론산 필러로 윤곽과 주름을 자연스럽게 보완하는 시술",
      },
      {
        en: "BELOTERO",
        name: "벨로테로",
        description: "히알루론산 필러로 잔주름과 얕은 꺼짐을 보완하는 시술",
      },
      {
        en: "SCULPTRA",
        name: "스컬트라",
        description: "PLLA 성분으로 콜라겐 생성을 유도해 볼륨을 채우는 시술",
      },
      {
        en: "ELLANSE",
        name: "엘란쎄",
        description: "PCL 성분으로 볼륨과 콜라겐 생성을 함께 돕는 시술",
      },
    ],
  },
  {
    name: "안티에이징",
    items: [
      {
        en: "BOTOX",
        name: "보톡스",
        description: "근육의 움직임을 줄여 표정 주름을 완화하는 시술",
      },
      {
        en: "ULTHERA",
        name: "울쎄라",
        description: "집속 초음파로 피부 깊은 층을 자극하는 리프팅 시술",
      },
      {
        en: "SOFWAVE",
        name: "소프웨이브",
        description: "초음파 열로 진피층 콜라겐 재생을 유도하는 시술",
      },
      {
        en: "TITANIUM",
        name: "티타늄리프팅",
        description: "세 가지 파장의 레이저로 탄력과 피부 톤을 관리하는 시술",
      },
      {
        en: "THREAD LIFT",
        name: "실리프팅",
        description: "녹는 실로 처진 피부를 당겨 고정하는 시술",
      },
    ],
  },
  {
    name: "스킨부스터",
    items: [
      {
        en: "REJURAN",
        name: "리쥬란",
        description: "폴리뉴클레오타이드 성분으로 피부 재생을 돕는 시술",
      },
      {
        en: "JUVELOOK",
        name: "쥬베룩",
        description: "PDLLA와 히알루론산으로 콜라겐 생성을 유도하는 시술",
      },
      {
        en: "SKINVIVE",
        name: "스킨바이브",
        description: "히알루론산을 진피층에 주입해 수분과 결을 개선하는 시술",
      },
      {
        en: "PROFHILO",
        name: "프로파일로",
        description: "고농도 히알루론산으로 피부 탄력과 수분을 돕는 시술",
      },
      {
        en: "EXOSOME",
        name: "엑소좀",
        description: "엑소좀 성분을 피부에 전달해 컨디션 회복을 돕는 관리",
      },
    ],
  },
  {
    name: "색소·모공·여드름",
    items: [
      {
        en: "PICOSURE",
        name: "피코슈어",
        description: "피코초 레이저로 색소를 잘게 부수어 톤을 개선하는 시술",
      },
      {
        en: "LASER TONING",
        name: "레이저토닝",
        description: "낮은 에너지 레이저로 기미와 잡티를 완화하는 시술",
      },
      {
        en: "FRAXEL",
        name: "프락셀",
        description: "미세한 레이저 빔으로 흉터와 모공을 개선하는 시술",
      },
      {
        en: "POTENZA",
        name: "포텐자",
        description: "마이크로니들 고주파로 모공과 여드름 흉터를 관리하는 시술",
      },
      {
        en: "AGNES",
        name: "아그네스",
        description: "미세 절연침 고주파로 피지선을 선택적으로 치료하는 시술",
      },
    ],
  },
  {
    name: "스킨케어",
    items: [
      {
        en: "AQUA PEEL",
        name: "아쿠아필",
        description: "용액과 흡입으로 모공 속 노폐물을 정리하는 관리",
      },
      {
        en: "LDM",
        name: "엘디엠",
        description: "고밀도 초음파로 피부 진정과 수분 균형을 돕는 관리",
      },
      {
        en: "CRYO",
        name: "크라이오",
        description: "냉각 에너지로 시술 후 붉은기와 열감을 진정시키는 관리",
      },
      {
        en: "LALA PEEL",
        name: "라라필",
        description: "LHA 성분으로 각질과 피지를 부드럽게 정돈하는 관리",
      },
      {
        en: "MODELING",
        name: "모델링팩",
        description: "시술 후 열감을 가라앉히고 수분을 채우는 진정 관리",
      },
    ],
  },
  {
    name: "바디라인",
    items: [
      {
        en: "COOL SCULPTING",
        name: "쿨스컬프팅",
        description: "냉각 에너지로 지방세포를 줄이는 비수술 체형 관리",
      },
      {
        en: "ONDA BODY",
        name: "온다 바디",
        description: "마이크로웨이브로 복부·허벅지 지방층을 관리하는 시술",
      },
      {
        en: "EMSCULPT",
        name: "엠스컬프트",
        description: "고강도 전자기장으로 근육 수축을 유도하는 체형 관리",
      },
      {
        en: "LIPOLYSIS",
        name: "지방분해주사",
        description: "주사로 국소 부위의 지방 분해를 돕는 시술",
      },
      {
        en: "BODY TONING",
        name: "바디토닝",
        description: "레이저로 팔꿈치·겨드랑이 등의 착색을 완화하는 시술",
      },
    ],
  },
];

// 카드 배경색 (R G B) — 5번째부터 다시 처음 색으로
const TONES = ["138 117 104", "39 56 67", "168 138 119", "86 124 145"];

/** 목록에서 몇 번째 카드인지에 따라 배경색 정하기 */
export function getTone(index: number) {
  return TONES[index % TONES.length];
}

/** 영문 이름 → 주소에 쓸 이름 ("SHURINK UNIVERSE" → "shurink-universe") */
export function toSlug(en: string) {
  return en.toLowerCase().replace(/\s+/g, "-");
}

/** 주소의 이름으로 시술 찾기 (없으면 null) */
export function findTreatment(slug: string) {
  for (const category of CATEGORIES) {
    const index = category.items.findIndex((item) => toSlug(item.en) === slug);

    if (index !== -1) {
      return {
        treatment: category.items[index],
        category: category.name,
        tone: getTone(index),
      };
    }
  }

  return null;
}

/** 12345 → "₩12,345" */
export function formatPrice(price: number) {
  return `₩${price.toLocaleString("ko-KR")}`;
}

/**
 * 이름 뒤에 알맞은 조사 붙이기
 * 마지막 글자에 받침이 있으면 첫 번째, 없으면 두 번째 조사를 씀
 * 예) withJosa("써마지", "은", "는") → "써마지는"
 */
export function withJosa(word: string, withBatchim: string, without: string) {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  const isHangul = code >= 0 && code <= 11171;
  const hasBatchim = isHangul && code % 28 !== 0;

  return word + (hasBatchim ? withBatchim : without);
}

/** 가격표가 없는 시술에 보여줄 예시 (실제 가격이 아님) */
function sampleOptions(name: string): Omit<TreatmentOption, "id">[] {
  return [
    { name: `${name} 1회 체험`, price: 99000 },
    { name: `${name} 1회`, price: 190000 },
    { name: `${name} 3회 패키지`, price: 490000 },
    { name: `${name} 5회 패키지`, price: 790000 },
    {
      name: `${name} + 진정 관리`,
      price: 160000,
      originalPrice: 220000,
      badge: "첫 방문 혜택",
      note: `${name} 1회 + 진정 관리 1회`,
    },
  ];
}

/** 시술의 가격표 (id를 붙여서 돌려줌) */
export function getOptions(treatment: Treatment): TreatmentOption[] {
  const slug = toSlug(treatment.en);
  const options = treatment.options ?? sampleOptions(treatment.name);

  return options.map((option, index) => ({
    ...option,
    id: `${slug}-${index}`,
  }));
}