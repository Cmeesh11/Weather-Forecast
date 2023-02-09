// Variable Declaration
var searchBox = document.querySelector("#search-box");
var form = document.querySelector("#form");
var cardContainer = document.querySelector("#card-container");
var mainIcon = document.querySelector("#current-icon");
var mainTemp = document.querySelector("#current-temp");
var mainWind = document.querySelector("#current-wind");
var mainHumidity = document.querySelector("#current-humidity");
var fiveTemp = document.querySelector(".temp");
var fiveWind = document.querySelector(".wind");
var fiveHumid = document.querySelector(".humid");


var APIKey = "1ce1940be26fc8ed7cdbc6fcdac3d09e";

// Listens for form submit, fetches current day URL and 5 day forecast URL
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityName = searchBox.value;
  var currentQueryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey +
    "&units=imperial";
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    APIKey +
    "&units=imperial";
  // Fetching data for current day
  fetch(currentQueryURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Setting variable values based on data
      var currentTemp = data.main.temp;
      var currentWind = data.wind.speed;
      var currentHumidity = data.main.humidity;
      var currentIconId = data.weather[0].icon;
      var currentIconLink =
        "http://openweathermap.org/img/wn/" + currentIconId + "@2x.png";

      // Changing text content based on data
      mainIcon.setAttribute("style", "max-width: 5rem;");
      mainIcon.setAttribute("src", currentIconLink);
      mainTemp.textContent = "Temp: " + currentTemp + "F";
      mainWind.textContent = "Wind: " + currentWind + "mph";
      mainHumidity.textContent = "Humidity: " + currentHumidity + "%";
    });

  // Fetching data for 5 day forecast
  fetch(forecastURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Looping over each card
      console.log(data);
      cardContainer.forEach(function(data) {
        var temp = data.list[1 + i * 8].main.temp;
        fiveTemp.textContent = "Temp: " + temp;
      })
    });
});
