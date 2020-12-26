import React from "react";

export default function useFetch(url) {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(!!url);
  const [error, setError] = React.useState(null);

  React.useEffect(async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch(url);
      const json = await response.json();
      response.ok ? setData(json) : setError(json);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }, [url]);

  return { data, loading, error };
}
