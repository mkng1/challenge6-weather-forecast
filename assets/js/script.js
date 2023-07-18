// Global Variables declaration
var weatherAPIKey = "3d215b75bc3413dadd5da1309097e41b";
let cityList;
let currentCity;
var forecastList = [];
var forecastDays = [];

const searchButton = document.getElementById("searchButton");
const searchResult = document.getElementById("searchResult");
const searchHeader = document.getElementById("searchHeader");
searchHeader.style.display = 'none'
// Event Listener
searchButton.addEventListener("click", getGeocode);


// Search action code
function getGeocode() {
  const cityName = document.getElementById('searchBox').value;
  var stateCode = "";
  var countryCode = "";
  var queryURL = "http://api.openweathermap.org/geo/1.0/direct?" + "q={" + cityName + "},{" + stateCode + "},{" + countryCode + "}&limit=5" + "&appid=" + weatherAPIKey;

  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (cityQuery) {
      if (!cityQuery) {
        console.log('No results found!');
      } else {
        searchList(cityQuery);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

// List the cities and get the Geocode
function searchList(cityQuery) {
  searchHeader.style.display = 'block'
  for (let index = 0; index < cityQuery.length; index++) {
    const element = cityQuery[index];
    var li = document.createElement("li");
    searchResult.appendChild(li);
    li.textContent = element.name + ", " + element.state + ", " + element.country;
    li.addEventListener("click", function(){
      // Get the weather
      getWeather(element.lat, element.lon);
      // Hide Search elements
      searchResult.replaceChildren();
      searchHeader.style.display = 'none'
      // Add to the saved cities
      cityList.push(element);
      listUpdate(element);
      currentCity = element;
    });
  }}


// Get the weather
function getWeather(lat, lon) {
  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=" + weatherAPIKey;
  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (cityForecast) {

      if (!cityForecast) {
        console.log('No results found!');
      } else {
        // For loop to iterate through forecasts and reformat the data
        for (let index = 0; index < cityForecast.list.length; index++) {
          const element = cityForecast.list[index];
          let forecastDate = dayjs.unix(element.dt).format("YYYY-MM-DD");
          let forecastHour = dayjs.unix(element.dt).format("HH:mm:ss");
          let forecastWeather = element.weather[0].main;
          let forecastDetail = element.weather[0].description;
          let forecastTemp = element.main.temp;
          let forecastHumidity = element.main.humidity;
          let forecastIcon = element.weather[0].icon;
          const obj = new Forecasts(forecastDate, forecastHour, forecastWeather, forecastDetail, forecastTemp, forecastHumidity, forecastIcon);
          forecastList.push(obj);
        }
        $('#currentCity').text(currentCity.name);
        $('#currentWeather').text(cityForecast.list[0].weather[0].main);
        $('#currentDescription').text(cityForecast.list[0].weather[0].description);
        $('#currentTemperature').text(cityForecast.list[0].main.temp);
        $('#currentHumidity').text(cityForecast.list[0].main.humidity);
        $('#currentWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + cityForecast.list[0].weather[0].icon +'@2x.png');

        // For loop to iterate through forecasts and filter only useful info
        for (let index = 1; index < forecastList.length; index++) {
          const element = forecastList[index];
          if (element.hour === "13:00:00" | "12:00:00") {
            forecastDays.push(element);
        }}
        if (forecastDays.length < 5) {
          forecastDays.push(forecastList[forecastList.length-1]);
          console.log(forecastDays);
        }
        $('#dayOne').text(forecastDays[0].date);
        $('#oneWeather').text(forecastDays[0].weather);
        $('#oneDescription').text(forecastDays[0].detail);
        $('#oneTemperature').text(forecastDays[0].temp);
        $('#oneHumidity').text(forecastDays[0].humidity);
        $('#oneWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + forecastDays[0].icon +'@2x.png');

        $('#dayTwo').text(forecastDays[1].date);
        $('#twoWeather').text(forecastDays[1].weather);
        $('#twoDescription').text(forecastDays[1].detail);
        $('#twoTemperature').text(forecastDays[1].temp);
        $('#twoHumidity').text(forecastDays[1].humidity);
        $('#twoWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + forecastDays[1].icon +'@2x.png');

        $('#dayThree').text(forecastDays[2].date);
        $('#threeWeather').text(forecastDays[2].weather);
        $('#threeDescription').text(forecastDays[2].detail);
        $('#threeTemperature').text(forecastDays[2].temp);
        $('#threeHumidity').text(forecastDays[2].humidity);
        $('#threeWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + forecastDays[2].icon +'@2x.png');

        $('#dayFour').text(forecastDays[3].date);
        $('#fourWeather').text(forecastDays[3].weather);
        $('#fourDescription').text(forecastDays[3].detail);
        $('#fourTemperature').text(forecastDays[3].temp);
        $('#fourHumidity').text(forecastDays[3].humidity);
        $('#fourWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + forecastDays[3].icon +'@2x.png');

        $('#dayFive').text(forecastDays[4].date);
        $('#fiveWeather').text(forecastDays[4].weather);
        $('#fiveDescription').text(forecastDays[4].detail);
        $('#fiveTemperature').text(forecastDays[4].temp);
        $('#fiveHumidity').text(forecastDays[4].humidity);
        $('#fiveWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + forecastDays[4].icon +'@2x.png');

      }})
    .catch(function (error) {
      console.error(error);
    });
}



function Forecasts(date, hour, weather, detail, temp, humidity, icon) { 
  this.date = date, 
  this.hour = hour,
  this.weather = weather,
  this.detail = detail,
  this.temp = temp,
  this.humidity = humidity,
  this.icon = icon
}



function listUpdate() {
  cityHistory.replaceChildren();
  if (!cityList) {} else {
  for (let index = 0; index < cityList.length; index++) {
    const element = cityList[index];
    var li = document.createElement("li");
    cityHistory.appendChild(li);
    li.textContent = element.name + ", " + element.state + ", " + element.country;    
    li.addEventListener("click", function(){
      // Get the weather
      getWeather(element.lat, element.lon)})
  }}
  saveHistory();
}

// Save and Read Local Storage
function saveHistory(){
  localStorage.setItem("cityList", JSON.stringify(cityList));
};
function readHistory(){
  let history = JSON.parse(localStorage.getItem("cityList"))
  if (!history) {} else {
  cityList = history;}
  listUpdate();
  currentCity = cityList[0];
  getWeather(currentCity.lat, currentCity.lon);
};

// Initialise page
function init(){
  readHistory();
}
init();