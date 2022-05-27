import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [location, setLocation] = useState('Fresno, CA');
  const geoCode = `https://geocode.maps.co/search?q=${location}`;
  const [weatherData, setWeatherData] = useState(null);

  // const BASEURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
  useEffect(() => {
    axios
      .get(geoCode)
      .then((searchRes) => {
        const { lat, lon } = searchRes.data[0];
        // console.log(lat, lon);
        axios
          .get(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
            // api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}139&appid=${apiKey}
          )
          .then((weatherCall) => {
            const time = weatherCall.data.daily[0].dt * 1000;
            const days = new Date(time);
            const data = weatherCall.data.daily;
            data.map((day) => {
              return '<p>day</p>';
            });
            console.log(data);
            setWeatherData(days);
            console.log(weatherData);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(weatherData);

  // const updateSearch = (e) => {
  //   e.preventDeafault();
  //   setLocation({ ...data, searchWeather: inputRef.current.value });
  //   console.log(location)
  // };
  return (
    <div>
      <h1>test</h1>
      <form>
        <label htmlFor="searchWeather">
          <input type="text" id="searchWeather" placeholder="Fresno, CA" />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default App;
