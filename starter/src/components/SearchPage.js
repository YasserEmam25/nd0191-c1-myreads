import "../App.css";
import { useState } from "react";
import searchBooks from "../services/searchBooks";
import React from "react";
import { Link } from "react-router-dom";
import BookItem from "./BooksItem";

const SearchPage = () => {
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
          {searchedBooks.map((book, i) => (
            <BookItem book={book} />
          ))}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
