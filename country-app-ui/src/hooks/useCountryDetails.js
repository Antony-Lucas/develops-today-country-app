import { useEffect, useState } from "react";
import { getCountryDetails } from "../services/countryServices";

export const useCountryDetails = (name, code) => {
  const [country, setCountry] = useState(null);
  const [population, setPopulation] = useState(null);
  const [flag, setFlag] = useState("");
  const [borders, setBorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const data = await getCountryDetails(name, code);
        setCountry(data.country);
        setPopulation(data.population);
        setFlag(data.flag);
        setBorders(data.borders);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (name && code) {
      fetchCountryDetails();
    }
  }, [name, code]);

  return { country, population, flag, borders, loading, error };
};

export default useCountryDetails;
