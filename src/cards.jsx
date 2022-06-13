/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './components/style.scss';
import PropTypes from 'prop-types';
import sun from './IMGs/sun1.png';
import cloudy from './IMGs/cloudy1.png';
import rain from './IMGs/rain.png';
import clouds from './IMGs/clouds.png';
import lightning from './IMGs/lightning.png';


const Main = styled.div`
  font-family: 'Kdam Thmor Pro', sans-serif;
  background-image: ${props => `url(${props.img})`};
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: top;
  background-size: 1500px;
  min-height: 500px;
    .temp{
      font-size: 330px;
      color: #292929;
    }
`
const Containers = styled.div`
  font-family: 'Kdam Thmor Pro', sans-serif;
  display: flex;
  justify-content: center;
  padding: 4rem;
`

function Cards( { locationName, weatherData } ) {
  const [isShown, setIsShown] = useState(false);
  const [cardData, setCardData] = useState({});
  const [background, setBackground] = useState(sun);
  
  const setDaysOfTheWeek = (DT) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const time = new Date(DT * 1000);
    const dayName = days[time.getDay()];
    return dayName;
  };
  const setDayOfTheWeek = (DT) => {
    const days = [
      'Sun',
      'Mon',
      'Tues',
      'Wed',
      'Thur',
      'Fri',
      'Sat',
    ];
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
        return setBackground(sun) 
      case '01d':
        return setBackground(lightning)
      case '10d':
        return setBackground(rain)
        case '04d':
          return setBackground(clouds)
        case '11d':
          return setBackground(lightning)
      default:
        return setBackground(cloudy)
  }
  };
  console.log(weatherData)
  useEffect (() => {
    const getData = async () => {
      const data = weatherData[0];
      setCardData(data); 
      // console.log(data)
    }
    if (Object.keys(weatherData).length !== 0) {
      getData();
    } 

  }, [weatherData]);
 
  
 
  // console.log(temp)
  return (
    <main> 
        <Main img={background}> 
          {/* <img src={setIcons(day.weather[0].icon)} alt="WeatherIcon" />
          <h2>{setDaysOfTheWeek(day.dt)}</h2> */}
          {(Object.keys(cardData).length !== 0) && <p className="temp">{Math.floor(cardData.temp.day)}</p>}
          {/* <p>{day.weather[0].description}</p>
          <p>Humidity: {day.humidity}</p>
          <p>Wind: {day.wind_speed}</p>
          <p>Min Temp: {day.temp.min}</p>
          <p>Max Temp: {day.temp.max}</p> */}
        </Main>
        <Containers>
            {weatherData.map((day, i) => (
              <div className="card" role="button" tabIndex={i} onClick={() => extraCard(day)}>
                <img src={setIcons(day.weather[0].icon)} alt="weatherIcon" />
                <div className="container">
                  <h4><b>{setDayOfTheWeek(day.dt)}</b></h4> 
                  <p>{Math.floor(day.temp.day)}&deg;F</p>
                  <p>{day.weather[0].description}</p> 
                </div>
              </div>
            ))} 
          </Containers>
    </main>
  );
} 
Cards.propTypes = {
  locationName: PropTypes.string.isRequired,
  weatherData: PropTypes.instanceOf(Object),
};

Cards.defaultProps = {

  weatherData: {}, 
}
export default Cards;
