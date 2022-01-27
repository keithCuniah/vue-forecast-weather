import axios from 'axios';

export default {
  async getWeatherForecastByCity(weatherOrForcast, selectedCity) {
    const { id, country, coord } = JSON.parse(selectedCity);

    const params = {
      id,
      country,
      ...coord,
    };

    const promise = await axios
      .get(`http://localhost:4000/api/${weatherOrForcast}/${id}`, { params })
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status === 404) {
          throw new Error(
            `{ID : ${id}, country : ${country}, coordinate : ${JSON.stringify(coord)}} not found`
          );
        }
        throw err;
      });

    return promise;
  },
};
