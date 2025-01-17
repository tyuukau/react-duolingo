import dayjs from "dayjs";
import type { BoundStateCreator } from "../hooks/useBoundStore";
import type { DateString } from "../utils/dateString";
import { toDateString } from "../utils/dateString";
import type { XpByDate } from "./createUserAchievementStore";

type ActiveDays = Set<DateString>;

const addActiveDay = (activeDays: ActiveDays, day: dayjs.Dayjs): ActiveDays => {
  return new Set([...activeDays, toDateString(day)]);
};

const isActiveDay = (activeDays: ActiveDays, day: dayjs.Dayjs): boolean => {
  return activeDays.has(toDateString(day));
};

const getCurrentStreak = (activeDays: ActiveDays): number => {
  let daysBack = 0;
  let day = dayjs();
  while (isActiveDay(activeDays, day)) {
    day = day.add(-1, "day");
    daysBack += 1;
  }
  return daysBack;
};

export type StreakSlice = {
  activeDays: ActiveDays;
  streak: number;
  setActiveDays: (days: XpByDate[]) => void;
  isActiveDay: (day: dayjs.Dayjs) => boolean;
};

export const createStreakSlice: BoundStateCreator<StreakSlice> = (set, get) => ({
  activeDays: new Set(),
  streak: 0,
  setActiveDays: (records: XpByDate[]) => {
    const activeDays = new Set(records.map(entry => entry.date));
    set({ activeDays, streak: getCurrentStreak(activeDays) });
  },

  isActiveDay: (day: dayjs.Dayjs) => isActiveDay(get().activeDays, day),
});
