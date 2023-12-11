function searchSubmitHandler(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-from-input");
  let cityElement = document.querySelector("#app-city-name");
  cityElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmitHandler);
