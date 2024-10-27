import { useEffect, useState } from 'react';

export const useCountry = (code: string) => {
  const url = `https://restcountries.com/v3.1/alpha/${code}`;

  const [data, setData] = useState<{ [key: string]: any }>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
        const data = await result.json();
        setData(data);
      } catch (error) {
        setIsError(true);
        console.error('Error fetching country data.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading, isError };
};
