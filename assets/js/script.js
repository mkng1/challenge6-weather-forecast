// Global Variables declaration
const cityList = [];
const searchButton = document.getElementById("searchButton");
const searchResult = document.getElementById("searchResult");

// Event Listener
searchButton.addEventListener("click", getGeocode);


// Search action code
function getGeocode() {
  const cityName = document.getElementById('searchBox').value;
  var stateCode = "";
  var countryCode = "";
  var weatherAPIKey = "dc5f6b4acef92af7d61cac5f8edf5f09";
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
        console.log(cityQuery);
        searchList(cityQuery);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

// List the cities and get the Geocode
function searchList(cityQuery) {
for (let index = 0; index < cityQuery.length; index++) {
  const element = cityQuery[index];
  var li = document.createElement("li");
  searchResult.appendChild(li);
  li.textContent = element.name + ", " + element.state + ", " + element.country;
  li.addEventListener("click", function(){
    getWeather(element.lat, element.lon);
  });
}
}

// Get the 
function getWeather(lat, lon) {
  var weatherAPIKey = "dc5f6b4acef92af7d61cac5f8edf5f09";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lon + "&appid=" + weatherAPIKey + "&units=metric";

  fetch(queryURL)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })
    .then(function (locRes) {

      if (!locRes) {
        console.log('No results found!');
      } else {
        $('#weather-status').text(locRes.weather[0].description);
        $('#temperature').text(locRes.main.temp + "°C");
        $('#weather-icon').attr('src', 'https://openweathermap.org/img/wn/' + locRes.weather[0].icon +'@2x.png')  
      }
    })
    .catch(function (error) {
      console.error(error);
    });

}



// Save and Read Start and Destination locations
function saveLocation(){
  localStorage.setItem("cityList", JSON.stringify(cityList));
};
function readLocation(){
  cityList = JSON.parse(localStorage.getItem("cityList"));
};