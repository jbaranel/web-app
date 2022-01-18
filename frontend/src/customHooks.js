import { useState, useEffect } from "react";

const useFetch = (url, method, body, submit) => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        let payload = {
          method: method,
          headers: { 
            "Content-Type": "application/json"
           },
        };
        if (method != "GET") {
          payload.body = body;
        }
        fetch(`${process.env.REACT_APP_API_URL}${url}`, payload, {mode:'cors'})
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              setServerError(data);
            } else {
              setApiData(data);
            }
            setIsLoading(false);
          });
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    url && fetchData();
  }, [url]);
  return { isLoading, apiData, serverError };
};

export default useFetch;
