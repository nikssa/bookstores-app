import StoreCard from './components/store-card/StoreCard';
import { useFetch } from './hooks/useFetch';
import { useState } from 'react';
import ThemeButton from './components/common/theme-button/ThemeButton';
import './global.scss';

function App() {
  const {
    data: stores,
    isError,
    isLoading
  } = useFetch('http://localhost:3000/stores');

  // const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [theme, setTheme] = useState('dark');

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
    <>
      <ThemeButton theme={theme} setTheme={setTheme} />
      <div className={`wrapper ${theme}`}>
        <main>
          {normalizedStores?.map((store) => (
            <StoreCard {...store} key={store.id} />
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
