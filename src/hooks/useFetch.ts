import { useEffect, useState } from 'react';
import { StoreResponseProps } from '../types';

export const useFetch = (url: string) => {
  const [data, setData] = useState<StoreResponseProps>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/vnd.api+json',
            Accept: 'application/vnd.api+json'
          }
        });
        const data = await result.json();
        if (!ignore) {
          setData(data);
        }
      } catch (error) {
        setIsError(true);
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
