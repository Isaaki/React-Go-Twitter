import { useEffect } from "react";
import SideBar from "./SideBar";
import MainPage from "./MainPage";
import "./assets/fontawesome-free/css/all.css";
import "./reset.css";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("http://localhost:8080/api/user/2")
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("userID", data.ID);
        localStorage.setItem("username", data.Username);
        localStorage.setItem("name", data.Name);
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
