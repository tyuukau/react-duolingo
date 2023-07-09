import dayjs from "dayjs";
import type { BoundStateCreator } from "../hooks/useBoundStore";

export type UserSlice = {
  // General
  name: string;
  email: string;
  age: number;
  token: string;
  id: string;

  joinedAt: dayjs.Dayjs;
  loggedIn: boolean;

  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setAge: (age: number) => void;
  setUser: (name: string, email: string, age: number, token?: string, id?: number) => void;
  setUserInfo: (name: string, email: string, age: number) => void;

  logIn: () => void;
  logOut: () => void;

  // Goal XP
  goalXp: number;
  setGoalXp: (newGoalXp: number) => void;

  // Sound settings
  soundEffects: boolean;
  // speakingExercises: boolean;
  listeningExercises: boolean;

  setSoundEffects: (isOn: boolean) => void;
  // setSpeakingExercises: (isOn: boolean) => void;
  setListeningExercises: (isOn: boolean) => void;

  setUserPref: (
    goalXp: number,
    soundEffects: boolean,
    listeningExercises: boolean
  ) => void;

  // Gems
  gems: number;
  increaseGems: (by: number) => void;
};

export const createUserSlice: BoundStateCreator<UserSlice> = (set) => ({
  name: "",
  email: "",
  age: 0,
  id: 0,
  token: "",

  joinedAt: dayjs(),
  loggedIn: false,

  setName: (name: string) => set(() => ({ name })),
  setEmail: (email: string) => set(() => ({ email: email })),
  setAge: (age: number) => set(() => ({ age: age })),

  setUser: (name: string, email: string, age: number, token?: string, id?: number) =>
    set(() => ({ name: name, email: email, age: age, token: token, id: id })),
  setUserInfo: (name: string, email: string, age: number) =>
    set(() => ({ name: name, email: email, age: age })),

  logIn: () => set(() => ({ loggedIn: true })),
  logOut: () => set(() => ({ loggedIn: false })),

  goalXp: 10,
  setGoalXp: (newGoalXp: number) => set({ goalXp: newGoalXp }),

  soundEffects: true,
  // speakingExercises: true,
  listeningExercises: true,

  setSoundEffects: (isOn: boolean) => set(() => ({ soundEffects: isOn })),
  // setSpeakingExercises: (isOn: boolean) =>
  //   set(() => ({ speakingExercises: isOn })),
  setListeningExercises: (isOn: boolean) =>
    set(() => ({ listeningExercises: isOn })),

  setUserPref: (
    newGoalXp: number,
    isSoundEffectsOn: boolean,
    isListeningExcersisesOn: boolean
  ) =>
    set(() => ({
      goalXp: newGoalXp,
      soundEffects: isSoundEffectsOn,
      listeningExercises: isListeningExcersisesOn,
    })),

  gems: 0,
  increaseGems: (by: number) => set(({ gems }) => ({ gems: gems + by })),
});
