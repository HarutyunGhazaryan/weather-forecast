import axios from 'axios';

export default async function fetchCurrentWeather() {
    try {
        const country = localStorage.getItem('selectedCountry');
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=5b73eb27d5f116481c4f845a5ff496bc`,
        );
        const currentData = {};
        currentData['temp'] = response.data.main.temp;
        currentData['main'] = response.data.weather[0].main;
        currentData['description'] = response.data.weather[0].description;
        currentData[
            'icon'
        ] = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
        currentData['name'] = response.data.name;
        currentData['feels'] = 'Feels ' + response.data.main.feels_like;
        currentData['low'] = response.data.main.temp_min;
        currentData['high'] = +response.data.main.temp_max;
        return currentData;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
