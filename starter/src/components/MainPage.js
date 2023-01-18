import "../App.css";
import { useEffect, useState } from "react";
import getBooks from "../services/getBooks";
import updateBooks from "../services/updateBooks";
import searchBooks from "../services/searchBooks";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SearchPage from "./SearchPage";
import BookItem from "./BooksItem";

const MainPage = () => {
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
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {currentlyReadingBooks.map((book, i) => (
                  <BookItem
                    book={book}
                    removeFromShelvesArr={[setCurrentlyReadingBooks]}
                    setCurrentlyReadingBooks={setCurrentlyReadingBooks}
                    setReadBooks={setReadBooks}
                    setWantToReadBooks={setWantToReadBooks}
                  />
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {wantToReadBooks.map((book, i) => (
                  <BookItem
                    book={book}
                    removeFromShelvesArr={[setWantToReadBooks]}
                    setCurrentlyReadingBooks={setCurrentlyReadingBooks}
                    setReadBooks={setReadBooks}
                    setWantToReadBooks={setWantToReadBooks}
                  />
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {readBooks.map((book, i) => (
                  <BookItem
                    book={book}
                    removeFromShelvesArr={[setReadBooks]}
                    setCurrentlyReadingBooks={setCurrentlyReadingBooks}
                    setReadBooks={setReadBooks}
                    setWantToReadBooks={setWantToReadBooks}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
      </div>
    </div>
  );
};

export default MainPage;
