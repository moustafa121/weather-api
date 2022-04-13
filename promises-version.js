const APIKEY = "be610ea4a2ff4e677005f7ccc095fd72";

const URL = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`;

let promise = fetch(URL("tripoli"));
promise
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
