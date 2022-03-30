import { Card } from '@components/Card';
import '@styles/index.scss';

let weather = {
  fetchWeatherData: (city = 'Moscow') => {
    try {
      fetch(
        `https://api.weatherbit.io/v2.0/current?key=fab404f829a24c0e8bdf4a18e09bad61&city=${city}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => weather.prodWeather(data));
    } catch {
      throw new Error('No weather found.');
    }
  },
  prodWeather: (data) => {
    const {
      city_name: city,
      temp: temperature,
      country_code: country,
      pres: pressure,
      clouds,
      wind_spd: wind,
      solar_rad: solarRad,
    } = data.data[0];
    const cardData = [
      { title: 'Pressure', data: Math.round(pressure) + ' Pa' },
      { title: 'Clouds', data: Math.round(clouds) + '%' },
      { title: 'Wind speed', data: Math.round(wind) + ' m/s' },
      { title: 'Solar Radiation', data: Math.round(solarRad) + ' kW/m2' },
    ];
    document.getElementById('temp').innerText = Math.round(temperature);
    document.getElementById('region').innerText = city + ', ' + country;
    document.getElementById('cards').innerHTML = cardData
      .map((item) => {
        return Card(item.title, item.data);
      })
      .join('');
  },
  search: () => {
    weather.fetchWeatherData(document.getElementById('input').value);
  },
};

document.getElementById('submit').addEventListener('click', (e) => {
  e.preventDefault();
  weather.search();
});

weather.fetchWeatherData();
