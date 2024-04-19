import axios from 'axios';

export default async function fetchForest() {
    try {
        const country = localStorage.getItem('selectedCountry');
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${country}&units=metric&appid=5b73eb27d5f116481c4f845a5ff496bc`,
        );
        const forecastData = [];
        response.data.list.forEach((item) => {
            const forecastItem = {
                dt_txt: item.dt_txt,
                icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
                low: item.main.temp_min,
                high: item.main.temp_max,
                main: item.weather[0].main,
                description: item.weather[0].description,
            };
            forecastData.push(forecastItem);
        });
        return { country: country, forecast: forecastData };
    } catch (error) {
        console.error('Error fetching forest:', error);
        throw error;
    }
}
