import StoreBooks from '../store-books/StoreBooks';
import Rating from '../rating/Rating';
import CountryFlag from '../common/CountryFlag';
import DateLink from '../common/DateLink';
import { IncludedProps, NormalizeStoresProps } from '../../types';
import './StoreCard.scss';

type StoreCardProps = NormalizeStoresProps;

function StoreCard({
  name,
  link,
  rating,
  image,
  date,
  countryId,
  storeBooks,
  books,
  authors,
  countries
}: StoreCardProps) {
  const countryCode = countries?.find((country: IncludedProps) => {
    return country.id === countryId;
  })?.attributes.code;

  return (
    <section className='store-card'>
      <div className='store-card__top'>
        <div className='image'>
          <img src={image} alt={`${name} store`} />
        </div>

        <div className='data'>
          <header>
            <h2>{name}</h2>
            <Rating rating={rating} />
          </header>
          <StoreBooks storeBooks={storeBooks} books={books} authors={authors} />
        </div>
      </div>

      <div className='store-card__footer'>
        <DateLink date={date} url={link} />
        <CountryFlag code={countryCode} />
      </div>
    </section>
  );
}

export default StoreCard;
