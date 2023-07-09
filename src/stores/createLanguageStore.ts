import type { BoundStateCreator } from "../hooks/useBoundStore";

export type Language = {
  name: string;
  nativeName: string;
  code: string;
}

export type LanguageSlice = {
  currentLanguage: Language;
  learningLanguages: Language[];
  setCurrentLanguage: (language: Language) => void;
  setLanguages: (languages: Language[]) => void;
};

export const createLanguageSlice: BoundStateCreator<LanguageSlice> = (set) => ({
  currentLanguage: null as Language,
  learningLanguages: [],
  setCurrentLanguage: (language: Language) => set(() => ({ currentLanguage: language })),
  setLanguages: (languages: Language[]) => set(() => ({ learningLanguages: languages })),
});
