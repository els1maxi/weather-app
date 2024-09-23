function fillLocation(name, coord) {
    const { lon, lat } = coord;
    document.getElementById('city-name').textContent = name;
    document.getElementById('longitude').textContent = lon;
    document.getElementById('latitude').textContent = lat;
}

function fillTemperature(weather, main) {
    const { main: weatherTitle, description, icon } = weather[0];
    const { temp, feels_like } = main;

    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.getElementById('weather-main').textContent = weatherTitle;
    document.getElementById('weather-description').textContent = description;
    document.getElementById('temp-current').textContent = temp;
    document.getElementById('temp-current-feelings').textContent = feels_like;
}

function fillWindAndHumidity(main, wind) {
    document.getElementById('wind-speed').textContent = wind.speed;
    document.getElementById('humidity').textContent = main.humidity;
}

function showModalParameters(main, visibility) {
    const { pressure, temp_max, temp_min } = main;

    document.getElementById('pressure').textContent = pressure;
    document.getElementById('visibility').textContent = visibility;
    document.getElementById('temp-max').textContent = temp_max;
    document.getElementById('temp-min').textContent = temp_min;
}

function formatTime(time, timezoneOffset) {
    let totalSeconds = time + timezoneOffset;
    const hours = Math.floor((totalSeconds / 3600) % 24).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds / 60) % 60).toString().padStart(2, '0');
    const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function getSunriseTime(sys, timezone) {
    const { sunrise } = sys;
    const sunriseTime = formatTime(sunrise, timezone);
    document.getElementById('sunrise').textContent = sunriseTime;
}

function getSunsetTime(sys, timezone) {
    const { sunset } = sys;
    const sunsetTime = formatTime(sunset, timezone);
    document.getElementById('sunset').textContent = sunsetTime;
}

function setBackgroundUrl(urls) {
    document.body.style.backgroundImage = `url(${urls.full})`;
}

export function showDetails() {
    document.querySelector('.weather-info').classList.remove('hidden');
}

export function fillDetails(response) {
    const {
        cod, message, name, coord, weather, main, visibility, wind, sys, timezone
    } = response;

    if (cod === "404") {
        alert('Please enter an existing city', message);
        return false;
    }

    fillLocation(name, coord);
    fillTemperature(weather, main);
    fillWindAndHumidity(main, wind);
    showModalParameters(main, visibility);
    getSunriseTime(sys, timezone);
    getSunsetTime(sys, timezone);
    showDetails();
}

export function getUnsplash(result) {
    const { errors, urls } = result;

    if (errors === "404") {
        alert('Please enter an existing city');
        return false;
    }

    setBackgroundUrl(urls);
}
