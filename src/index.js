"use strict";

const { getWeatherData } = require ('./api.js');


// Currently
getWeatherData().then(function(weather) {
  console.log(weather.currently)
    }
).catch((error) => {
  console.log(error);
});

// Daily
getWeatherData().then((weather) => {
  console.log(weather.daily)
  // console.log(weather)
});

// Hourly
getWeatherData().then((weather) => {
  console.log(weather.minutely)
  // console.log(weather)
});