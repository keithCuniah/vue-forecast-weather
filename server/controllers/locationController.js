function locationController(listOfCountries, objectGroupByCountry) {
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
  return { getCountries, getCitiesByCountry };
}

module.exports = locationController;
