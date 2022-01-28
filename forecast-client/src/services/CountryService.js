import axios from 'axios';

export default {
  async getCountries() {
    const urlCountry = 'http://localhost:4000/api/countries';
    const promise = await axios
      .get(urlCountry)
      .then((response) => response.data)
      .catch((err) => {
        if (err.response.status === 404) {
          throw new Error(`Can't reach countries from url : ${urlCountry}`);
        }
        throw err;
      });
    return promise;
  },
  async getCitiesByCountry(_country) {
    const urlCities = `http://localhost:4000/api/countries/${_country}`;
    const promise = await axios
      .get(urlCities)
      .then((response) => response.data)
      .catch((err) => {
        if (err.response.status === 404) {
          throw new Error(`Can't reach cities from url : ${urlCities}`);
        }
        throw err;
      });
    return promise;
  },
};
