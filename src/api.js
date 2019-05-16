// Dark Sky Weather Variables

const locLat = 42.3601;
const locLong = -71.0589;
const dsKey = "0855dbea6693ffc4b1f19410ee644529";
const dsURL = "https://api.darksky.net/forecast/";
const cors = "https://cors-anywhere.herokuapp.com/";
const dsAPIRequest = cors + dsURL + dsKey + "/" + locLat + "," + locLong;

module.exports = {
    getWeatherData: () => {
        // Fetch Weather Data using Dark Sky API
        return fetch(dsAPIRequest)
            .then((weatherData) => weatherData.json())
    }
};