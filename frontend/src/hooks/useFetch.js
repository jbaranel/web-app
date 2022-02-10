import { useState, useEffect } from "react";

const useFetch = (apiCall, args) => {
  const [state, setState] = useState(null)
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");

  useEffect(async () => {
    setState('loading')
    try {
      const result = await apiCall(args);
      setResponse(result.data);
      setState(result.data)
    } catch (err) {
      setError(err.message || "An error occured");
      setState('error')
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const refetch = async () => {
    setLoading(true);
    try {
      const result = await apiCall(args);
      setResponse(result.data);
    } catch (err) {
      setError(err.message || "An error occured");
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, error, refetch, setResponse, setLoading, setError };
};

export default useFetch;
