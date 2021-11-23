const axios = require('axios');
const utils = require('../shared/utils');

function weatherForecastController(apiKey) {
  const getWeatherOrForecastByLocationId = async (req, res) => {
    const params = {
      appid: apiKey,
      id: req.params.locationID,
      units: 'metric',
      lat: req.params.lat,
      long: req.params.long,
    };

    let weatherOrForecast;
    switch (req.params.weatherOrForecast.toLowerCase()) {
      case 'weather':
        weatherOrForecast = 'weather';
        break;
      case 'forecast':
        weatherOrForecast = 'forecast';
        break;
      default:
        weatherOrForecast = 'weather';
    }

    const url = `https://api.openweathermap.org/data/2.5/${weatherOrForecast}`;

    console.log(
      `Get ${weatherOrForecast} of location : ${req.params.locationID}`
    );

    try {
      const result = await axios.get(url, { params });
      const formattedData = formatWeatherResponse(result.data);
      res.json(formattedData);
      console.log(' Call in success');
    } catch (err) {
      res.status(404).send(
        `Ressources not found, can't find any ${weatherOrForecast} data for the location : ${req.params.locationID}`
      );
      console.log(` Call in error : ${err}`);
    }
  };

  return { getWeatherOrForecastByLocationId };
}
function formatWeatherResponse(responseData) {
  const { id, name, sys, weather, wind, main } = responseData;
  const country = utils.getFullCountryName(sys.country);
  const { temp, humidity } = { main };
  const formattedTemperature = { temp, humidity };
  const formattedWeather = { id: weather[0].id, icon: weather[0].icon };
  const formattedObj = { id, name, country, weather: formattedWeather, wind };
  return formattedObj;
}

module.exports = weatherForecastController;
