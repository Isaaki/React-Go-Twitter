import { createContext } from "react";
import type { User } from "../utils/types";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (currentUser: User | null) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
