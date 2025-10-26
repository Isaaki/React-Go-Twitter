import { useEffect } from "react";
import SideBar from "./SideBar";
import MainPage from "./MainPage";

import type { User } from "./types";

import "./assets/fontawesome-free/css/all.css";
import "./reset.css";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("http://localhost:8080/api/user/2")
      .then((res) => res.json())
      .then((data: User) => {
        localStorage.setItem("userID", String(data.ID));
        localStorage.setItem("username", data.Username);
        localStorage.setItem("name", data.Name);
        localStorage.setItem("profilePicUrl", data.ProfilePicUrl);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <SideBar />
      <MainPage />
    </>
  );
}

export default App;
