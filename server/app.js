const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const countryRouter = express.Router();

// Route for countries
countryRouter.route('/countries').get(async (req, res) => {
  console.log('axios call for get countries');
  const url = 'https://countriesnow.space/api/v0.1/countries/flag/unicode';
  try {
    const result = await axios.get(url);
    // res.json(result.data);
    res.send(`<pre><code>${JSON.stringify(result.data, null, 2)}</code></pre>`);
    console.log(' Call in success');
  } catch (err) {
    res.send("Ressources not found, can't find any country");
    console.log(` Call in error : ${err}`);
  }
});
app.use('/api', countryRouter);

// Route for cities of one country
countryRouter.route('/countries/:country').get(async (req, res) => {
  const url = 'https://countriesnow.space/api/v0.1/countries/cities';
  const data = { country: req.params.country.toLowerCase() };

  console.log(`axios call for post cities of country : ${req.params.country}`);

  try {
    const result = await axios.post(url, data);
    res.send(`<pre><code>${JSON.stringify(result.data, null, 2)}</code></pre>`);
    console.log(' Call in success');
  } catch (err) {
    res.send(
      `Ressources not found, can't find any cities of country  ${req.params.country}`
    );
    console.log(` Call in error : ${err}`);
  }
});
app.use('/api', countryRouter);

// Route for current and forecast weather of one country or one city
countryRouter
  .route('/:weatherOrForecast/:countryOrCity')
  .get(async (req, res) => {
    const apiKey = 'c4c8cb4635149c853f5fe04023add8c5';

    const params = {
      appid: apiKey,
      q: req.params.countryOrCity.toLowerCase(),
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
      `axios call for get ${weatherOrForecast} of location : ${req.params.countryOrCity}`
    );

    try {
      const result = await axios.get(url, { params });
      res.send(
        `<pre><code>${JSON.stringify(result.data, null, 2)}</code></pre>`
      );
      console.log(' Call in success');
    } catch (err) {
      res.send(
        `Ressources not found, can't find any ${weatherOrForecast} data for the location : ${req.params.countryOrCity}`
      );
      console.log(` Call in error : ${err}`);
    }
  });
app.use('/api', countryRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my Weather Forecast server API');
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
