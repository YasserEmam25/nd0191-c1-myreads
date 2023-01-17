import { update } from "../BooksAPI";

const updateBooks = (book, shelf, firstSetter, secondSetter) => {
    update(book, shelf);
    
    firstSetter(oldArr => oldArr.filter(itr => itr.id !== book.id));

    if (secondSetter) {secondSetter(oldArr => [...oldArr, book]);}
}

export default updateBooks;