import "../App.css";
import { useEffect, useState } from "react";
import getBooks from "../services/getBooks";
import React from "react";
import { Link } from "react-router-dom";
import BookItem from "./BooksItem";

const MainPage = () => {
  let [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  let [readBooks, setReadBooks] = useState([]);
  let [wantToReadBooks, setWantToReadBooks] = useState([]);

  useEffect(() => {
    getBooks(setCurrentlyReadingBooks, setReadBooks, setWantToReadBooks);
    return [];
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
                    shelfName={"currentlyReading"}
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
                    shelfName={"wantToRead"}
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
                    shelfName={"read"}
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to={"/search"}>Add a book</Link>
      </div>
    </div>
  );
};

export default MainPage;
