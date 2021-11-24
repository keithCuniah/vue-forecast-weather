import axios from 'axios';

export default {
  async getCountries() {
    const res = await axios.get('http://localhost:4000/api/countries');
    return res;
  },
  async getCitiesByCountry(_country) {
    const res = await axios.get(`http://localhost:4000/api/countries/${_country}`);
    return res;
  },
};
