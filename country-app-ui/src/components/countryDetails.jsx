import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import useCountryDetails from "../hooks/useCountryDetails";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import "../style/countryDetails.css";

// Registra os componentes do Chart.js
Chart.register(CategoryScale, LinearScale, LineElement, PointElement);

const CountryDetails = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const name = queryParams.get("name");
  const code = queryParams.get("code");
  const { country, loading, error, flag, borders, population } =
    useCountryDetails(name, code);

  if (loading)
    return (
      <div className="loading">
        <p>Loading...</p>
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!country) return <div>No country found.</div>;

  const chartData = {
    labels: population.populationCounts.map((data) => data.year),
    datasets: [
      {
        label: "Population",
        data: population.populationCounts.map((data) => data.value),
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Year",
        },
      },
      y: {
        title: {
          display: true,
          text: "Population",
        },
      },
    },
  };

  return (
    <div className="country-details">
      <h1>{country.name}</h1>
      <img
        src={flag}
        alt={`Flag of ${country.name}`}
        className="country-flag"
      />
      <h2>Country Code: {country.countryCode}</h2>

      <h3>Border Countries:</h3>
      <ul className="border-countries">
        {borders.map((borderCountry) => (
          <li key={borderCountry.countryCode}>
            <Link
              to={`/country?name=${borderCountry.commonName}&code=${borderCountry.countryCode}`}
            >
              {borderCountry.commonName}
            </Link>
          </li>
        ))}
      </ul>

      <h3>Population Over Time</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CountryDetails;
