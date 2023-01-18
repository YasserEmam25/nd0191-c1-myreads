import "../App.css";
import { useEffect, useState } from "react";
import getBooks from "../services/getBooks";
import updateBooks from "../services/updateBooks";
import searchBooks from "../services/searchBooks";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "./SearchPage";

const BookItem = ({
  book,
  removeFromShelvesArr,
  setCurrentlyReadingBooks,
  setReadBooks,
  setWantToReadBooks,
}) => {
  //   const [showSearchPage, setShowSearchpage] = useState(false);

  //   let [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  //   let [readBooks, setReadBooks] = useState([]);
  //   let [wantToReadBooks, setWantToReadBooks] = useState([]);

  //   let [searchedBooks, setSearchedBooks] = useState([]);

  //   let [searchInp, setSearchInp] = useState([]);

  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.thumbnail})`,
            }}
          ></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>
                Move to...
              </option>
              <option
                onClick={() => {
                  updateBooks(
                    book,
                    "currentlyReading",
                    removeFromShelvesArr,
                    setCurrentlyReadingBooks
                  );
                }}
                value="read"
              >
                Currently Reading
              </option>
              <option
                onClick={() => {
                  updateBooks(
                    book,
                    "wantToRead",
                    removeFromShelvesArr,
                    setWantToReadBooks
                  );
                }}
                value="wantToRead"
              >
                Want to Read
              </option>
              <option
                onClick={() => {
                  updateBooks(book, "read", removeFromShelvesArr, setReadBooks);
                }}
                value="read"
              >
                Read
              </option>
              <option
                onClick={() => {
                  updateBooks(book, "none", removeFromShelvesArr);
                }}
                value="none"
              >
                None
              </option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors[0]}</div>
      </div>
    </li>
  );
};

export default BookItem;
