/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import { useEffect, useState } from "react";
import getBooks from "./services/getBooks";
import updateBooks from "./services/updateBooks";
import searchBooks from "./services/searchBooks";

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
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                key={'search-input'}
                type="text"
                value={searchInp}
                placeholder="Search by title, author, or ISBN"
                onChange={(e) => {
                  setSearchInp(e.target.value);
                  searchBooks(e.target.value.toLowerCase().trim()).then(res => {setSearchedBooks(res)});
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
                                  backgroundImage: book.imageLinks? `url(${book.imageLinks.thumbnail})`: null,
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
                                      );
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
                                        [setCurrentlyReadingBooks,
                                        setReadBooks],
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
                                        [setCurrentlyReadingBooks,
                                        setWantToReadBooks],
                                        setReadBooks
                                      );
                                    }}
                                    value="read"
                                  >
                                    Read
                                  </option>
                                  <option
                                    onClick={() => {
                                      updateBooks(
                                        book,
                                        "none",
                                        [setCurrentlyReadingBooks,
                                          setWantToReadBooks,
                                          setReadBooks]
                                      );
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
                              {book.authors?book.authors[0]: null}
                            </div>
                          </div>
                        </li>
                      );
                    })}
            </ol>
          </div>
        </div>
      ) : (
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
                    {currentlyReadingBooks.map((book, i) => {
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
                                        "wantToRead",
                                        [setCurrentlyReadingBooks],
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
                                        [setCurrentlyReadingBooks],
                                        setReadBooks
                                      );
                                    }}
                                    value="read"
                                  >
                                    Read
                                  </option>
                                  <option
                                    onClick={() => {
                                      updateBooks(
                                        book,
                                        "none",
                                        [setCurrentlyReadingBooks]
                                      );
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
                              {book.authors[0]}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {wantToReadBooks.map((book, i) => {
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
                                        [setWantToReadBooks],
                                        setCurrentlyReadingBooks
                                      );
                                    }}
                                    value="currentlyReading"
                                  >
                                    Currently Reading
                                  </option>
                                  <option
                                    onClick={() => {
                                      updateBooks(
                                        book,
                                        "read",
                                        [setWantToReadBooks],
                                        setReadBooks
                                      );
                                    }}
                                    value="read"
                                  >
                                    Read
                                  </option>
                                  <option
                                    onClick={() => {
                                      updateBooks(
                                        book,
                                        "none",
                                        [setWantToReadBooks]
                                      );
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
                              {book.authors[0]}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {readBooks.map((book, i) => {
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
                                        [setReadBooks],
                                        setCurrentlyReadingBooks
                                      );
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
                                        [setReadBooks],
                                        setWantToReadBooks
                                      );
                                    }}
                                    value="wantToRead"
                                  >
                                    Want to Read
                                  </option>
                                  <option
                                    onClick={() => {
                                      updateBooks(book, "none", [setReadBooks]);
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
                              {book.authors[0]}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
