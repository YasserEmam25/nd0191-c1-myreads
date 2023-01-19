import "../App.css";
import updateBooks from "../services/updateBooks";
import React from "react";

const BookItem = ({
  book,
  removeFromShelvesArr,
  setCurrentlyReadingBooks,
  setReadBooks,
  setWantToReadBooks,
  shelfName,
}) => {
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
            <select
              defaultValue={shelfName}
              onClick={(e) => {
                let value = e.target.value;
                let toShelf;
                if (value === "read") toShelf = setReadBooks;
                else if (value === "wantToRead") toShelf = setWantToReadBooks;
                else if (value === "currentlyReading")
                  toShelf = setCurrentlyReadingBooks;

                updateBooks(book, value, removeFromShelvesArr, toShelf);
              }}
            >
              <option value="_" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors ? book.authors.map((author) => author) : null}
        </div>
      </div>
    </li>
  );
};

export default BookItem;
