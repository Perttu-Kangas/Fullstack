import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleNameFilterChange = (event) => {
    forceFilter(event.target.value);
  };

  const forceFilter = (filter) => {
    setNameFilter(filter);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(nameFilter.toLowerCase())
  );

  return (
    <div>
      <Filter
        nameFilter={nameFilter}
        handleNameFilterChange={handleNameFilterChange}
      />
      <ShowCountries
        countriesToShow={countriesToShow}
        forceFilter={forceFilter}
      />
    </div>
  );
}

const Filter = (props) => {
  return (
    <>
      find countries{" "}
      <input value={props.nameFilter} onChange={props.handleNameFilterChange} />
    </>
  );
};

const ShowCountries = (props) => {
  if (props.countriesToShow.length > 10) {
    return (
      <>
        <p>Too many matches, specify another filter</p>
      </>
    );
  } else if (props.countriesToShow.length === 1) {
    return (
      <>
        <ShowCountry country={props.countriesToShow[0]} />
      </>
    );
  } else {
    return (
      <>
        {props.countriesToShow.map((country) => (
          <p key={country.name.common}>
            {country.name.common}
            <button onClick={() => props.forceFilter(country.name.common)}>
              show
            </button>
          </p>
        ))}
      </>
    );
  }
};

const ShowCountry = ({ country }) => {
  console.log(country.languages);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
        console.log(response.data);
      });
  }, [country]);

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <ShowCountryWeather weather={weather}/>
    </>
  );
};

const ShowCountryWeather = ({ weather }) => {
  console.log(weather)
  if (weather === null) {
    return null;
  }
  return (
    <>
      <h2>Weather in {weather.name}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img
        src={
          "http://openweathermap.org/img/wn/" +
          weather.weather[0].icon +
          "@2x.png"
        }
        alt="weathericon"
      />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  );
};

export default App;
