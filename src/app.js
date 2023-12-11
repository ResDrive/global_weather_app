function displayReceivedWeather(responce) {
  let temperatureElement = document.querySelector("#city-temperature-value");
  let temperature = responce.data.temperature.current;
  let cityElement = document.querySelector("#app-city-name");
  let city = responce.data.city;
  let country = responce.data.country;

  cityElement.innerHTML = `${city}, ${country}`;
  temperatureElement.innerHTML = Math.round(temperature);
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
