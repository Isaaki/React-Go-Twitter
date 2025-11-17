import { createContext } from "react";
import type { SortModeType } from "../utils/types";

interface SortContextType {
  sortMode: SortModeType;
  setSortMode: (sortMode: SortModeType) => void;
}

export const SortContext = createContext<SortContextType | undefined>(
  undefined,
);
