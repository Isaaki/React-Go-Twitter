import SideBar from "./components/SideBar";
import MainPage from "./components/MainPage";

import "./assets/fontawesome-free/css/all.css";
import "./reset.css";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("currentUser");

    if (!localUser) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <SideBar />
      <MainPage />
    </>
  );
}

export default Home;
