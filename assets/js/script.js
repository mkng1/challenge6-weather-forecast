import cityList from "./city.list.json" assert { type: 'json' };

const dateEl =$('#date');







// //Dayjs Code
// var today = dayjs();
// weatherStaEl.text('Check Weather at your Destination')
// function getDate() {
//   dateEl.text(today.format('dddd, MMMM D'))
// }


// Save and Read Start and Destination locations
function saveLocation(){
  localStorage.setItem("start", JSON.stringify(start));
  localStorage.setItem("dest", JSON.stringify(dest));
}
function readLocation(){
  start = JSON.parse(localStorage.getItem("start"));
  dest = JSON.parse(localStorage.getItem("dest"));
  document.getElementById('start').value = start;
  document.getElementById('dest').value = dest;
}


// On page Load, initialise these codes
function init(){
  readLocation();
};

init();

"http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}"+"&appid=dc5f6b4acef92af7d61cac5f8edf5f09"

//openweather api

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

