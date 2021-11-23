const express = require('express');
const cors = require('cors');
const fs = require('fs');
const utils = require('./shared/utils');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

// get data from city.list
const rawdata = fs.readFileSync('city.list.min.json');
const rawDataJson = JSON.parse(rawdata);

const rawDataGroupByCountry = rawDataJson.reduce((acc, location) => {
  const countryfullName = utils.getFullCountryName(location.country);
  const country = acc[countryfullName] || [];
  country.push(location);
  acc[countryfullName] = country;
  return acc;
}, {});

const listOfCountries = Object.keys(rawDataGroupByCountry);

const weatherForecastRouter = require('./routes/weatherForecastRouter')(
  listOfCountries,
  rawDataGroupByCountry
);
app.use('/api', weatherForecastRouter);

// Endpoint
app.get('/', (req, res) => {
  res.send(`<div>
              <h1>Welcome to my Weather Forecast server API</h1>
              <p>Go to /api</p>
            </div>`);
});

app.get('/api', (req, res) => {
  res.send(
    `<div>
      <h1>Welcome to my Weather Forecast server API</h1>
      <p>API paths :</p>
      <ul>
        <li>To get all countries unicode flags
          <b>/api/countries</b>
        </li>

        <li>To get all cities from a specific country
          <b>/api/countries/{country_unicodeflag}</b>
        </li>

        <li>To get the current weather of a specific location (country or city)
          <b>/api/weather/{localisation_id}</b>
        </li>

        <li>To get the forecast of a specific location (country or city)
          <b>/api/forecasst/{localisation_id}</b>
        </li>
      </ul>
    </div>`
  );
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

// function getFullCountryName(unicodeFlag) {
//   // From unicode name return full name of a specific country
//   const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
//   return regionNames.of(unicodeFlag);
// }
