const express = require('express');
const weatherForecastController = require('../controllers/weatherForecastController');

function routes(listOfCountries, rawDataGroupByCountry) {
  const weatherForecastRouter = express.Router();
  const apiKey = 'c4c8cb4635149c853f5fe04023add8c5';
  const controller = weatherForecastController(
    apiKey,
    listOfCountries,
    rawDataGroupByCountry
  );
  // Route for countries
  weatherForecastRouter.route('/countries').get(controller.getCountries);

  // Route for cities of one country
  weatherForecastRouter
    .route('/countries/:countryUnicode')
    .get(controller.getCitiesByCountry);

  // Route for current and forecast weather of one country or one city
  weatherForecastRouter
    .route('/:weatherOrForecast/:locationID')
    .get(controller.getWeatherOrForecastByLocationId);
  return weatherForecastRouter;
}

module.exports = routes;
