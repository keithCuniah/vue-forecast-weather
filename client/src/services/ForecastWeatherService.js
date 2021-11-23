import axios from 'axios';

export default {
  async getWeatherOrForecastByCity(weatherOrForcast, location) {
    console.log('service front', weatherOrForcast, location);
    const res = await axios.get(`http://localhost:4000/api/${weatherOrForcast}/${location}`);
    return res;
  },
};
