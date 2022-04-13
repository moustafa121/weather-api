const APIKEY = "be610ea4a2ff4e677005f7ccc095fd72";

const URL = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;

const iconURL = (id) => `http://openweathermap.org/img/wn/${id}.png`;

const cityEl = document.getElementById("location");
const outputEl = document.getElementById("output");
const formEl = document.getElementById("form");
const icons = document.querySelectorAll(".img");

formEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (cityEl.value) {
    const data = await getWeather(cityEl.value).catch(() => {
      //any error
      outputEl.innerText = "incorrect city\nor no connection";
      icons.forEach((element) => {
        element.src = "";
      });
    });
    if (data) {
      //everything is good
      outputEl.innerText = (data.tempinK - 273.15).toFixed() + "°C";
      icons.forEach((element) => {
        element.src = iconURL(data.iconID);
      });
    }
  } else {
    //empty textbox
    outputEl.innerText = "No given information";
    icons.forEach((element) => {
      element.src = "";
    });
  }
});

async function getWeather(city) {
  const response = await fetch(URL(city));
  const dataWeather = await response.json();
  return {
    tempinK: dataWeather.main.temp,
    iconID: dataWeather.weather[0].icon,
  };
}
