import { WEATHER_API_DOMAIN, UNSPLASH_API_DOMAIN } from './constants.js';
import { fillDetails, getUnsplash } from './showElements.js';

const getWeatherDetails = async (weatherUrl) => {
    try {
        const response = await fetch(weatherUrl);
        const data = await response.json();
        fillDetails(data);
    } catch (error) {
        console.error('Error fetching weather details:', error);
        alert('Something went wrong, please try again in a few minutes.');
    }
};

const getUnsplashPhoto = async (unsplashUrl) => {
    try {
        const response = await fetch(unsplashUrl);
        const data = await response.json();
        getUnsplash(data);
    } catch (error) {
        console.error('Error fetching Unsplash photo:', error);
        alert('Something went wrong, please try again in a few minutes.');
    }
};

const handleSubmit = (event) => {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    if (city && city.length > 0) {
        getWeatherDetails(`${WEATHER_API_DOMAIN}&q=${city}`);
        getUnsplashPhoto(`${UNSPLASH_API_DOMAIN}&query=${city}`);
    }
};

const weatherApp = () => {
    const form = document.getElementById('city-form');
    form.addEventListener('submit', handleSubmit);
};

weatherApp();
