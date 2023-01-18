import "../App.css";
import { useEffect, useState } from "react";
import getBooks from "../services/getBooks";
import updateBooks from "../services/updateBooks";
import searchBooks from "../services/searchBooks";
import React, { Component } from "react";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [showSearchPage, setShowSearchpage] = useState(false);

  let [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  let [readBooks, setReadBooks] = useState([]);
  let [wantToReadBooks, setWantToReadBooks] = useState([]);

  let [searchedBooks, setSearchedBooks] = useState([]);

  let [searchInp, setSearchInp] = useState([]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to={"/"}>
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            key={"search-input"}
            type="text"
            value={searchInp}
            placeholder="Search by title, author, or ISBN"
            onChange={(e) => {
              setSearchInp(e.target.value);
              searchBooks(e.target.value.toLowerCase().trim()).then((res) => {
                setSearchedBooks(res);
              });
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBooks.map((book, i) => {
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: book.imageLinks
                          ? `url(${book.imageLinks.thumbnail})`
                          : null,
                      }}
                    ></div>
                    <div className="book-shelf-changer">
                      <select>
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option
                          onClick={() => {
                            updateBooks(book, "currentlyReading");
                          }}
                          value="currentlyReading"
                        >
                          Currently Reading
                        </option>
                        <option
                          onClick={() => {
                            updateBooks(
                              book,
                              "wantToRead",
                              [setCurrentlyReadingBooks, setReadBooks],
                              setWantToReadBooks
                            );
                          }}
                          value="wantToRead"
                        >
                          Want to Read
                        </option>
                        <option
                          onClick={() => {
                            updateBooks(
                              book,
                              "read",
                              [setCurrentlyReadingBooks, setWantToReadBooks],
                              setReadBooks
                            );
                          }}
                          value="read"
                        >
                          Read
                        </option>
                        <option
                          onClick={() => {
                            updateBooks(book, "none", [
                              setCurrentlyReadingBooks,
                              setWantToReadBooks,
                              setReadBooks,
                            ]);
                          }}
                          value="none"
                        >
                          None
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors ? book.authors[0] : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
