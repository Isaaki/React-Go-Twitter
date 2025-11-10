import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import type { User } from "../utils/types";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export function useCurrentUser() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const cacheUser = localStorage.getItem("currentUser");

    if (cacheUser) {
      console.log("User in localstorage");
      setCurrentUser(JSON.parse(cacheUser));
    } else {
      console.log("User not in localstorage");
      navigate("/login");
    }
  }, []);

  return { currentUser, setCurrentUser };
}
