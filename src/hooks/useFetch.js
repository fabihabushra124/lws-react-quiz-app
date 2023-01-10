import { useEffect, useState } from 'react';

export default function useFetch(url, method, headers) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function requestFetch() {
      try {
        setLoading(true);
        setError(false);
        // Request to fetch
        const response = await fetch(url, {
          method: method || 'GET',
          headers,
        });
        const data = await response.json();
        setLoading(false);
        setResult(data);
      } catch(err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }
    
    requestFetch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Don't give the props as dependencies, it will create an infinity loop. Because headers in an Objecr, which is an referance value.

  return {
    loading,
    error,
    result
  };

}
