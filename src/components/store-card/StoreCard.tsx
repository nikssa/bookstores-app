import StoreBooks from '../store-books/StoreBooks';
import Rating from '../rating/Rating';
import CountryFlag from '../common/CountryFlag';
import DateLink from '../common/DateLink';
import { NormalizeStoresProps } from '../../types';
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
  const country = countries?.find((country) => country.id === countryId);
  const countryCode = country?.attributes.code;
  const formattedDate = `${new Date(date).getDate()}.${
    new Date(date).getMonth() + 1
  }.${new Date(date).getFullYear()}`;

  return (
    <section className='store-card'>
      <div className='store-card__top'>
        <div className='image'>
          <a href={link} target='_blank' rel='noopener noreferrer'>
            <img src={image} alt={`${name} store`} />
          </a>
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
        <DateLink date={formattedDate} url={link} />
        <CountryFlag code={countryCode} />
      </div>
    </section>
  );
}

export default StoreCard;
