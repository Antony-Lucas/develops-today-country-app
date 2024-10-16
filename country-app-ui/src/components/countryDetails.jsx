import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import useCountryDetails from "../hooks/useCountryDetails";
import { HiChevronLeft } from "react-icons/hi";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import "../style/countryDetails.css";

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
      <Link to={`/`} className="back-button">
        <HiChevronLeft />
        <span>Back to list</span>
      </Link>
      <div className="country-info">
        <div className="country-data">
          <img
            src={flag}
            alt={`Flag of ${country.name}`}
            className="country-flag"
          />
          <h1>{country.name}</h1>
          <h4>Country Code: {country.countryCode}</h4>

          <p>Border Countries:</p>
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
        </div>
        <div className="country-chart">
          <h3>Population Over Time in {country.name}</h3>
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
