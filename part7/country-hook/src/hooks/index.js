import { useState, useEffect } from "react";
import axios from "axios";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [found, setFound] = useState(false);

  useEffect(() => {
    if (name !== "")
      axios
        .get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
        .then((res) => {
          setCountry(res.data[0]);
          setFound(true);
        })
        .catch(() => setFound(false));
  }, [name]);
  return {
    name,
    data: country,
    found,
  };
};
