import React, { useEffect, useState } from 'react';
import anychart from 'anychart';
import fetchForecast from '../utils/fetchForecast';

const Dashboard = () => {
    const [forecastData, setForecastData] = useState([]);
    const [countryName, setCountryName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { country, forecast } = await fetchForecast(); // Получаем объект с именем страны и прогнозом погоды
                setForecastData(forecast); // Устанавливаем только прогноз погоды в состояние

                setCountryName(country); // Устанавливаем имя страны в состояние
            } catch (error) {
                console.error('Error fetching forecast:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (forecastData.length === 0) return;

        // Используем Set для гарантированной уникальности дат
        const uniqueDates = new Set(
            forecastData.map((item) => item.dt_txt.split(' ')[0]),
        );

        // create a data set
        var dataSet = anychart.data.set(
            forecastData.map((item) => [item.dt_txt, item.high]),
        );
        console.log(dataSet);

        // create a line chart
        var chart = anychart.line();

        // create the series
        var series = chart.line(dataSet);
        // var dataSet = anychart.data.set(
        //     forecastData.map((item) => [
        //         anychart.format.dateTime(item.dt_txt, 'dd.MM.yyyy HH:mm'),
        //         item.high,
        //     ]),
        // );

        // series.name('Temperature');

        // add a legend
        // chart.legend().enabled(true);

        // add a title
        chart.title(countryName);

        // name the axes
        var xAxis = chart.xAxis();
        // xAxis.title('Date');
        xAxis.staggerMode(true); // Allows staggered display of labels
        xAxis.staggerLines(2); // Number of lines to stagger labels

        // Форматируем метки оси X, чтобы дни отображались только один раз
        var xAxis = chart.xAxis();
        xAxis.labels().enabled(true); // Включаем отображение меток оси X
        xAxis.labels().format(function () {
            const date = this.value.split(' ')[0]; // Разделение значения на дату и время и выбор только даты
            if (uniqueDates.has(date)) {
                uniqueDates.delete(date);
                return anychart.format.dateTime(
                    new Date(this.value),
                    'dd.MM.yyyy',
                ); // Форматирование даты с помощью объекта Date
            } else {
                return ''; // Пустая строка для случаев, когда дата уже была использована
            }
        });

        // var yAxis = chart.yAxis();
        // yAxis.title('Temperature (°C)');
        chart.yGrid().enabled(true); // Enable Y axis grid lines

        // customize the series markers
        series.hovered().markers().enabled(true).type('circle').size(4);

        // turn on crosshairs and remove the y hair
        chart.crosshair().enabled(true).yStroke(null).yLabel(false);

        // change the tooltip position
        chart.tooltip().positionMode('point');

        // Используем HTML для подсказки и задаем пользовательский формат
        // Используем HTML для подсказки и задаем пользовательский формат
        chart.tooltip().useHtml(true);

        chart
            .tooltip()
            .position('right')
            .anchor('left-center')
            .offsetX(5)
            .offsetY(5);

        // set the background color for the chart
        chart.background().fill('#282c34');

        // specify where to display the chart
        chart.container('container');

        // Remove .anychart-credits element
        var creditsElement = document.querySelector('.anychart-credits');
        if (creditsElement) {
            creditsElement.parentNode.removeChild(creditsElement);
        }

        // draw the resulting chart
        chart.draw();
        // console.log(chart);

        // Clean up AnyChart resources when component unmounts
        return () => {
            chart.dispose();
        };
    }, [forecastData]); // Re-render the chart when forecastData changes

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
