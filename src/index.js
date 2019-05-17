"use strict";
import Chart from 'chart.js';

const {getWeatherData} = require('./api.js');


// Global Chart Variables
let ctx = document.getElementsByClassName('seven_day_forecast')

// Currently
getWeatherData().then(function (weather) {
        console.log(weather.currently);
    }
).catch((error) => {
    console.log(error);
});

// 7 Day forecast
getWeatherData().then(function (weatherData) {

    // Get 7 weather day information
    function sevenDayForecast(currentWeather) {
        let sevenDayTemp = [];
        const temps = currentWeather.daily.data;
        temps.forEach(function (temp) {
            let dailyTemp = [];
            dailyTemp = Math.round(temp.apparentTemperatureHigh)
            sevenDayTemp.push(dailyTemp);
        })
        return sevenDayTemp;
    }

    // Get 7 weather day timeline
    function sevenDayTime(currentWeatherTimeLine) {
        var sevenDayTime = [];
        var times = currentWeatherTimeLine.daily.data;
        times.forEach(function (time) {
            var t = [];
            t = new Date(time.time * 1000)
            time = t.getDay();
            sevenDayTime.push(time);
        })

        return sevenDayTime
    }

    let sevenDayTemps = sevenDayForecast(weatherData);
    let sevenDayTimeLIne = sevenDayTime(weatherData);

// Create an instance of Chart JS Graph
// Store 7 day forecast in sevenDayTemps variable

    let sevenDayWeather = new Chart(ctx, {

        type: 'line',
        data: {
            labels: sevenDayTimeLIne,
            datasets: [{
                label: '7 Day Temp High',
                data: sevenDayTemps,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 20,
                        suggestedMax: 110
                    }
                }]
            }
        }
    })
})
;

// Hourly
getWeatherData().then((weather) => {
    console.log(weather.minutely)
    // console.log(weather)
});