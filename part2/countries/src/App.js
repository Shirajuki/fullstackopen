import React, { useState, useEffect } from "react";
import config from "./config";
import axios from "axios";

const WeatherDisplay = ({ weather }) => {
  return (
    <div>
      {weather ? (
        <>
          <p>
            <b>temperature:</b> {weather.temp_c} celsius
          </p>
          <img
            src={weather.condition.icon}
            alt={weather.condition.text}
            width="50px"
            height="50px"
          />
          <p>
            <b>wind:</b> {weather.wind_mph} mph direction {weather.wind_dir}
          </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

const CountryDisplay = ({ country, weather }) => {
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
      <h3>Weather in {country.capital}</h3>
      <WeatherDisplay weather={weather} />
    </div>
  );
};

const CountriesDisplay = ({
  filteredCountries,
  setFilteredCountries,
  weather,
}) => {
  if (filteredCountries.length === 1)
    return <CountryDisplay country={filteredCountries[0]} weather={weather} />;
  return filteredCountries.length > 10 ? (
    <p>Too many matches, specify another filter</p>
  ) : (
    <>
      {filteredCountries.map((country) => (
        <p key={country.name}>
          {country.name}{" "}
          <button onClick={() => setFilteredCountries([country])}>show</button>
        </p>
      ))}
    </>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
      setCountries(res.data);
    });
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(filter)
    );
    setFilteredCountries(filtered);
  }, [filter, countries]);

  useEffect(() => {
    if (filteredCountries.length === 1) {
      const location = filteredCountries[0].capital;
      const url = `http://api.weatherapi.com/v1/current.json?q=${location}&key=${config.api_key}`;
      console.log(url);
      axios.get(url).then((res) => {
        if (res.status === 200) setWeather(res.data.current);
      });
    }
  }, [filteredCountries]);
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
        filteredCountries={filter === "" ? [] : filteredCountries}
        setFilteredCountries={setFilteredCountries}
        weather={weather}
      />
    </div>
  );
};

export default App;
