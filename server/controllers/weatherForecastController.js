const axios = require('axios');
const utils = require('../shared/utils');

function weatherForecastController(apiKey) {
  const getWeatherOrForecastByLocationId = async (req, res) => {
    console.log('controller', req.headers);

    const params = {
      appid: apiKey,
      uniots: 'metric',
      lat: req.headers.lat,
      lon: req.headers.lon,
      exclude: 'minutely,hourly,alerts',
    };

    const url = 'https://api.openweathermap.org/data/2.5/onecall';

    console.log(
      `Get weather and forecast of location : ${req.params.locationID}`
    );
    console.log(params);
    try {
      const result = await axios.get(url, { params });
      // const formattedData = formatWeatherResponse(result.data);
      // res.json(formattedData);
      // console.log(result);
      res.json(result.data);
      console.log(' Call in success');
    } catch (err) {
      res
        .status(404)
        .send(
          `Ressources not found, can't find any weather and forecast data for the location : ${req.params.locationID}`
        );
      console.log(` Call in error : ${err}`);
    }
  };

  return { getWeatherOrForecastByLocationId };
}
function formatWeatherResponse(responseData) {
  return formattedObj;
}

module.exports = weatherForecastController;
