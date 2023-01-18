import { update } from "../BooksAPI";

const updateBooks = (book, shelf, removeFromShelvesArr, toShelf) => {
    update(book, shelf);
    
    if (removeFromShelvesArr) {
        removeFromShelvesArr.forEach(setter => {
            setter(oldArr => oldArr.filter(itr => itr.id !== book.id));
        });
    }

    if (toShelf) {toShelf(oldArr => [...oldArr, book]);}
}

export default updateBooks;