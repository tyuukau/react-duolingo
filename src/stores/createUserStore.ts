import dayjs from "dayjs";
import type { BoundStateCreator } from "../hooks/useBoundStore";

// Required features:
// User:
// - Login, logout
// - Register
// - View Profile
// - Update Profile

export type GoalXp = 1 | 10 | 20 | 30 | 50;

export type UserSlice = {
  // General
  name: string;
  username: string;
  joinedAt: dayjs.Dayjs;
  loggedIn: boolean;

  setName: (name: string) => void;
  setUsername: (username: string) => void;
  logIn: () => void;
  logOut: () => void;

  // Goal XP
  goalXp: GoalXp;
  setGoalXp: (newGoalXp: GoalXp) => void;

  // Sound settings
  soundEffects: boolean;
  // speakingExercises: boolean;
  listeningExercises: boolean;

  setSoundEffects: (isOn: boolean) => void;
  // setSpeakingExercises: (isOn: boolean) => void;
  setListeningExercises: (isOn: boolean) => void;

  // Gems
  gems: number;
  increaseGems: (by: number) => void;
};

export const createUserSlice: BoundStateCreator<UserSlice> = (set) => ({
  name: "",
  username: "",
  joinedAt: dayjs(),
  loggedIn: false,

  setName: (name: string) => set(() => ({ name })),
  setUsername: (username: string) => set(() => ({ username })),
  logIn: () => set(() => ({ loggedIn: true })),
  logOut: () => set(() => ({ loggedIn: false })),

  goalXp: 10,
  setGoalXp: (newGoalXp: GoalXp) => set({ goalXp: newGoalXp }),

  soundEffects: true,
  // speakingExercises: true,
  listeningExercises: true,

  setSoundEffects: (isOn: boolean) => set(() => ({ soundEffects: isOn })),
  // setSpeakingExercises: (isOn: boolean) =>
  //   set(() => ({ speakingExercises: isOn })),
  setListeningExercises: (isOn: boolean) =>
    set(() => ({ listeningExercises: isOn })),

  gems: 0,
  increaseGems: (by: number) => set(({ gems }) => ({ gems: gems + by })),
});
