import { useEffect, useState } from "react";


export function useFetch(url) {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(true);

  const refresh = () => { 
    setRefreshFlag(true)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
      } catch (e) {
        setError(e)
      } finally {
        setLoading(false);
        setRefreshFlag(false);
      }
    }

    fetchData()

  }, [refreshFlag])

  return [error, loading, data, refresh];
}