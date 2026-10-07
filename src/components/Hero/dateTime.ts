export const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** 30분 단위 시간표 만들기 (점심시간 13:00~14:00 제외) */
function makeSlots(startHour: number, endHour: number) {
  const slots: string[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    if (hour === 13) continue;
    const hh = String(hour).padStart(2, "0");
    slots.push(`${hh}:00`, `${hh}:30`);
  }

  return slots;
}

const WEEKDAY_SLOTS = makeSlots(10, 19); // 평일 10:00–19:00
const SATURDAY_SLOTS = makeSlots(10, 15); // 토요일 10:00–15:00

/** 요일에 맞는 예약 가능 시간 */
export function getSlots(date: Date) {
  return date.getDay() === 6 ? SATURDAY_SLOTS : WEEKDAY_SLOTS;
}

/** 오늘 날짜 (시간은 00:00으로 맞춤) */
export function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

/** Date → "14:30" */
export function formatTime(date: Date) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

/** Date → "10월 14일 (수)" */
export function formatDate(date: Date) {
  return `${date.getMonth() + 1}월 ${date.getDate()}일 (${WEEKDAYS[date.getDay()]})`;
}

/** Date → "10월 14일 (수) 14:30" */
export function formatDateTime(date: Date) {
  return `${formatDate(date)} ${formatTime(date)}`;
}