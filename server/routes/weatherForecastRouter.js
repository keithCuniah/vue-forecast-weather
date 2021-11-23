const express = require('express');
const weatherForecastController = require('../controllers/weatherForecastController');
const locationController = require('../controllers/locationController');

function routes(listOfCountries, rawDataGroupByCountry) {
  const weatherForecastRouter = express.Router();
  const _locationController = locationController(
    listOfCountries,
    rawDataGroupByCountry
  );
  const apiKey = 'c4c8cb4635149c853f5fe04023add8c5';
  const _weatherForecastcontroller = weatherForecastController(apiKey);

  // Route for countries
  weatherForecastRouter
    .route('/countries')
    .get(_locationController.getCountries);

  // Route for cities of one country
  weatherForecastRouter
    .route('/countries/:countryUnicode')
    .get(_locationController.getCitiesByCountry);

  // Route for current and forecast weather of one country or one city
  weatherForecastRouter
    .route('/:weatherOrForecast/:locationID')
    .get(_weatherForecastcontroller.getWeatherOrForecastByLocationId);
  return weatherForecastRouter;
}

module.exports = routes;
