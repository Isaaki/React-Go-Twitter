import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import MainPage from "./components/MainPage";

import { useUser } from "./context/useUser";

import type { User } from "./utils/types";

import "./assets/fontawesome-free/css/all.css";
import "./reset.css";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const { setCurrentUser } = useUser();

  useEffect(() => {
    fetch(`http://localhost:8080/api/user/2`)
      .then((res) => res.json())
      .then((data: User) => {
        const newData: User = {
          ...data,
          ID: data.ID,
          Username: data.Username,
          Name: data.Name,
          ProfilePicUrl: data.ProfilePicUrl,
        };
        setCurrentUser(newData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    console.log("Waiting on user load");
    return <div>Loading user</div>;
  }

  return (
    <>
      <SideBar />
      <MainPage />
    </>
  );
}

export default App;
