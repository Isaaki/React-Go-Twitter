import SideBar from "./components/SideBar";
import MainPage from "./components/MainPage";

import "./assets/fontawesome-free/css/all.css";
import "./reset.css";
import "./Home.css";
import SideContent from "./components/SideContent";
import { SortProvider } from "./context/SortProvider";

function Home() {
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
