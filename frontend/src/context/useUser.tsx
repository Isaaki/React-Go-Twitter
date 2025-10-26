import { useContext } from "react";
import { UserContext } from "./UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export function useRequiredUser() {
  const { currentUser, setCurrentUser } = useUser();
  if (!currentUser)
    throw new Error("useRequiredUser called when no user is set");
  return { currentUser, setCurrentUser };
}
