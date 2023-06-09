import { units } from "../utils/units";
import type { BoundStateCreator } from "../hooks/useBoundStore";
import { Language } from "~/utils/languages";

import { immer } from "zustand/middleware/immer";

type CourseData = {
  lessonsCompleted: number;
};

export type CourseDataSlice = {
  globalLessonsCompleted: number;
  coursesData: Record<string, CourseData>;
  increaseLessonsCompleted: (Language, by?: number) => void;
  jumpToUnit: (Language, unitNumber: number) => void;
  initialiseCourseDataRecord: (languageCode: string) => void;
};

export const CourseDataSlice: BoundStateCreator<CourseDataSlice> = (set) => ({
  globalLessonsCompleted: 0,
  coursesData: {},

  increaseLessonsCompleted: (language: Language, by = 1) =>
    set((state) => {
      const lessonsCompleted = state.coursesData[language.code]?.lessonsCompleted || 0;
      return {
        ...state,
        globalLessonsCompleted: state.globalLessonsCompleted + by,
        coursesData: {
          ...state.coursesData,
          [language.code]: { lessonsCompleted: lessonsCompleted + by },
        },
      };
    }),    

  jumpToUnit: (language: Language, unitNumber: number) =>
    set((state) => {
      const lessonsPerTile = 4;
      const totalLessonsToJumpToUnit = units
        .filter((unit) => unit.unitNumber < unitNumber)
        .map((unit) => unit.tiles.length * lessonsPerTile)
        .reduce((a, b) => a + b, 0);
      const lessonsCompleted = state.coursesData[language.code]?.lessonsCompleted || 0;
      return {
        ...state,
        coursesData: {
          ...state.coursesData,
          [language.code]: { lessonsCompleted: Math.max(lessonsCompleted, totalLessonsToJumpToUnit) },
        },
      };
    }),

  initialiseCourseDataRecord: (language: Language) =>
    set((state) => {
      if (!state.coursesData[language.code]) {
        return {
          ...state,
          coursesData: {
            ...state.coursesData,
            [language.code]: { lessonsCompleted: 0 },
          },
        };
      }
      return state;
    }),
});
