import languages, { type Language } from "../utils/languages";
import type { BoundStateCreator } from "../hooks/useBoundStore";

export type LanguageSlice = {
  language: Language;
  learningLanguages: Language[];
  numberOfLanguages: number;
  setLanguage: (newLanguage: Language) => void;
};

const spanishLanguageIndex = 6;

export const createLanguageSlice: BoundStateCreator<LanguageSlice> = (set) => ({
  language: languages[spanishLanguageIndex],
  learningLanguages: [],
  numberOfLanguages: 0,
  setLanguage: (newLanguage: Language) =>
    set(state => ({
      language: newLanguage,
      numberOfLanguages: state.numberOfLanguages + 1,
      learningLanguages: [newLanguage, ...state.learningLanguages],
    })),
});
