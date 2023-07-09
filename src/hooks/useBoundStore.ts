import { mountStoreDevtool } from 'simple-zustand-devtools';
import type { StateCreator } from "zustand";
import { create } from "zustand";

import type { CourseDataSlice } from "../stores/createCourseDataStore";
import { createCourseDataSlice } from "../stores/createCourseDataStore";
import type { CourseSlice } from "../stores/createCourseStore";
import { createCourseSlice } from "../stores/createCourseStore";
import type { LanguageSlice } from "../stores/createLanguageStore";
import { createLanguageSlice } from "../stores/createLanguageStore";
import type { LevelSlice } from "../stores/createLevelStore";
import { createLevelSlice } from "../stores/createLevelStore";
import type { StreakSlice } from "../stores/createStreakStore";
import { createStreakSlice } from "../stores/createStreakStore";
import type { UserAchievementSlice } from "../stores/createUserAchievementStore";
import { createUserAchievementSlice } from "../stores/createUserAchievementStore";
import type { UserSlice } from "../stores/createUserStore";
import { createUserSlice } from "../stores/createUserStore";

type BoundState = LanguageSlice &
  CourseDataSlice &
  CourseSlice &
  LevelSlice &
  StreakSlice &
  UserSlice &
  UserAchievementSlice;

export type BoundStateCreator<SliceState> = StateCreator<
  BoundState,
  [],
  [],
  SliceState
>;

export const useBoundStore = create<BoundState>((...args) => ({
  ...createLanguageSlice(...args),
  ...createCourseDataSlice(...args),
  ...createCourseSlice(...args),
  ...createLevelSlice(...args),
  ...createStreakSlice(...args),
  ...createUserSlice(...args),
  ...createUserAchievementSlice(...args),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useBoundStore);
}

// window.store = useBoundStore;

// export default useBoundStore;