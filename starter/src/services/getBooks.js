import { getAll } from "../BooksAPI"

const getBooks = (setCurrentlyReadingBooks, setReadBooks, setWantToReadBooks) => {
    getAll().then(books => {
        books.map(book => {
          if (book.shelf === "currentlyReading") {
            setCurrentlyReadingBooks(currentlyReadingBooks => [...currentlyReadingBooks, book]);
          }else if (book.shelf === "read") {
            setReadBooks(readBooks => [...readBooks, book]);
          } else {
            setWantToReadBooks(wantToReadBooks => [...wantToReadBooks, book]);
          }
        });
      })
}

export default getBooks;