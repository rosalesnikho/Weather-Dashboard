"use strict";

import Chart from 'chart.js';

const {getWeatherData} = require('./api.js');


// Global Chart Variables
const ctxSevenDayForecast = document.getElementsByClassName('seven_day_forecast');
const ctxTwentyFourHoursForecast = document.getElementsByClassName('twenty_four_hour_forecast');

//
let renderCurrentWeather = document.getElementById("todays_weather");

// Weather Currently
getWeatherData().then(function (weatherData) {
    console.log(weatherData);
    const currentWeather = weatherData.currently;
    let renderCurrentHTML =
        `<div class="weather_card current_weather box_shadow border_radius_2">
                <h5>CURRENTLY</h5>
                <h2 class="current_temp_heading">${currentWeather.temperature}</h2>
                <h5>FEELS LIKE</h5>
                <h5 class="feels_like_temp_heading">${currentWeather.apparentTemperature}</h5>
                <p class="current_summary">${currentWeather.summary}</p>
                <span>${currentWeather.precipProbability * 100}% chance of rain & ${currentWeather.humidity * 100} % humidity</span>
            </div>`;
        renderCurrentWeather.innerHTML = renderCurrentHTML;
    }
).catch((error) => {
    console.log(error);
});

// 7 Day forecast
getWeatherData().then(function (weatherData) {
    // Get 7 weather day information
    function sevenDayForecast(weather) {
        let sevenDayTemp = [];
        const temps = weather.daily.data;
        temps.forEach(function (temp) {
            let dailyTemp = [];
            dailyTemp = Math.round(temp.apparentTemperatureHigh)
            sevenDayTemp.push(dailyTemp);
        })
        return sevenDayTemp;
    }

    // Get 7 weather day timeline
    function sevenDayTime(currentWeatherTimeLine) {
        let sevenDayTime = [];
        let times = currentWeatherTimeLine.daily.data;
        times.forEach(function (time) {
            let t = [];
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
    let renderSevenDayWeather = new Chart(ctxSevenDayForecast, {

        type: 'line',
        data: {
            labels: sevenDayTimeLIne,
            datasets: [{
                label: '7 Day Temp High',
                data: sevenDayTemps,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(54, 162, 235, 0.3)',
                    'rgba(255, 206, 86, 0.3)',
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(153, 102, 255, 0.3)',
                    'rgba(255, 159, 64, 0.3)'
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

// Hourly
getWeatherData().then(function (weatherData) {
    // Get weather / temperature for the next 24 - 48 hours
    function gettwentyFourHourTemp(weatherData) {

        let twentyFourHourArr = [];
        const temps = weatherData.hourly.data;
        temps.forEach(function (data) {
            let tempArray = [];
            tempArray = data.temperature;
            twentyFourHourArr.push(tempArray)
        })
        return twentyFourHourArr;
    }

    function getTwentyFourHourLabels(weatherData) {
        let twentyFourHourArr = [];
        const label = weatherData.hourly.data;
        label.forEach(function (label) {
            let getLabel = [];
            getLabel = label.time;
            twentyFourHourArr.push(getLabel);
        })
        return twentyFourHourArr;
    }

    const twentyFourHourData = gettwentyFourHourTemp(weatherData);
    const twentyFourHourLabels = getTwentyFourHourLabels(weatherData);

    let renderTwentyFourHourTemps = new Chart(ctxTwentyFourHoursForecast, {

        type: 'bar',
        data: {
            labels: twentyFourHourLabels,
            datasets: [{
                label: '24 Hour Temp',
                data: twentyFourHourData,
                backgroundColor: 'rgba(30,174,219,0.3)',
                borderColor: 'rgba(30,174,219,1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        suggestedMin: 0,
                        suggestedMax: 90
                    }
                }]
            }
        }
    })
});