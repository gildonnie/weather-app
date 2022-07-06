import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './components/style.scss';
import PropTypes from 'prop-types';
import sun from './IMGs/sun.png';
import cloudy from './IMGs/cloudy1.png';
import rain from './IMGs/rain.png';
import clouds from './IMGs/clouds.png';
import lightning from './IMGs/lightning.png';
import snow from './IMGs/snow.png';

const Main = styled.div`
  font-family: 'Kdam Thmor Pro', sans-serif;
  background-image: ${(props) => `url(${props.img})`};
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: top;
  background-size: 1500px;
  min-height: 500px;
  @media only screen and (max-width: 600px) {
    background-image: ${(props) => `url(${props.img})`};
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center 20px;
    background-size: 1200px;
  }
  .temp {
    @media only screen and (max-width: 600px) {
      font-size: 280px;
    }
    font-size: 330px;
    color: #292929;
  }
  display: grid;
  grid-template-columns: 2f 1fr;
  .extra-da {
    margin: 1rem;
    display: flex;
    justify-content: space-evenly;
    @media only screen and (max-width: 600px) {
      flex-direction: column;
    }
  }
`;
const Containers = styled.div`
  font-family: 'Kdam Thmor Pro', sans-serif;
  display: flex;
  justify-content: center;
  padding: 1rem;
  .card {
    border-radius: 50px 10px;
    @media only screen and (max-width: 600px) {
      flex-direction: row;
      min-width: 100%;
    }
  }
  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

function Cards({ weatherData }) {
  const [cardData, setCardData] = useState({});
  const [background, setBackground] = useState();

  const setDayOfTheWeek = (DT) => {
    const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
    const time = new Date(DT * 1000);
    const dayName = days[time.getDay()];
    return dayName;
  };

  const setIcons = (icon) => {
    const IconUrl = 'http://openweathermap.org/img/wn/';
    const EndUrl = '@2x.png';
    const FullUrl = `${IconUrl}${icon}${EndUrl}`;
    return FullUrl;
  };

  const extraCard = (event) => {
    setCardData(event);
    switch (event.weather[0].icon) {
      case '02d':
        return setBackground(cloudy);
      case '01d':
        return setBackground(sun);
      case '10d':
        return setBackground(rain);
      case '04d':
        return setBackground(clouds);
      case '11d':
        return setBackground(lightning);
      case '13d':
        return setBackground(snow);
      default:
        return setBackground(sun);
    }
  };
  console.log(weatherData);
  useEffect(() => {
    const getData = async () => {
      const data = weatherData[0];
      setCardData(data);
      const dayBackground = weatherData[0].weather[0].icon;
      console.log(dayBackground);
      switch (dayBackground) {
        case '02d':
          return setBackground(cloudy);
        case '01d':
          return setBackground(sun);
        case '10d':
          return setBackground(rain);
        case '04d':
          return setBackground(clouds);
        case '11d':
          return setBackground(lightning);
        case '13d':
          return setBackground(snow);
        default:
          return setBackground(sun);
      }
    };
    if (Object.keys(weatherData).length !== 0) {
      getData();
    }
  }, [weatherData]);

  return (
    <>
      <Main img={background}>
        {/* <img src={setIcons(cardData.weather[0].icon)} alt="WeatherIcon" /> */}
        <div>
          {Object.keys(cardData).length !== 0 && (
            <p className="temp">{Math.floor(cardData.temp.day)}</p>
          )}
        </div>
        <div className="extra-da">
          {Object.keys(cardData).length !== 0 && (
            <>
              <p>{cardData.weather[0].description}</p>
              <p>Humidity: {cardData.humidity}</p>
              <p>Wind: {Math.floor(cardData.wind_speed)} mph</p>
              <p>Min Temp: {Math.floor(cardData.temp.min)}&deg;F</p>
              <p>Max Temp: {Math.floor(cardData.temp.max)}&deg;F</p>
            </>
          )}
        </div>
      </Main>
      <Containers>
        {weatherData.map((day, i) => (
          <div
            className="card"
            role="button"
            tabIndex="0"
            data-testid={`button_${i}`}
            onKeyDown={() => extraCard(day)}
            onClick={() => extraCard(day)}
          >
            <img src={setIcons(day.weather[0].icon)} alt="weatherIcon" />
            <div className="container">
              <h4>{setDayOfTheWeek(day.dt)}</h4>
              <p>{Math.floor(day.temp.day)}&deg;F</p>
              <p>{day.weather[0].description}</p>
            </div>
          </div>
        ))}
      </Containers>
    </>
  );
}
Cards.propTypes = {
  weatherData: PropTypes.instanceOf(Object),
};

Cards.defaultProps = {
  weatherData: {},
};
export default Cards;
