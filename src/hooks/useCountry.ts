import { useEffect, useState } from 'react';

export const useCountry = (code: string) => {
  const url = `https://restcountries.com/v3.1/alpha/${code}`;

  const [data, setData] = useState<{ [key: string]: any }>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchData = async (): Promise<void> => {
      setIsError(false);
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(
            `Failed to fetch country data. Status: ${response.status}`
          );
        }
        const data: { [key: string]: any } = await response.json();
        if (!ignore) {
          setData(data);
        }
      } catch (error) {
        setIsError(true);
        console.error('Error fetching country data.', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  return { data, isLoading, isError };
};
