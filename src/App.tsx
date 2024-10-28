import StoreCard from './components/store-card/StoreCard';
import { useFetch } from './hooks/useFetch';
import './global.scss';

function App() {
  const {
    data: stores,
    isError,
    isLoading
  } = useFetch('http://localhost:3000/stores');

  if (isError) {
    return (
      <div className='error'>
        <p>Something went wrong. Please try again.</p>
      </div>
    );
  }

  if (isLoading) {
    return <div className='loader'>Loading ...</div>;
  }

  const normalizedStores = stores?.data.map(
    ({ id, type, attributes, relationships }) => ({
      id,
      type,
      name: attributes.name,
      link: attributes.website,
      rating: attributes.rating,
      image: attributes.storeImage,
      date: attributes.establishmentDate,
      countryId: relationships.countries?.data.id,
      storeBooks: relationships.books?.data,
      books: stores?.included?.filter(
        ({ type: includedType }) => includedType === 'books'
      ),
      authors: stores?.included?.filter(
        ({ type: includedType }) => includedType === 'authors'
      ),
      countries: stores?.included?.filter(
        ({ type: includedType }) => includedType === 'countries'
      )
    })
  );

  return (
    <main>
      {normalizedStores?.map((store) => (
        <StoreCard {...store} key={store.id} />
      ))}
    </main>
  );
}

export default App;
