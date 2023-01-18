/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import MainPage from "./components/MainPage";

function App() {
  return (
    <div className="app">
      {
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      }
    </div>
  );
}

export default App;
