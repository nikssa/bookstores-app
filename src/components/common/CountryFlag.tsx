import { useCountry } from '../../hooks/useCountry';

type CountryFlagProps = { code: string };

const CountryFlag = ({ code }: CountryFlagProps) => {
  const { data: countryData, isLoading, isError } = useCountry(code);
  const fallbackFlagUrl = `https://flagsapi.com/${code}/flat/48.png`;

  if (isLoading) {
    return <div className='country'>Loading...</div>;
  }

  if (isError) {
    console.error(`Error fetching country data from the API!`);
    // Providing a fallback image in case the API fails
    return (
      <div className='country'>
        <img src={fallbackFlagUrl} alt='Fallback Country Flag' />
      </div>
    );
  }

  const flagUrl = countryData[0]?.flags.svg;
  const countryName = countryData[0]?.name?.official;

  return (
    <div className='country'>
      <img src={flagUrl} alt={`Flag of ${countryName}`} />
    </div>
  );
};

export default CountryFlag;
