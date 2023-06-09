import { units } from "../utils/units";
import type { BoundStateCreator } from "../hooks/useBoundStore";
import { Language } from "~/utils/languages";

type CourseData = {
  lessonsCompleted: number;
}

export type CourseDataSlice = {
  language: Language;
  lessonsCompleted: number;
  coursesData: Record<Language, CourseData>;
  increaseLessonsCompleted: (by?: number) => void;
  jumpToUnit: (unitNumber: number) => void;
};

export const CourseDataSlice: BoundStateCreator<CourseDataSlice> = (set) => ({
  lessonsCompleted: 0,
  increaseLessonsCompleted: (by = 1) =>
    set(({ lessonsCompleted }) => ({
      lessonsCompleted: lessonsCompleted + by,
    })),
  jumpToUnit: (unitNumber: number) =>
    set(({ lessonsCompleted }) => {
      const lessonsPerTile = 4;
      const totalLessonsToJumpToUnit = units
        .filter((unit) => unit.unitNumber < unitNumber)
        .map((unit) => unit.tiles.length * lessonsPerTile)
        .reduce((a, b) => a + b, 0);
      return {
        lessonsCompleted: Math.max(lessonsCompleted, totalLessonsToJumpToUnit),
      };
    }),
});
