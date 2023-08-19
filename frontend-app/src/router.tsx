import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import CreatePublicationPage from "./pages/CreatePublicationPage";
import FollowPage from "./pages/FollowPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import PublicationPage from "./pages/PublicationPage";
import SearchPage from "./pages/SearchPage";
import UserPublications from "./pages/UserPublications";
import PerfilPage from "./pages/PerfilPage";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { authenticatedApi } from "./api/api";
import { useAuth } from "./contexts/AuthContext";
import { checkAuthToken, TOKEN_KEY } from "./utils/TokenUtil";

function Router() {

  const { logout } = useAuth();

  useEffect(() => {
    const instance = authenticatedApi;
    instance.interceptors.response.use((res: AxiosResponse<any, any>) => {
      return res;
    }, (error: any) => {
      const token = checkAuthToken();
      if (token === "invalid") {
          logout();
          window.location.href = "/";
      }
      return Promise.reject(error);
    });
    instance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
      config.headers.set("Authorization", `Bearer ${localStorage.getItem(TOKEN_KEY)}`);
      return config;
    });

  }, []);

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
          <Route path="/perfil" element={<PerfilPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Router;