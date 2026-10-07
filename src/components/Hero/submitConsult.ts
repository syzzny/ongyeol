export type ConsultRequest = {
  treatments: string[];
  dateTime: Date;
  name: string;
  phone: string;
};

/**
 * 상담 신청 보내기
 *
 * 포트폴리오용 사이트라 실제 서버로는 보내지 않고,
 * 서버에 다녀온 것처럼 잠깐 기다렸다가 끝난다.
 * 실제 서비스라면 이 함수 안만 fetch("/api/consult", …)로 바꾸면 된다.
 *
 * 인터넷 연결이 끊겨 있으면 실패한다. (실패 화면을 확인할 때 사용)
 */
export async function submitConsult(request: ConsultRequest): Promise<void> {
  void request; // 지금은 어디에도 보내지 않음

  await new Promise((resolve) => setTimeout(resolve, 1200));

  if (!navigator.onLine) {
    throw new Error("인터넷에 연결되어 있지 않습니다.");
  }
}
