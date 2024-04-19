import React, { useEffect, useState } from 'react';
import anychart from 'anychart';
import fetchForecast from '../utils/fetchForecast';

const Dashboard = () => {
    const [forecastData, setForecastData] = useState([]);
    const [countryName, setCountryName] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedInfo = await fetchForecast();
                setForecastData(fetchedInfo.forecast);
                setCountryName(fetchedInfo.country);
                setWeatherData(fetchedInfo);
            } catch (error) {
                console.error('Error fetching forecast:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (forecastData.length === 0 || !weatherData) return;

        function formatDate(inputDate) {
            const date = new Date(inputDate);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            return `${year}-${month < 10 ? '0' : ''}${month}-${
                day < 10 ? '0' : ''
            }${day} ${hours < 10 ? '0' : ''}${hours}:${
                minutes < 10 ? '0' : ''
            }${minutes}`;
        }

        var dataSet = anychart.data.set(
            forecastData.map((item) => [formatDate(item.dt_txt), item.high]),
        );

        var chart = anychart.line();
        var series = chart.line(dataSet);

        chart.title(countryName);

        var xAxis = chart.xAxis();
        xAxis.staggerMode(true);
        xAxis.staggerLines(2);
        xAxis.labels().enabled(true);
        let usedDates = [];

        xAxis.labels().format(function () {
            const date = this.value.split(' ')[0];

            if (!usedDates.includes(date)) {
                usedDates.push(date);
                return date;
            } else {
                return '';
            }
        });
        chart.yGrid().enabled(true);
        series.hovered().markers().enabled(true).type('circle').size(4);

        chart.crosshair().enabled(true).yStroke(null).yLabel(false);

        chart.tooltip().positionMode('point');
        chart.tooltip().useHtml(true);
        chart
            .tooltip()
            .position('right')
            .anchor('left-center')
            .offsetX(5)
            .offsetY(5);
        chart.background().fill('#282c34');
        chart.container('container');

        chart.tooltip().format(function () {
            let tooltipContent = `<div style="background-color: white; padding: 10px; overflow: hidden; text-align: center; color:black; width:170px">`;
            const date = this.x.split(' ')[0];
            const temperature = this.value;

            if (weatherData && weatherData.forecast) {
                const forecastItem = weatherData.forecast.find((item) =>
                    item.dt_txt.includes(date),
                );

                if (forecastItem) {
                    tooltipContent += `<div style="font-size: 16px;">Tem. ${temperature}°C</div>`;
                    tooltipContent += `<img style="height:120px; width:auto" src="${forecastItem.icon}" alt="Weather Icon">`;
                    tooltipContent += `<div style="font-size: 14px;">${forecastItem.main}</div>`;
                    tooltipContent += `<div style="font-size: 14px;">${forecastItem.description}</div>`;
                }
            }
            tooltipContent += `</div>`;
            return tooltipContent;
        });

        var creditsElement = document.querySelector('.anychart-credits');
        if (creditsElement) {
            creditsElement.parentNode.removeChild(creditsElement);
        }

        xAxis.labels().fontColor('white');
        var yAxis = chart.yAxis();
        yAxis.labels().fontColor('white');
        chart.title().fontColor('white').fontSize(20);

        chart.draw();

        return () => {
            chart.dispose();
        };
    }, [forecastData, countryName, weatherData]);

    return (
        <div
            id='container'
            style={{
                width: '100%',
                height: '500px',
                backgroundColor: '#282c34',
            }}
        ></div>
    );
};

export default Dashboard;
