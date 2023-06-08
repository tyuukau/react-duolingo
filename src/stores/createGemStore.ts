import type { BoundStateCreator } from "../hooks/useBoundStore";

export type GemSlice = {
  gems: number;
  increaseGems: (by: number) => void;
};

export const createGemSlice: BoundStateCreator<GemSlice> = (set) => ({
  gems: 0,
  increaseGems: (by: number) =>
    set(({ gems }) => ({ gems: gems + by })),
});
