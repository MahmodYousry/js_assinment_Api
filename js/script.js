document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'dd35fdefdadb4c21b3b182557231408'; // Replace with your actual API key

  const searchButton = document.getElementById('searchButton');
  const locationInput = document.getElementById('locationInput');
  const weatherContainer = document.getElementById('weatherContainer');
  const middleInfo = document.querySelector('.middle-info-box');
  const thaDayAfter = document.querySelector('.thaDayAfter');
  const weatherInfo = document.querySelectorAll('.weatherInfo');

  const leftBox = document.getElementById('leftBox');

  locationInput.addEventListener('keyup', function () {
    const location = locationInput.value.trim();
    if (location !== '') {
      fetchWeather(location);
    }
  });

  async function fetchWeather(location) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;
    
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();


      
      if (data.error) {
        weatherContainer.innerHTML = `<p>${data.error.message}</p>`;
      } else {


        let daysInfo = data.forecast.forecastday;

        for (let i = 0; i < daysInfo.length; i++) {
          const day = `
            <p class="m-0">${data.location.name}</p>
            <h1 class="m-0">
              <span class="degree">${daysInfo[i].day.avgtemp_c}°C</span>
              <span><img src="${daysInfo[i].day.condition.icon}" alt=""></span>
              <p class="m-0 fs-5">${daysInfo[i].day.condition.text}</p>
            </h1>
          `;
          weatherInfo[i].innerHTML = day;
        }
        
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      weatherContainer.innerHTML = '<p>An error occurred while fetching weather data.</p>';
    }
  }

  fetchWeather('egypt');


  // =========================

  // Get the current date
  const today = new Date();

  console.log(today);

  // Calculate the date for tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Calculate the date for the day after tomorrow
  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(today.getDate() + 2);

  // Define an array of day names
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get the day names for today, tomorrow, and the day after tomorrow
  const todayName = daysOfWeek[today.getDay()];
  const tomorrowName = daysOfWeek[tomorrow.getDay()];
  const dayAfterTomorrowName = daysOfWeek[dayAfterTomorrow.getDay()];

  document.querySelector('#today').innerHTML = todayName;
  document.querySelector('#tommorow').innerHTML = tomorrowName;
  document.querySelector('#after').innerHTML = dayAfterTomorrowName;

});
