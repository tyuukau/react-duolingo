import type { StateCreator } from "zustand";
import { create } from "zustand";
import zukeeper from "zukeeper";
import { mountStoreDevtool } from 'simple-zustand-devtools';

import type { LanguageSlice } from "../stores/createLanguageStore";
import { createLanguageSlice } from "../stores/createLanguageStore";
import type { LessonSlice } from "../stores/createLessonStore";
import { createLessonSlice } from "../stores/createLessonStore";
import type { StreakSlice } from "../stores/createStreakStore";
import { createStreakSlice } from "../stores/createStreakStore";
import type { UserSlice } from "../stores/createUserStore";
import { createUserSlice } from "../stores/createUserStore";
import type { XpSlice } from "../stores/createXpStore";
import { createXpSlice } from "../stores/createXpStore";

type BoundState = LanguageSlice &
  LessonSlice &
  StreakSlice &
  UserSlice &
  XpSlice;

export type BoundStateCreator<SliceState> = StateCreator<
  BoundState,
  [],
  [],
  SliceState
>;

export const useBoundStore = create<BoundState>((...args) => ({
  ...createLanguageSlice(...args),
  ...createLessonSlice(...args),
  ...createStreakSlice(...args),
  ...createUserSlice(...args),
  ...createXpSlice(...args),
}));

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Store', useBoundStore);
}

// window.store = useBoundStore;

// export default useBoundStore;