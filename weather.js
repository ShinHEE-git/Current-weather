const locationText = document.querySelector(".location-name");
const weatherText = document.querySelector(".weather-text");
const weatherIcon = document.querySelector(".weather-icon");
const tempText = document.querySelector(".temperature");
const humidityText = document.querySelector(".humidity");
const tempMaxText = document.querySelector(".temp-minmax span:first-child");
const tempMinText = document.querySelector(".temp-minmax span:last-child");

navigator.geolocation.getCurrentPosition(successGeo, errorGeo);

function successGeo(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeatherApi(latitude, longitude);
}

function errorGeo() {
  alert("Can't find you. No information for you");
}

function getWeatherApi(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=066ec22e4f51a88fc576747e6e3d72c7&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      paintText(data);
    });
}
function paintText(data) {
  console.log(data.name);
  const locationName = data.name;
  const weather = data.weather[0].main;
  const temperature = data.main.temp;
  const humidity = data.main.humidity;
  const tempMax = data.main.temp_max;
  const tempMin = data.main.temp_min;

  locationText.innerText = locationName;
  weatherText.innerText = weather;
  tempText.innerText = `${temperature}'C`;
  humidityText.innerText = `습도: ${humidity}%`;
  tempMaxText.innerText = `최고온도: ${tempMax}`;
  tempMinText.innerText = `최저온도: ${tempMin}`;
}
