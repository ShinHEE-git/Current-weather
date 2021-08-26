navigator.geolocation.getCurrentPosition(successGeo, errorGeo);

function successGeo(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  getWeatherApi(latitude, longitude);
}

function errorGeo() {
  alert("I can't find you!!");
  const weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.src = "img/no-internet.png";
}

function getWeatherApi(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=066ec22e4f51a88fc576747e6e3d72c7&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      changePage();
      paintText(data);
    });
}

function changePage() {
  const weatherPage = document.querySelector(".weather-page");
  weatherPage.classList.remove("hidden");
  weatherPage.classList.add("flex");
  const loadingPage = document.querySelector(".loading-page");
  loadingPage.classList.add("hidden");
}

function paintText(data) {
  document.querySelector(".location-name").innerText = data.name;
  document.querySelector(".weather-text").innerText = data.weather[0].main;
  document.querySelector(".temp").innerText = `${data.main.temp}'C`;
  document.querySelector(
    ".temp-feel"
  ).innerText = `체감온도: ${data.main.feels_like}`;
  document.querySelector(
    ".humidity"
  ).innerText = `습도: ${data.main.humidity}%`;
  document.querySelector(
    ".temp-minmax span:first-child"
  ).innerText = `최고온도: ${data.main.temp_max}`;
  document.querySelector(
    ".temp-minmax span:last-child"
  ).innerText = `최저온도: ${data.main.temp_min}`;

  const weatherName = data.weather[0].main;
  const weatherId = data.weather[0].id;
  paintWeatherIcon(weatherName, weatherId);
}

function paintWeatherIcon(weatherName, weatherId) {
  const weatherCode = Math.floor(weatherId / 100);

  const weatherIcon = document.querySelector(".weather-icon");

  //weatherCode의 경우 Math.floor를 할 경우 clear와 clouds날씨가 구별이 되지 않아 이름으로 구별시킴
  //https://openweathermap.org/weather-conditions
  if (weatherName === "Clear") {
    weatherIcon.src = "img/clear-sky.png";
  } else if (weatherCode === 8) {
    weatherIcon.src = "img/clouds.png";
  } else if (weatherCode === 7) {
    weatherIcon.src = "img/few-clouds.png";
  } else if (weatherCode === 6) {
    weatherIcon.src = "img/snow.png";
  } else if (weatherCode === 5 || weatherCode === 3) {
    weatherIcon.src = "img/rain.png";
  } else {
    weatherIcon.src = "img/thunderstorm.png";
  }
}
