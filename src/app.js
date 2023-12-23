function formatToShortDateName(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function formatToFullDateName(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function formatToTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div><div class="weather-forecast-date">${formatToShortDateName(
          day.time
        )}</div>
        <div>
         <img src="${
           day.condition.icon_url
         }" alt="" class="weather-forecast-icon">
        </div>
       <div class="weather-forecast-temperatures">
            <span class="forecast-temperature-max">${Math.round(
              day.temperature.maximum
            )}°</span> <span
            class="forecast-temperature-min">${Math.round(
              day.temperature.minimum
            )}°</span>
        </div></div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

function getForecast(responseDataCity) {
  let apiKey = "a9d6234fb74f04etfce33ccaod0a2fee";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${responseDataCity}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayReceivedWeather(response) {
  if (response.data.city) {
    let temperatureElement = document.querySelector("#city-temperature-value");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#app-city-name");
    let city = response.data.city;
    let country = response.data.country;
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = `${city}, ${country}`;
    timeElement.innerHTML = `${formatToFullDateName(
      response.data.time
    )} as of ${formatToTime(response.data.time)}, `;
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt=""
                        class="app-city-temperature-icon">`;
    temperatureElement.innerHTML = Math.round(temperature);

    getForecast(response.data.city);
  } else {
    alert(`No data has been found. Please refine your search.`);
  }
}

function searchCity(searchInputValue) {
  let apiKey = "a9d6234fb74f04etfce33ccaod0a2fee";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${searchInputValue}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayReceivedWeather);
}

function searchSubmitHandler(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-from-input");

  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmitHandler);

searchCity("Kyiv");
