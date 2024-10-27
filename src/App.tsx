import StoreCard from './components/store-card/StoreCard';
import { useFetch } from './hooks/useFetch';
import { IncludedProps, NormalizeStoresProps, StoreProps } from './types';
import './global.scss';

function App() {
  const {
    data: storesData,
    isError,
    isLoading
  } = useFetch('http://localhost:3000/stores');

  const books = storesData?.included?.filter((item: IncludedProps) => {
    return item.type === 'books';
  });
  const authors = storesData?.included?.filter((item: IncludedProps) => {
    return item.type === 'authors';
  });
  const countries = storesData?.included?.filter((item: IncludedProps) => {
    return item.type === 'countries';
  });

  const normalizedStoresData = storesData?.data?.map((store: StoreProps) => {
    return {
      type: store.type,
      id: store.id,
      name: store.attributes.name,
      link: store.attributes.website,
      rating: store.attributes.rating,
      image: store.attributes.storeImage,
      date: store.attributes.establishmentDate,
      countryId: store.relationships.countries?.data.id,
      storeBooks: store.relationships.books?.data as IncludedProps[],
      books: books as IncludedProps[],
      authors: authors as IncludedProps[],
      countries: countries as IncludedProps[]
    };
  });

  if (isError) {
    return (
      <div className='error'>
        <p>Something went wrong. Please try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className='loader'>Loading ...</div>;
  } else {
    return (
      <main>
        {normalizedStoresData?.map((store: NormalizeStoresProps) => (
          <StoreCard {...store} key={store.id} />
        ))}
      </main>
    );
  }
}

export default App;
