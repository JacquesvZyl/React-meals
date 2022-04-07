import { useCallback, useState } from "react";

function useHTTP() {
  const [error, setError] = useState(null);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = useCallback(async (configData, applyData) => {
    try {
      setError(null);
      setIsLoading(true);
      const { url, method, headers, body } = configData;
      const response = await fetch(url, {
        method: method ? method : "GET",
        headers: headers ? headers : {},
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) throw new Error("Request to Database failed");

      const data = await response.json();
      setDidSubmit(true);
      applyData(data);
    } catch (e) {
      setError(e.message || "Something went wrong");
    }
    setIsLoading(false);
  }, []);

  return { error, isLoading, sendRequest, didSubmit };
}

export default useHTTP;
