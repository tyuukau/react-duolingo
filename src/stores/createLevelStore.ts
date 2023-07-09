import type { BoundStateCreator } from "../hooks/useBoundStore";

import type { Chapter, Level } from "./createCourseDataStore";

export type LevelProblem = {
    id: number,
    contentType: string,
    question: string,
    prompt: string,
    levelImage: string,
    levelSound: string,
    correctAnswer: string,
    hint: string,
    point: number,
  }

export type LevelSlice = {
  currentLevel: Level;
  setCurrentLevel: (level: Level) => void;

  currentLevelContent: LevelProblem[];
  setCurrentLevelContent: (levelProblems: LevelProblem[]) => void;
};

export const createLevelSlice: BoundStateCreator<LevelSlice> = (set) => ({
  currentLevel: null as Level,
  setCurrentLevel: (level: Level) => set(() => ({ currentLevel: level })),

  currentLevelContent: [],
  setCurrentLevelContent: (levelProblems: LevelProblem[]) => set(() => ({ currentLevelContent: levelProblems })),
});
