import { useEffect, useState } from "react";

const useData = (url) => {
  const [serverData, setServerData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${url}`)
      .then((res) => res.json())
      .then((data) => {
        setServerData(data);
        setIsLoading(false);
      });
  }, [url]);
  return [serverData, isLoading];
};
export default useData;
