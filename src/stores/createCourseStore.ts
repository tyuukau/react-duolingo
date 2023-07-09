import type { BoundStateCreator } from "../hooks/useBoundStore";

import type { Chapter } from "./createCourseDataStore";

export type Course = {
  courseName: string;
  date_created: string;
  description: string;
  headerImage: string;
  id: number;
  language_code: string;
};

export type CourseSlice = {
  currentCourse: Course;
  learningCourses: Course[];
  setCurrentCourse: (course: Course) => void;
  setCourses: (courses: Course[]) => void;

  currentCourseContent: Chapter[];
  setCurrentCourseContent: (chapters: Chapter[]) => void;
};

export const createCourseSlice: BoundStateCreator<CourseSlice> = (set) => ({
  currentCourse: null as Course,
  learningCourses: [],
  setCurrentCourse: (course: Course) => set(() => ({ currentCourse: course })),
  setCourses: (courses: Course[]) => set(() => ({ learningCourses: courses })),

  currentCourseContent: [],
  setCurrentCourseContent: (chapters: Chapter[]) => set(() => ({ currentCourseContent: chapters })),
});
