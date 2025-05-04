import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ModuleLayout from "./components/ModuleLayout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/rum-polimod">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schon" element={<ModuleLayout />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
