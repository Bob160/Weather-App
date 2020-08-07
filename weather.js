// Select elements
let notificationElement = document.querySelector(".notification");
let iconElement = document.querySelector(".weather-icon img");
let tempElement = document.querySelector(".temperature-value p");
let descElement = document.querySelector(".temperature-description p");
let locationElement = document.querySelector(".location p");

// App Data
const weather = {};

weather.temperature = {
    unit: "celsius",
}

// API Key
const key = "d495a8a8a2b74ed498b212818200205";

// User location
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser does not support Geolocation.</p>";
}

// Set user position
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

// Show error message when there is no geolocation service
function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Get Weather from API
function getWeather(latitude, longitude) {
    let api = `http://api.weatherapi.com/v1/current.json?key=d495a8a8a2b74ed498b212818200205&q=Abuja`;

    fetch(api)
        .then(function (response) {
            let data = response.json();
            return data;
        })
        .then(function (data) {
            weather.temperature.value = Math.floor(data.current.temp_c);
            weather.description = data.current.condition.text;
            weather.iconId = data.current.condition.icon;
            weather.city = data.location.name;
            weather.country = data.location.country;
        })
        .then(function () {
            displayWeather();

        }); 
}

// Display Weather data
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}"`;

    tempElement.innerHTML = `${weather.temperature.value}<sup>o</sup><span>C</span>`;

    descElement.innerHTML = weather.description;

    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Display temperature in celsius or fahrenheit (temperature conversion)
function celsiusToFahrenheit(temperature) {
    return (temperature * 9 / 5) + 32;
}

// To convert temperature from Celsius to Fahrenheit
tempElement.addEventListener("click", function () {
    if (weather.temperature.unit === "undefined") return;

    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        tempElement.innerHTML = `${fahrenheit}<sup>o</sup><span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    } else {
        tempElement.innerHTML = `${weather.temperature.value}<sup>o</sup><span>C</span>`;
        weather.temperature.unit = "celsius";
    }


});













