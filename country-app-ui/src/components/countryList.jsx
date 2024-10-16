import React from "react";
import useCountryList from "../hooks/useCountry";
import { Link } from "react-router-dom";
import "../style/countryList.css";

const CountryList = () => {
  const { countries, loading, error } = useCountryList();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="country-list">
      <h1>Country List</h1>
      <div className="country-grid">
        {countries.map((country) => (
          <div className="country-card" key={country.countryCode}>
            <Link
              to={`/country?name=${country.name}&code=${country.countryCode}`}
              className="country-link"
            >
              <img
                src={`https://flagcdn.com/w320/${country.countryCode.toLowerCase()}.png`}
                alt={`Flag of ${country.name}`}
                className="country-flag-list"
              />
              <div>
                <h3>{country.name}</h3>
                <p>Code: {country.countryCode}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountryList;
