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
  const image = document.getElementById('image');


  searchButton.addEventListener('click', function () {

    const location = locationInput.value;
    if (!location) {
      return;
    }

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            locationName.textContent = data.name;

            // Weather Info div
            weatherInfo.classList.add('fadeIn');
            temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
            // temperature.textContent = `Temperature: ${data.main.temp}°C`;
            description.innerHTML = `${data.weather[0].description}`;
            // description.textContent = `Description: ${data.weather[0].description}`;

            // Weather Details div
            weatherDetails.classList.add('fadeIn');
            humidity.innerHTML = `${data.main.humidity}%`;
            wind.innerHTML = `${parseInt(data.wind.speed)}Km/h`;

            switch (data.weather[0].main) {
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

        weatherInfo.style.display = '';
        weatherDetails.style.display = '';
        container.style.height = '590px';

        })
        .catch(error => {
            console.error('There was a problem fetching the data:', error);
            locationName.textContent = 'Location not found';
            temperature.textContent = '';
            description.textContent = '';
            humidity.textContent = '';
            wind.textContent = '';
            image.src = '';
        });

  });
});
