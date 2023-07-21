// Global Variables declaration
var weatherAPIKey = "3d215b75bc3413dadd5da1309097e41b";
var cityList = [];
var currentCity = {
  "name": "Sydney",
  "local_names": {
      "is": "Sydney",
      "ko": "시드니",
      "ja": "シドニー",
      "mi": "Poihākena",
      "es": "Sídney",
      "sv": "Sydney",
      "kn": "ಸಿಡ್ಣಿ",
      "sr": "Сиднеј",
      "oc": "Sydney",
      "mk": "Сиднеј",
      "he": "סידני",
      "be": "Сіднэй",
      "zh": "悉尼",
      "hi": "सिड्णि",
      "pl": "Sydney",
      "fr": "Sydney",
      "de": "Sydney",
      "lt": "Sidnėjus",
      "eo": "Sidnejo",
      "mr": "सिडनी",
      "ru": "Сидней",
      "en": "Sydney",
      "ar": "سيدني",
      "uk": "Сідней"
  },
  "lat": -33.8698439,
  "lon": 151.2082848,
  "country": "AU",
  "state": "New South Wales"
};

const searchButton = document.getElementById("searchButton");
const searchResult = document.getElementById("searchResult");
const searchHeader = document.getElementById("searchHeader");
// Event Listener
searchButton.addEventListener("click", getGeocode);


// Search action code
function getGeocode() {
  const cityName = document.getElementById('searchBox').value;
  var stateCode = "";
  var countryCode = "";
  var queryURL = "https://api.openweathermap.org/geo/1.0/direct?" + "q={" + cityName + "},{" + stateCode + "},{" + countryCode + "}&limit=5" + "&appid=" + weatherAPIKey;

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

// Return Search List and get the City Geocode
function searchList(cityQuery) {
  searchResult.replaceChildren();

  for (let index = 0; index < cityQuery.length; index++) {
    const element = cityQuery[index];
    var li = document.createElement("li");
    li.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-3", "rounded", "m-1");
    searchResult.appendChild(li);
    li.textContent = element.name + ", " + element.state + ", " + element.country;
    li.addEventListener("click", function(){
      // Add the city to the History List
      listUpdate(element);
      getWeather(element);
      // Hide Search elements
      searchResult.replaceChildren();
    });
  }}

function listUpdate(newCity) {
  if (!cityList) {
    cityList = [newCity];
  } else {
    cityList.push(newCity);
  }
  cityHistory.replaceChildren();
  cityList = cityList.filter((value, index, self) => index === self.findIndex(
      (t) => (t.name === value.name && t.lat === value.lat && t.lon === value.lon)))
    for (let index = 0; index < cityList.length; index++) {
      const element = cityList[index];
      var li = document.createElement("li");
      li.classList.add("bg-blue-500", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "px-3", "rounded", "m-1");
      cityHistory.appendChild(li);
      li.textContent = element.name + ", " + element.state + ", " + element.country;    
      li.addEventListener("click", function(){
        getWeather(element)})
    }
  saveHistory();
  }

// Get the weather
function getWeather(element) {
  let lat = element.lat
  let lon = element.lon
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
        getForecast(cityForecast, element);
      }})
    .catch(function (error) {
      console.error(error);
    });
}

function getForecast(forecast, city) {
  var forecastList = [];
  var forecastDays = [];
  // For loop to iterate through forecasts and reformat the data
  for (let index = 0; index < forecast.list.length; index++) {
    const element = forecast.list[index];
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
  // For loop to iterate through forecasts and filter only useful info
  for (let index = 1; index < forecastList.length; index++) {
    const element = forecastList[index];
    if (element.hour === "13:00:00" | "12:00:00" | "11:00:00") {
      forecastDays.push(element);
  }}

  if (forecastDays.length < 5) {
    forecastDays.push(forecastList[forecastList.length-1]);
    console.log(forecastDays);
  }

  $('#currentCity').text(city.name);
  $('#currentWeather').text(forecast.list[0].weather[0].main);
  $('#currentDescription').text(forecast.list[0].weather[0].description);
  $('#currentTemperature').text(forecast.list[0].main.temp + "°C");
  $('#currentWind').text(forecast.list[0].wind.speed + "m/s");
  $('#currentHumidity').text("Humidity: " + forecast.list[0].main.humidity + "%");
  $('#currentWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + forecast.list[0].weather[0].icon +'@2x.png');

  $('#dayOne').text(forecastDays[0].date);
  $('#oneWeather').text(forecastDays[0].weather);
  $('#oneDescription').text(forecastDays[0].detail);
  $('#oneTemperature').text(forecastDays[0].temp + "°C");
  $('#oneWind').text(forecast.list[0].wind.speed + "m/s");
  $('#oneHumidity').text("Humidity: " + forecastDays[0].humidity + "%");
  $('#oneWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + forecastDays[0].icon +'@2x.png');

  $('#dayTwo').text(forecastDays[1].date);
  $('#twoWeather').text(forecastDays[1].weather);
  $('#twoDescription').text(forecastDays[1].detail);
  $('#twoTemperature').text(forecastDays[1].temp + "°C");
  $('#twoWind').text(forecast.list[0].wind.speed + "m/s");
  $('#twoHumidity').text("Humidity: " + forecastDays[1].humidity + "%");
  $('#twoWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + forecastDays[1].icon +'@2x.png');

  $('#dayThree').text(forecastDays[2].date);
  $('#threeWeather').text(forecastDays[2].weather);
  $('#threeDescription').text(forecastDays[2].detail);
  $('#threeTemperature').text(forecastDays[2].temp + "°C");
  $('#threeWind').text(forecast.list[0].wind.speed + "m/s");
  $('#threeHumidity').text("Humidity: " + forecastDays[2].humidity + "%");
  $('#threeWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + forecastDays[2].icon +'@2x.png');

  $('#dayFour').text(forecastDays[3].date);
  $('#fourWeather').text(forecastDays[3].weather);
  $('#fourDescription').text(forecastDays[3].detail);
  $('#fourTemperature').text(forecastDays[3].temp + "°C");
  $('#fourWind').text(forecast.list[0].wind.speed + "m/s");
  $('#fourHumidity').text(forecastDays[3].humidity + "%");
  $('#fourWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + forecastDays[3].icon +'@2x.png');

  $('#dayFive').text(forecastDays[4].date);
  $('#fiveWeather').text(forecastDays[4].weather);
  $('#fiveDescription').text(forecastDays[4].detail);
  $('#fiveTemperature').text(forecastDays[4].temp + "°C");
  $('#fiveWind').text(forecast.list[0].wind.speed + "m/s");
  $('#fiveHumidity').text("Humidity: " + forecastDays[4].humidity + "%");
  $('#fiveWeatherIcon').attr('src', 'https://openweathermap.org/img/wn/' + forecastDays[4].icon +'@2x.png');
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

// Save and Read Local Storage
function saveHistory(){
  localStorage.setItem("cityList", JSON.stringify(cityList));
};
function readHistory(element){
  cityList = JSON.parse(localStorage.getItem("cityList")) 
}

// Initialise page
function init(){
  readHistory();
  if (cityList) {
    // History data exists
    listUpdate(cityList[0]);
    getWeather(cityList[0]);
  } 
  else {
    // History data does not exist
    getWeather(currentCity)
  }
  
}
init();