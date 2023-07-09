import dayjs from "dayjs";
import type { BoundStateCreator } from "../hooks/useBoundStore";
import type { DateString } from "../utils/dateString";
import { toDateString } from "../utils/dateString";
import { range, sum } from "../utils/array-utils";

export type XpByDate = {
  date: DateString;
  xp: number;
};

const addXpToday = (xpByDate: XpByDate, xp: number): XpByDate => {
  return addXp(xpByDate, xp, dayjs());
};

const addXp = (xpByDate: XpByDate, xp: number, date: dayjs.Dayjs): XpByDate => {
  return {
    ...xpByDate,
    [toDateString(date)]: xpAt(xpByDate, date) + xp,
  };
};

const xpAt = (xpByDate: XpByDate[], date: dayjs.Dayjs): number => {
  const dateString = toDateString(date); // Convert the provided date to a string using the toDateString function
  const xpEntry = xpByDate.find(entry => entry.date === dateString); // Find the XP entry with the matching date

  if (xpEntry) {
    return xpEntry.xp; // Return the XP value if the entry exists
  }

  return 0; // Return 0 if no XP entry is found for the given date
};

export type UserAchievementSlice = {
  userHistory: XpByDate[];
  xpAllTime: number;

  gems: number;
  globalLessonsCompleted: number;
  
  setUserHistory: (data: XpByDate[]) => void;
  setXpAllTime: (xp: number) => void;

  setGems: (gem: number) => void;
  setGlobalLessonsCompleted: (globalLessonsCompleted: number) => void;

  increaseXp: (by: number) => void;
  xpToday: () => number;
  xpThisWeek: () => number;
};

export const createUserAchievementSlice: BoundStateCreator<UserAchievementSlice> = (set, get) => ({
  userHistory: [],
  xpAllTime: 0,

  gems: 0,
  globalLessonsCompleted: 0,

  setUserHistory: (data: XpByDate[]) => set(() => ({ userHistory: data })),
  setXpAllTime: (xpAllTime: number) => set(() => ({ xpAllTime: xpAllTime })),

  setGems: (gems: number) => set(() => ({ gems: gems })),
  setGlobalLessonsCompleted: (globalLessonsCompleted: number) => set(() => ({ globalLessonsCompleted: globalLessonsCompleted})),

  increaseXp: (by: number) => set({ userHistory: addXpToday(get().userHistory, by) }),

  xpToday: () => xpAt(get().userHistory, dayjs()),

  xpThisWeek: () => {
    return sum(
      range(0, dayjs().day() + 1).map((daysBack) =>
        xpAt(get().userHistory, dayjs().add(-daysBack))
      )
    );
  },
});
