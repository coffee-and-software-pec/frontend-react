import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePublicationPage from "./pages/CreatePublicationPage";
import FollowPage from "./pages/FollowPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import PublicationPage from "./pages/PublicationPage";
import SearchPage from "./pages/SearchPage";
import UserPublications from "./pages/UserPublications";

function Router() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/publicacao/:id" element={<PublicationPage />} />
          <Route path="/publicacao" element={<CreatePublicationPage />} />
          <Route path="/minhaspublicacoes" element={<UserPublications />} />
          <Route path="/seguindo" element={<FollowPage />} />
          <Route path="/buscar" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router;