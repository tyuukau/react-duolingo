import languages, { type Language } from "../utils/languages";
import type { BoundStateCreator } from "../hooks/useBoundStore";

export type LanguageSlice = {
  currentLanguage: Language;
  learningLanguages: Language[];
  addLanguage: (newLanguage: Language) => void;
  setCurrentLanguage: (language: Language) => void;
};

const spanishLanguageIndex = 6;

export const createLanguageSlice: BoundStateCreator<LanguageSlice> = (set) => ({
  currentLanguage: languages[spanishLanguageIndex],
  learningLanguages: [],
  addLanguage: (newLanguage: Language) =>
  set((state) => {
    if (!state.learningLanguages.includes(newLanguage)) {
      return {
        currentLanguage: newLanguage,
        learningLanguages: [newLanguage, ...state.learningLanguages],
      };
    }
    return state;
  }),
  setCurrentLanguage: (language: Language) => set(() => ({ currentLanguage: language })),
});
