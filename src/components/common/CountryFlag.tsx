import { useCountry } from '../../hooks/useCountry';

type CountryFlagProps = { code: string };

const CountryFlag = ({ code }: CountryFlagProps) => {
  const flagUrl = `https://flagsapi.com/${code}/flat/48.png`;

  const { data: country, isLoading, isError } = useCountry(code);

  if (isLoading) {
    return <div className='country'>Loading...</div>;
  }

  if (isError) {
    console.error(`Error fetching country data from the API!`);
    // Providing a fallback image in case the API fails
    return (
      <div className='country'>
        <img src={flagUrl} alt='Country Flag' />
      </div>
    );
  }

  const countrySvgUrl = country[0]?.flags.svg;
  const countryName = country[0]?.name?.official;

  return (
    <div className='country'>
      <img src={countrySvgUrl} alt={`Flag of ${countryName}`} />
    </div>
  );
};

export default CountryFlag;
