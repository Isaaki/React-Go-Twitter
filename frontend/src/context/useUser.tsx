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
    fetch("http://localhost:8080/user/profile", {
      method: "get",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          console.log("401 if statment");
          navigate("/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        localStorage.clear();
        localStorage.setItem("CurrentUser", JSON.stringify(data));
        setCurrentUser(data);
      })
      .catch(() => {
        console.log("catch");
        navigate("/login");
      });
  }, []);

  return { currentUser, setCurrentUser };
}
