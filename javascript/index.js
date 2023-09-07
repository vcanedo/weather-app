import { apiKey } from './config.js';

document.addEventListener('DOMContentLoaded', function () {
  let API_KEY = apiKey

  const searchButton = document.getElementById('search');
  const locationInput = document.getElementById('location');
  const locationName = document.getElementById('location-name');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');

  searchButton.addEventListener('click', function () {
      const location = locationInput.value;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;

      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              locationName.textContent = data.name;
              temperature.textContent = `Temperature: ${data.main.temp}°C`;
              description.textContent = `Description: ${data.weather[0].description}`;
          })
          .catch(error => {
              console.error('Error fetching weather data:', error);
              locationName.textContent = 'Location not found';
              temperature.textContent = '';
              description.textContent = '';
          });
  });
});
