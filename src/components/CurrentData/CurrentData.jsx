import React, { useEffect, useState } from 'react';
import fetchCurrentWeather from '../../utils/fetchCurrentWeather';
import styles from './CurrentData.module.css';

const CurrentData = ({ selectedCountry }) => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const weatherData = await fetchCurrentWeather(selectedCountry);
                setWeather(weatherData);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchData();
    }, [selectedCountry]);

    if (!selectedCountry || !weather) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h1>{weather.temp} ℃</h1>
            <div>
                <p>{weather.main}</p>
                <p>{weather.description}</p>
                <img src={weather.icon} alt='weather icon' />
                <p>{weather.name}</p>
                <p>{weather.feels}</p>
            </div>
            <div className={styles.weather}>
                <span>
                    <p>High</p>
                    {weather.high} ℃
                </span>
                <span>
                    <p>Low</p>
                    {weather.low} ℃
                </span>
            </div>
        </div>
    );
};

export default CurrentData;
