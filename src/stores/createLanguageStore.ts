import languages, { type Language } from "../utils/languages";
import type { BoundStateCreator } from "../hooks/useBoundStore";

export type LanguageSlice = {
  language: Language;
  learningLanguages: Language[];
  addLanguage: (newLanguage: Language) => void;
  setLanguage: (language: Language) => void;
};

const spanishLanguageIndex = 6;

export const createLanguageSlice: BoundStateCreator<LanguageSlice> = (set) => ({
  language: languages[spanishLanguageIndex],
  learningLanguages: [],
  addLanguage: (newLanguage: Language) =>
  set((state) => {
    if (!state.learningLanguages.includes(newLanguage)) {
      return {
        language: newLanguage,
        learningLanguages: [newLanguage, ...state.learningLanguages],
      };
    }
    return state;
  }),
  setLanguage: (language: Language) => set(() => ({ language: language })),
});
