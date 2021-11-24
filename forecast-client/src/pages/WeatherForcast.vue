<template>
  <div class='container-fluid'>
    <div class='p-5 mb-4 bg-light'>
      <h1 class='display-5 fw-bold'>Weather and forecast</h1>
      <p class='lead'>Please select a location</p>
    </div>
    <div class='container-fluid'>
      <Formular
        v-if='this.countries.length > 0'
        :countries='countries'
        @getSelectedCountry='(_country) => this.getCities(_country)'
        :cities='cities'
        @formIsReset='showCard = false'
        @submittedForm='
          (_submittedForm) => {
            this.selectedLocation = JSON.parse(_submittedForm);
            this.getWeatherAndForecast(_submittedForm);
          }
        '
      />
    </div>

    <CardInformation
      v-if='showCard'
    >
      <template v-slot:header>
        <CardHeader
          :city='JSON.parse(selectedLocation.selectedCity)'
          :country='selectedLocation.selectedCountry'
          :currentWeather='weatherAndForecast.current'
        />
      </template>
      <template v-slot:content>
        <CardContent
          :listOfValues='weatherAndForecast.daily'
        />
      </template>
    </CardInformation>
  </div>
</template>

<script>
import Formular from '../components/Formular.vue';
import CardInformation from '../components/Card/Card.vue';
import CardHeader from '../components/Card/CardHeader.vue';
import CardContent from '../components/Card/CardContent.vue';
import CountryService from '../services/CountryService';
import ForecastWeatherService from '../services/ForecastWeatherService';

export default {
  name: 'WeatherForecastPage',
  components: {
    Formular,
    CardInformation,
    CardHeader,
    CardContent,
  },
  data() {
    return {
      selectedLocation: {
        selectedCountry: '',
        selectedCity: '',
      },
      showCard: false,
      countries: [],
      cities: [],
      weatherAndForecast: [],
      currentWeather: [],
      forecast: [],
    };
  },
  async created() {
    await CountryService.getCountries().then((response) => {
      this.countries = response.data;
    });
  },
  methods: {
    async getCities(_country) {
      console.log('method', _country);
      await CountryService.getCitiesByCountry(_country).then((response) => {
        console.log(_country, response.data);
        this.cities = response.data;
      });
    },
    async getWeatherAndForecast(selectedForm) {
      const { selectedCity } = { ...JSON.parse(selectedForm) };
      await ForecastWeatherService.getWeatherForecastByCity('weather', selectedCity).then(
        (response) => {
          console.log('weather', response.data);
          this.weatherAndForecast = response.data;
          this.showCard = true;
        }
      );
    },
  },
};
</script>

<style lang='scss' scoped></style>
