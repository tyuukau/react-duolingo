import type { BoundStateCreator } from "../hooks/useBoundStore";
import type { Course } from "./createCourseStore";

import { immer } from "zustand/middleware/immer";

export type Level = {
  lessonNumber: number;
  chapter: number;
  lessonType:
    | "star"
    | "dumbbell"
    | "book"
    | "trophy"
    | "treasure";
  description: string;
  id: number;
};

export type LevelType = Level["lessonType"];

export type Chapter = {
  id: number;
  course: number;
  chapterNumber: number;
  description: string;
  backgroundColor: `bg-${string}`;
  textColor: `text-${string}`;
  borderColor: `border-${string}`;
  date_created: string;
  levels: Level[];
};

export type CourseData = {
  courseID: number;
  lessonsCompleted: number;
};

export type CourseDataSlice = {
  courseDatas: CourseData[];
  setCourseDatas: (courseDatas: CourseData[]) => void;
};

export const createCourseDataSlice: BoundStateCreator<CourseDataSlice> = (set) => ({
  courseDatas: {},

  setCourseDatas: (courseDatas: CourseData[]) =>
    set(() => ({ courseDatas: courseDatas })),
});
