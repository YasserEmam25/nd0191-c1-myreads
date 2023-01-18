import { search } from "../BooksAPI";

const searchBooks = async (inp) => {
    if (inp) {
    const books = await search(inp, 12);
    if (books.error === 'empty query' ) return [];
    if (books)return books;
    }   

    return [];

}

export default searchBooks;