import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import './components/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from './cards';

const Input = styled.div`
  button {
    border-radius: 10px;
  }
  input {
    border-radius: 10px;
  }
`;
const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [location, setLocation] = useState('Fresno, CA');
  const [input, setInput] = useState('');
  const [locationName, setLocationName] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://geocode.maps.co/search?q=${location}`)
      .then((searchRes) => {
        const { lat, lon } = searchRes.data[0];
        const name = searchRes.data[0].display_name;
        if (name.includes(',')) {
          const anyname = name.split(',');
          setLocationName(`${anyname[0]}, ${anyname[2]}`);
        } else {
          setLocationName(name);
        }
        console.log(searchRes.data);
        axios
          .get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
          )
          .then((weatherCall) => {
            const data = weatherCall.data.daily;
            setWeatherData(data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [location]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLocation(input);
  };
  return (
    <main>
      <h1 className="text-center mt-2">{locationName}</h1>
      <Input>
        <form onSubmit={handleSubmit} className="d-flex flex-row-reverse mx-5">
          <label htmlFor="searchWeather">
            <input
              type="text"
              value={input}
              id="searchWeather"
              placeholder="Fresno, CA"
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Search</button>
          </label>
        </form>
      </Input>
      {weatherData.length && (
        <Cards locationName={locationName} weatherData={weatherData} />
      )}
    </main>
  );
}

export default App;
