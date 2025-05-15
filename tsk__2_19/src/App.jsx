import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [tmpCountry, setTmpCountry] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("first render");
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        console.log(response.data.length);
        setTmpCountry(response.data);
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterOp = (event) => {
    const filter = event.target.value.toLowerCase();
    const filteredCountry = tmpCountry.filter((p) =>
      p.name.common.toLowerCase().includes(filter)
    );
    setCountries(filteredCountry);
  };

  const showOp = (a) => {
    const showCountry = tmpCountry.filter((p) => p.name.common.includes(a));
    setCountries(showCountry);
    console.log(showCountry);
  };

  return (
    <>
      <h1>Countries</h1>
      <label>find country(s): </label>
      <input id="country-search" onChange={filterOp} />
      {countries.length > 10 ? (
        <div>too many countries, type in filter input</div>
      ) : countries.length === 1 ? (
        countries.map((country) => (
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <p>capital: {country.capital}</p>
            <p>area: {country.area}</p>
            <h3>languages</h3>
            <ul>
              {Object.values(country.languages).map((lang) => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
            <img src={country.flags.png} alt="flag" />
          </div>
        ))
      ) : (
        countries.map((country) => (
          <div key={country.name.common}>
            {`${country.name.common} `}
            <button
              onClick={() => {
                console.log("ttt");
                showOp(country.name.common);
              }}
            >
              show
            </button>
          </div>
        ))
      )}
    </>
  );
};

export default App;
