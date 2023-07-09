import type dayjs from "dayjs";

const DATE_STRING_FORMAT = "YYYY-MM-DD";

export type DateString =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

export const toDateString = (day: dayjs.Dayjs): DateString => {
  return day.format(DATE_STRING_FORMAT) as DateString;
};

export const formatTime = (timeMs: number): string => {
  const seconds = Math.floor(timeMs / 1000) % 60;
  const minutes = Math.floor(timeMs / 1000 / 60) % 60;
  const hours = Math.floor(timeMs / 1000 / 60 / 60);
  if (hours === 0)
    return [minutes, seconds]
      .map((x) => x.toString().padStart(2, "0"))
      .join(":");
  return [hours, minutes, seconds]
    .map((x) => x.toString().padStart(2, "0"))
    .join(":");
};