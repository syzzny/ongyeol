"use client";

import { useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import modal from "@/components/Modal/Modal.module.scss";
import {
  WEEKDAYS,
  formatDate,
  formatTime,
  getSlots,
  startOfToday,
} from "./dateTime";
import styles from "./DateTimePicker.module.scss";

const MAX_MONTHS_AHEAD = 2; // 오늘 기준 몇 달 뒤까지 예약 가능한지

type DateTimePickerProps = {
  value: Date | null;
  onConfirm: (value: Date) => void;
  onCancel: () => void;
};

export default function DateTimePicker({
  value,
  onConfirm,
  onCancel,
}: DateTimePickerProps) {
  const [today] = useState(startOfToday);

  // 달력에 보여줄 달 (그 달의 1일)
  const [viewDate, setViewDate] = useState(() => {
    const base = value ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  // 고른 날짜와 시간
  const [selectedDay, setSelectedDay] = useState<Date | null>(() =>
    value
      ? new Date(value.getFullYear(), value.getMonth(), value.getDate())
      : null,
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(() =>
    value ? formatTime(value) : null,
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay(); // 1일의 요일
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 그 달의 일수

  // 이번 달에서 몇 달 떨어져 있는지 → 이전/다음 버튼 활성 여부
  const monthOffset =
    (year - today.getFullYear()) * 12 + (month - today.getMonth());
  const canGoPrev = monthOffset > 0;
  const canGoNext = monthOffset < MAX_MONTHS_AHEAD;

  const moveMonth = (diff: number) => {
    setViewDate(new Date(year, month + diff, 1));
  };

  const selectDay = (day: Date) => {
    setSelectedDay(day);

    // 토요일처럼 시간표가 다른 날로 바꾸면, 없는 시간은 선택 해제
    if (selectedTime && !getSlots(day).includes(selectedTime)) {
      setSelectedTime(null);
    }
  };

  const handleConfirm = () => {
    if (!selectedDay || !selectedTime) return;

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const result = new Date(selectedDay);
    result.setHours(hours, minutes);
    onConfirm(result);
  };

  const slots = selectedDay ? getSlots(selectedDay) : [];
  const slotGroups = [
    { label: "오전", times: slots.filter((time) => time < "13:00") },
    { label: "오후", times: slots.filter((time) => time >= "13:00") },
  ];

  return (
    <>
      <div className={modal.body}>
        <div className={styles.picker}>
          {/* ---------- 달력 ---------- */}
          <div>
            <div className={styles.monthNav}>
              <button
                type="button"
                className={styles.navButton}
                aria-label="이전 달"
                disabled={!canGoPrev}
                onClick={() => moveMonth(-1)}
              >
                <CaretLeftIcon size={18} />
              </button>
              <p className={styles.monthLabel} aria-live="polite">
                {year}년 {month + 1}월
              </p>
              <button
                type="button"
                className={styles.navButton}
                aria-label="다음 달"
                disabled={!canGoNext}
                onClick={() => moveMonth(1)}
              >
                <CaretRightIcon size={18} />
              </button>
            </div>

            <div className={styles.weekdays} aria-hidden="true">
              {WEEKDAYS.map((weekday) => (
                <span key={weekday}>{weekday}</span>
              ))}
            </div>

            <div className={styles.days}>
              {/* 1일 앞의 빈칸 */}
              {Array.from({ length: firstWeekday }, (_, index) => (
                <span key={`blank-${index}`} />
              ))}

              {Array.from({ length: daysInMonth }, (_, index) => {
                const day = new Date(year, month, index + 1);
                const isToday = day.getTime() === today.getTime();
                const isSelected = day.getTime() === selectedDay?.getTime();
                // 오늘까지와 일요일은 선택 불가
                const isDisabled = day <= today || day.getDay() === 0;

                return (
                  <button
                    key={index}
                    type="button"
                    className={[
                      styles.day,
                      isToday ? styles.today : "",
                      isSelected ? styles.selected : "",
                    ].join(" ")}
                    disabled={isDisabled}
                    aria-pressed={isSelected}
                    aria-label={`${month + 1}월 ${index + 1}일 ${WEEKDAYS[day.getDay()]}요일`}
                    onClick={() => selectDay(day)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <p className={styles.note}>
              당일 예약과 일요일·공휴일 진료는 전화로 문의해 주세요.
            </p>
          </div>

          {/* ---------- 시간 ---------- */}
          <div className={styles.times}>
            <p className={styles.timesTitle}>
              {selectedDay ? formatDate(selectedDay) : "시간 선택"}
            </p>

            {selectedDay ? (
              slotGroups.map((group) => (
                <div key={group.label}>
                  <p className={styles.groupLabel}>{group.label}</p>
                  <div className={styles.slots}>
                    {group.times.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`${styles.slot} ${time === selectedTime ? styles.selected : ""}`}
                        aria-pressed={time === selectedTime}
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.empty}>날짜를 먼저 선택해 주세요.</p>
            )}
          </div>
        </div>
      </div>

      <div className={modal.footer}>
        <button type="button" className={modal.secondary} onClick={onCancel}>
          취소
        </button>
        <button
          type="button"
          className={modal.primary}
          disabled={!selectedDay || !selectedTime}
          onClick={handleConfirm}
        >
          선택 완료
        </button>
      </div>
    </>
  );
}