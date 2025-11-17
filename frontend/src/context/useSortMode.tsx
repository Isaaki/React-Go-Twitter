import { useContext } from "react";
import { SortContext } from "./SortContext";

export const useSortMode = () => {
  const context = useContext(SortContext);
  if (!context) {
    throw new Error("useSortMode must be used within a SortProvider");
  }
  return context;
};
