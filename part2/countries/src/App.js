import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryDisplay = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        width="100px"
        height="100px"
        alt={`flag of ${country.name}`}
      />
    </div>
  );
};

const CountriesDisplay = ({ filteredCountries }) => {
  if (filteredCountries.length === 1)
    return <CountryDisplay country={filteredCountries[0]} />;
  return filteredCountries.length > 10 ? (
    <p>Too many matches, specify another filter</p>
  ) : (
    <>
      {filteredCountries.map((country) => (
        <p key={country.name}>{country.name}</p>
      ))}
    </>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);
  return (
    <div className="App">
      <div>
        find countries{" "}
        <input
          value={filter}
          onChange={(event) => setFilter(event.target.value.toLowerCase())}
        />
      </div>
      <CountriesDisplay
        filteredCountries={
          filter === ""
            ? []
            : countries.filter((country) =>
                country.name.toLowerCase().includes(filter)
              )
        }
      />
    </div>
  );
};

export default App;
