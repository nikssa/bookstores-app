import { IncludedProps, NormalizeBookProps } from '../../types';
import './StoreBooks.scss';

type StoreBookProps = {
  storeBooks: IncludedProps[];
  books: IncludedProps[];
  authors: IncludedProps[];
};

function StoreBooks({ storeBooks, books, authors }: StoreBookProps) {
  const filteredBooks = books?.filter((book: IncludedProps) =>
    storeBooks?.some((storeBook: IncludedProps) => storeBook.id === book.id)
  );

  const normalizedBooks = filteredBooks?.map((storeBook: IncludedProps) => {
    const author = authors?.find(
      (author) => author.id === storeBook.relationships?.author.data.id
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
  const sortedBooks = normalizedBooks?.sort(
    (a: NormalizeBookProps, b: NormalizeBookProps) =>
      b.copiesSold - a.copiesSold
  );
  /**
   * Getting top 2 store books to display
   */
  const topTwoBooks = sortedBooks?.slice(0, 2);

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
          {topTwoBooks?.length > 0 ? (
            topTwoBooks.map(({ id, bookName, copiesSold, authorName }) => {
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
