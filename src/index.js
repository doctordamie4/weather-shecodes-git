let now = new Date();
let hours = now.getHours();
let date = now.getDate();
let minutes = now.getMinutes();
if (minutes <10 ){
  minutes=`0 ${minutes}`;
}

let todaydate = document.querySelector ("#today-date");
let today = document.querySelector ("#today")
let days= ["Sunday","Monday","Tue","Wed","Thur","Fri","Sat","Sun"];
let day= days[now.getDay()];
todaydate.innerHTML= `${day}, ${hours}:${minutes}`;
today.innerHTML = `${day}`;

function showTemperature(response) {
  console.log(response.data);
    let humid = Math.round(response.data.main.humidity);
    let humidity =document.querySelector("#weather");
    humidity.innerHTML =`Humidity :${humid}%`;
    let wind = Math.round(response.data.wind.speed);
    let windy =document.querySelector("#weather-wind");
    windy.innerHTML =`Wind :${wind}km/h`;
    let describe = response.data.weather[0].description;
    let descript = document.querySelector("#description");
    descript.innerHTML =`${describe}`;
    let feelings = Math.round(response.data.main.feels_like);
    let feels = document.querySelector("#feel-like");
    feels.innerHTML =`${feelings}°c`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#grade");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML=`${temperature}`;
  let city = (response.data.name);
  let h1 = document.querySelector ("h1");
  h1.innerHTML = `${city}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute( 
    "src",
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }
  
  
  
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "1d4b68593b5ef58c6ebeb70b9aa9976d";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  
  
    axios.get(`${apiUrl}`).then(showTemperature);
  }
  
  function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
  let button = document.querySelector("#current-place");
  button.addEventListener("click", getCurrentPosition);

function search(city){
  let apiKey="1d4b68593b5ef58c6ebeb70b9aa9976d";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector ("#search-input");
  search(searchInput.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#grade");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML= Math.round(fahrenheitTemperature);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#grade");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenheit = document.querySelector("#fahrenheit-temp");
fahrenheit.addEventListener("click", displayFahrenheit);

let celsius = document.querySelector("#celsius-temp");
celsius.addEventListener("click", displayCelsius);

search("Lagos");