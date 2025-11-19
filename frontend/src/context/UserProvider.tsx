import { useState, type ReactNode, useEffect } from "react";
import { UserContext } from "./UserContext";
import type { User } from "../utils/types";
import { useNavigate } from "react-router-dom";

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/user/profile", {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          console.log("No active session found.");
          navigate("/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) {
          setCurrentUser(data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch user profile on initial load:", err);
      });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}
