import SideBar from "./components/SideBar";
import MainPage from "./components/MainPage";

import "./assets/fontawesome-free/css/all.css";
import "./reset.css";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import SideContent from "./components/SideContent";
import { SortProvider } from "./context/SortProvider";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = localStorage.getItem("currentUser");

    if (!localUser) {
      navigate("/login");
    }
  }, []);

  return (
    <SortProvider>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <SideBar />
        <MainPage />
        <SideContent />
      </div>
    </SortProvider>
  );
}

export default Home;
