import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import PublicationPage from "./pages/PublicationPage";

function Router() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/publication/:id" element={<PublicationPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router;