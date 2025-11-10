import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./Home.tsx";
import UserPage from "./components/UserPage.tsx";
import Login from "./components/Login.tsx";
import { UserProvider } from "./context/UserProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="user/:username" element={<UserPage />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
