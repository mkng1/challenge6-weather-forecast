// Autocorrect.js
import cityList from './city.list.json';

const dateEl =$('#date');
const weatherIcoEl =$('#weather-icon');
const weatherStaEl =$('#weather-status');
const temperatureEl =$('#temperature');
const cityEl =$('#city')
const driveTimeEl =$('#drive-time');
const pubTranTimeEl =$('#public-transport-time');
const walkTimeEl =$('#walk-time');
const shareTimeEl =$('#share-time');
const cycleTimeEl =$('#cycle-time');

//Dayjs Code
var today = dayjs();

weatherStaEl.text('Check Weather at your Destination')

function getDate() {
  dateEl.text(today.format('dddd, MMMM D'))
}





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
  initMap();
  getDate();
  readLocation();
  console.log(cityList);
};

init();



// Autocorrect.js
const autoCompleteJS = new autoComplete({
  selector: "#autoComplete",
  placeHolder: "Search for Food...",
  data: {
      src: ["Sauce - Thousand Island", "Wild Boar - Tenderloin", "Goat - Whole Cut"],
      cache: true,
  },
  resultsList: {
      element: (list, data) => {
          if (!data.results.length) {
              // Create "No Results" message element
              const message = document.createElement("div");
              // Add class to the created element
              message.setAttribute("class", "no_result");
              // Add message text content
              message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
              // Append message element to the results list
              list.prepend(message);
          }
      },
      noResults: true,
  },
  resultItem: {
      highlight: true
  },
  events: {
      input: {
          selection: (event) => {
              const selection = event.detail.selection.value;
              autoCompleteJS.input.value = selection;
          }
      }
  }
});

//openweather api

function getWeather(lat, lon) {
  var weatherAPIKey = "1594fc5af48b8b63f31969ab3016de9e";
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