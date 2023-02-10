// Variable Declaration
var searchBox = document.querySelector("#search-box");
var form = document.querySelector("#form");
var currentDate = document.querySelector("#current-date");
var mainIcon = document.querySelector("#current-icon");
var mainTemp = document.querySelector("#current-temp");
var mainWind = document.querySelector("#current-wind");
var mainHumidity = document.querySelector("#current-humidity");
var container = document.querySelector("#container");
var city = document.querySelector(".city-name");
var cityList = document.querySelector("#city-list");
var row1 = document.querySelector("#row1");

var cityListContainer = document.createElement("div");
var cityList = document.createElement("ul");

var fiveTemp = document.querySelector(".temp");
var fiveWind = document.querySelector(".wind");
var fiveHumid = document.querySelector(".humid");

var APIKey = "1ce1940be26fc8ed7cdbc6fcdac3d09e";

function current() {
  var cityName = searchBox.value;
  var currentQueryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    APIKey +
    "&units=imperial";
  // Fetching data for current day
  return fetch(currentQueryURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Setting variable values based on data
      console.log(data);
      var currentTemp = data.main.temp;
      var currentWind = data.wind.speed;
      var currentHumidity = data.main.humidity;
      var currentIconId = data.weather[0].icon;
      var currentDateUnix = data.dt
      var date = new Date(currentDateUnix * 1000);
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      var formattedDate = month + "/" + day + "/" + year;
      var currentIconLink =
        "http://openweathermap.org/img/wn/" + currentIconId + "@2x.png";

      // Changing text content based on data
      mainIcon.setAttribute("style", "max-width: 5rem;");
      mainIcon.setAttribute("src", currentIconLink);

      city.textContent = cityName;
      currentDate.textContent = formattedDate;
      mainTemp.textContent = "Temp: " + currentTemp + "F";
      mainWind.textContent = "Wind: " + currentWind + "mph";
      mainHumidity.textContent = "Humidity: " + currentHumidity + "%";
      return;
    });
}

function forecast() {
  var cityName = searchBox.value;
  var forecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&appid=" +
    APIKey +
    "&units=imperial";
  // Fetching data for 5 day forecast
  return fetch(forecastURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Creating 5-day forecast text
      var fiveDay = document.createElement("h3");
      fiveDay.textContent = "5-day Forecast";
      container.appendChild(fiveDay);
      // Looping over each card
      for (var i = 0; i < 5; i++) {
        var temp = data.list[i * 8].main.temp;
        var wind = data.list[i * 8].wind.speed;
        var humidity = data.list[i * 8].main.humidity;
        var icon = data.list[i * 8].weather[0].icon;
        var iconLink = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        // Date
        var dateUnix = data.list[i * 8].dt;
        var date = new Date(dateUnix * 1000);
        var day = date.getDate();
        var month = date.getMonth();
        var formattedDate = month + "/" + day;
        // Creatingelements
        var section = document.createElement("section");
        var divCard = document.createElement("div");
        var divCardBody = document.createElement("div");
        var cardTitle = document.createElement("h3");
        var iconEl = document.createElement("img");
        var ul = document.createElement("ul");
        var liTemp = document.createElement("li");
        var liWind = document.createElement("li");
        var liHumid = document.createElement("li");

        // Setting classes and styling
        divCard.setAttribute("class", "card col-12 col-md-2 bg-dark-subtle");
        divCardBody.setAttribute("class", "card-body");
        cardTitle.setAttribute("class", "card-title");
        iconEl.setAttribute("class", "card-subtitle");
        ul.setAttribute("class", "list-group list-group-flush");
        liTemp.setAttribute("class", "list-group-item temp");
        liWind.setAttribute("class", "list-group-item wind");
        liHumid.setAttribute("class", "list-group-item humidity");

        // Setting text content
        cardTitle.textContent = formattedDate;
        iconEl.setAttribute("src", iconLink);
        liTemp.textContent = "Temp " + temp + "F";
        liWind.textContent = "Wind " + wind + "mph";
        liHumid.textContent = "Humidity " + humidity + "%";

        container.appendChild(divCard);
        divCard.appendChild(divCardBody);
        divCardBody.appendChild(cardTitle);
        divCardBody.appendChild(iconEl);
        divCardBody.appendChild(ul);
        ul.appendChild(liTemp);
        ul.appendChild(liWind);
        ul.appendChild(liHumid);
      }
      return;
    });
}

function list() {
  var listCity = document.createElement("button");
  listCity.textContent = searchBox.value;
  if (!row1.children[1]) {
    cityList.setAttribute(
      "style",
      "list-style: none; padding-left: 0; margin-top: 1rem;"
    );
    row1.appendChild(cityListContainer);
    cityListContainer.appendChild(cityList);
  }
  listCity.setAttribute("class", "border border-dark-subtle mt-2 list-button");
  cityList.appendChild(listCity);
  // Clears search term
  searchBox.value = "";
}

// Listens for form submit, fetches current day URL and 5 day forecast URL
form.addEventListener("submit", function (event) {
  event.preventDefault();
  // Clears any existing forecast
  container.innerHTML = "";
  Promise.all([current(), forecast()]).then(() => list());

});

row1.addEventListener("click", function(event) {
  var element = event.target;
  if (element.matches(".list-button")) {
    container.innerHTML = "";
    searchBox.value = element.textContent;
    console.log(searchBox.value);
    current();
    forecast();
  }
})