import { IncludedProps, NormalizeBookProps } from '../../types';
import './StoreBooks.scss';

type StoreBookProps = {
  storeBooks: IncludedProps[];
  books: IncludedProps[];
  authors: IncludedProps[];
};

function StoreBooks({ storeBooks, books, authors }: StoreBookProps) {
  const selectedBooks = books?.filter((book: IncludedProps) => {
    const foundBook = storeBooks?.find(
      (storeBook: IncludedProps) => storeBook.id === book.id
    );
    return !!foundBook;
  });

  const normalizeStoreBooks = selectedBooks?.map((storeBook: IncludedProps) => {
    const author = authors?.find(
      (author: IncludedProps) =>
        author.id === storeBook?.relationships?.author.data.id
    );
    const authorName = author?.attributes.fullName || 'Unknown Author';

    return {
      id: storeBook.id,
      bookName: storeBook?.attributes?.name,
      copiesSold: storeBook?.attributes?.copiesSold,
      authorName: authorName
    };
  });

  /**
   * Sorting store books by copiesSold in descending order
   */
  const sortedStoreBooks = normalizeStoreBooks?.sort(
    (a: NormalizeBookProps, b: NormalizeBookProps) =>
      b.copiesSold - a.copiesSold
  );
  /**
   * Getting top 2 store books to display
   */
  const topTwoStoreBooks = sortedStoreBooks?.slice(0, 2);

  return (
    <>
      <table className='store-books'>
        <thead>
          <tr>
            <th colSpan={2}>
              <h3>Bestselling Books</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {topTwoStoreBooks?.length > 0 ? (
            topTwoStoreBooks.map((storeBook: NormalizeBookProps) => {
              const { id, bookName, copiesSold, authorName } = storeBook;
              return (
                <tr key={id}>
                  <td>
                    {bookName} <span className='copies'>{copiesSold}</span>
                  </td>
                  <td>{authorName}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default StoreBooks;
