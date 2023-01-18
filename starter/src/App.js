/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import { useEffect, useState } from "react";
import getBooks from "./services/getBooks";
import updateBooks from "./services/updateBooks";
import searchBooks from "./services/searchBooks";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import SearchPage from "./components/SearchPage";
import MainPage from "./components/MainPage";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);

  let [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  let [readBooks, setReadBooks] = useState([]);
  let [wantToReadBooks, setWantToReadBooks] = useState([]);

  let [searchedBooks, setSearchedBooks] = useState([]);

  let [searchInp, setSearchInp] = useState([]);

  useEffect(() => {
    getBooks(setCurrentlyReadingBooks, setReadBooks, setWantToReadBooks);
  }, []);

  return (
    // <div className="app">{showSearchPage ? <SearchPage /> : <MainPage />}</div>
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
