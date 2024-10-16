import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CountryList from "./components/countryList";
import CountryDetails from "./components/countryDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
