import { useEffect, useState } from "react";

const useJWT = (email) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    fetch(`https://peon-bookshop-server.vercel.app/jwt?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.token) {
          // console.log(data.token);
          setToken(data?.token);
        }
      });
  }, [email]);
  return [token];
};
export default useJWT;
