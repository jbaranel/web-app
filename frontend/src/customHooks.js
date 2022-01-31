import { useState, useEffect } from "react";
import API from "./apiHelper";

const useFetch = (method, url, body) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    console.log(method)
    setIsLoading(true);
    switch (method) {
      case "GET":
        setResponse(API.GET(url));
        break;
      case "POST":
        setResponse(API.POST(url, body));
        break;
      default:
        break;
    }
    console.log(response)
    setIsLoading(false);
  }, [url]);
  return { isLoading, response };
};

export default useFetch;
