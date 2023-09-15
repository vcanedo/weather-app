import { apiKey } from "./config";

document.addEventListener('DOMContentLoaded', function () {
  let API_KEY = apiKey;

  const container = document.querySelector('.container');
  const searchButton = document.getElementById('search');
  const locationInput = document.getElementById('location');
  const locationName = document.getElementById('location-name');
  const weatherInfo = document.getElementsByClassName('weather-info');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const weatherDetails = document.querySelector('.weather-details');
  const humidity = document.querySelector('.weather-details .humidity span');
  const wind = document.querySelector('.weather-details .wind span');


  searchButton.addEventListener('click', function () {
    if (locationInput === '') {
      return;
    }

      const location = locationInput.value;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            locationName.textContent = data.name;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            description.textContent = `Description: ${data.weather[0].description}`;
            weatherInfo.classList.add('fadeIn');
        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
            locationName.textContent = 'Location not found';
            temperature.textContent = '';
            description.textContent = '';
        });

      switch (json.weather[0].main) {
        case 'Clear':
            image.src = 'images/sun.png';
            break;

        case 'Rain':
            image.src = 'images/rain.png';
            break;

        case 'Snow':
            image.src = 'images/snow.png';
            break;

        case 'Clouds':
            image.src = 'images/cloud.png';
            break;

        case 'Haze':
            image.src = 'images/fog.png';
            break;

        default:
            image.src = '';
          }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherInfo.style.display = '';
      weatherDetails.style.display = '';
      weatherInfo.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';

  });
});
