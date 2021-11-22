const axios = require('axios');

function weatherForecastController( apiKey, listOfCountries, objectGroupByCountry) {

  async function getCountries(req, res) {
    console.log('Get all countries');
    try {
      res.send(listOfCountries);
      console.log(' Data have been found');
    } catch (err) {
      res.send("Ressources not found, can't find any country");
      console.log(` Call in error : ${err}`);
    }
  }

  async function getCitiesByCountry(req, res) {
    const country = req.params.countryUnicode.toUpperCase();

    console.log(`Get all cities of country : ${country}`);

    try {
      const cities = objectGroupByCountry[country];
      res.json(cities);
      console.log(' Data have been found');
    } catch (err) {
      res.send(
        `Ressources not found, can't find any cities of country  ${country}`
      );
      console.log(` Call in error : ${err}`);
    }
  }

  const getWeatherOrForecastByLocationId = async (req, res) => {
    const params = {
      appid: apiKey,
      id: 2967103,
      units: 'metric',
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
      res.json(result.data);
      console.log(' Call in success');
    } catch (err) {
      res.send(
        `Ressources not found, can't find any ${weatherOrForecast} data for the location : ${req.params.locationID}`
      );
      console.log(` Call in error : ${err}`);
    }
  };

  return { getCountries, getCitiesByCountry, getWeatherOrForecastByLocationId };
}

module.exports = weatherForecastController;
