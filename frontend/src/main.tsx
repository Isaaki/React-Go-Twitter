import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserProvider } from "./context/UserProvider.tsx";

import Home from "./Home.tsx";
import UserPage from "./components/UserPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="user/:username" element={<UserPage />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
);
