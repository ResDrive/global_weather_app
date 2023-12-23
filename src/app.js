function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} as of ${hours}:${minutes}`;
}

function displayReceivedWeather(response) {
  console.log(response.data);
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
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = `${city}, ${country}`;
    timeElement.innerHTML = formatDate(date);
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

function getForecast(searchInputValue) {
  let apiKey = "a9d6234fb74f04etfce33ccaod0a2fee";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${searchInputValue}&key=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response);

  let daysMoc = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let forecastHtml = "";

  daysMoc.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div><div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌞</div>
       <div class="weather-forecast-temperatures">
            <span class="forecast-temperature-max">18°</span> <span
            class="forecast-temperature-min">12°</span>
        </div></div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmitHandler);

searchCity("Kyiv");

displayForecast();
