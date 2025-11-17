import { useState, type ReactNode } from "react";
import type { SortModeType } from "../utils/types";
import { SortMode } from "../utils/sortmode";
import { SortContext } from "./SortContext";

export function SortProvider({ children }: { children: ReactNode }) {
  const [sortMode, setSortMode] = useState<SortModeType>(SortMode.DEC);

  return (
    <SortContext.Provider value={{ sortMode, setSortMode }}>
      {children}
    </SortContext.Provider>
  );
}
