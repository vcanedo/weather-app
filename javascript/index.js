// import { apiKey } from "./config";

document.addEventListener('DOMContentLoaded', function () {
  const API_KEY = '32252474d653ed36f5c633bd646d96b0';

  const container = document.querySelector('.container');
  const searchButton = document.getElementById('search');
  const locationInput = document.getElementById('location');
  const locationName = document.getElementById('location-name');
  const weatherInfo = document.querySelector('.weather-info');
  const temperature = document.getElementById('temperature');
  const description = document.getElementById('description');
  const weatherDetails = document.querySelector('.weather-details');
  const humidity = document.querySelector('.weather-details .humidity span');
  const wind = document.querySelector('.weather-details .wind span');
  const image = document.getElementById('image');


  searchButton.addEventListener('click', function () {

    // Weather Info

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
            temperature.innerHTML = `${parseInt(data.main.temp)}<span>°C</span>`;
            // temperature.textContent = `Temperature: ${data.main.temp}°C`;
            description.innerHTML = `${data.weather[0].description}`;
            // description.textContent = `Description: ${data.weather[0].description}`;

            // Weather Details div
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

              case 'Mist':
                image.src = 'images/fog.png';
                break;

              default:
                image.src = '';
              }

            weatherInfo.style.display = '';
            weatherDetails.style.display = '';
            weatherInfo.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        })
        .catch(error => {
          console.error('There was a problem fetching the data -->', error);
          locationName.textContent = 'Location not found';
          temperature.textContent = '';
          description.textContent = '';
          humidity.textContent = '';
          wind.textContent = '';
          image.src = '';
        });

    // Forecast

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric&cnt=5`;

    const forecastContainer = document.getElementById('forecast-container');

    // clear forecast container
    while (forecastContainer.firstChild) {
      forecastContainer.removeChild(forecastContainer.firstChild);
    }

    fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {

        // Loop through filtered forecast data and create a div for each day
        data.list.slice(1).forEach(forecast => {


          const forecastDate = new Date(forecast.dt * 1000);
          const dayOfWeek = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
          const temperature = forecast.main.temp.toFixed(0);
          const description = forecast.weather[0].description;
          console.log(dayOfWeek, temperature, description);

          const forecastDayContainer = document.createElement('div');
          forecastDayContainer.classList.add('forecast-day')

          forecastDayContainer.innerHTML = `
            <h3>${dayOfWeek}</h3>
            <p>${temperature}°C</p>
            <p>${description}</p>
          `;

          forecastContainer.appendChild(forecastDayContainer);
          // forecastDayDiv.classList.add('fadeIn');
        });
      })
      .catch(error => {
        console.error('There was a problem fetching forecast data -->', error);
      });



  });
});
