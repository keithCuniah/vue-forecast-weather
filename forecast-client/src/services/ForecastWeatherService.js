import axios from 'axios';

export default {
  async getWeatherForecastByCity(weatherOrForcast, selectedCity) {
    const {
      id,
      country,
      coord
    } = JSON.parse(selectedCity);

    const headers = {
      id,
      country,
      ...coord
    };
    console.log('service front', weatherOrForcast, id, headers);
    const res = await axios.get(`http://localhost:4000/api/${weatherOrForcast}/${id}`, { headers });
    return res;
  },
};
