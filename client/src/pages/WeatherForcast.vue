<template>
  <div class='container-fluid'>
    <div class='p-5 mb-4 bg-light'>
      <h1 class='display-5 fw-bold'>Weather and forecast</h1>
      <p class='lead'>Please select a location</p>
    </div>
    <FormularBIS />
    <Formular
      v-if='this.countries.length > 0'
      :countries='countries'
      @getSelectedCountry='(_country) => this.getCities(_country)'
      :cities='cities'
      @submittedForm='
        (_submittedForm) => {
          this.selectedLocation = _submittedForm;
          this.getWeatherAndForecast(_submittedForm);
        }
      '
    />
    <div class='mb-3'>
      <b-button v-b-toggle="'form-collapse'" variant='primary' @click.prevent
        >Select location</b-button
      >
    </div>
    <b-collapse id='form-collapse' class='m-4'>
      <!-- <Formular
        v-if='this.countries.length > 0'
        :countries='countries'
        @getSelectedCountry='(_country) => this.getCities(_country)'
        :cities='cities'
        @submittedForm='
          (_submittedForm) => {
            this.selectedLocation = _submittedForm;
            this.getWeatherAndForecast(_submittedForm);
          }
        '
      /> -->
    </b-collapse>

    <Card />
    <pre>
      {{ weather }}
    </pre>
    <pre>
      {{ forecast }}
    </pre>
  </div>
</template>

<script>
// import { BCollapse, BButton, VBToggle } from 'bootstrap-vue';
import Formular from '../components/Formular.vue';
import Card from '../components/Card.vue';
import CountryService from '../services/CountryService';
import ForecastWeatherService from '../services/ForecastWeatherService';

export default {
  name: 'WeatherForecastPage',
  components: {
    Formular,
    // BCollapse,
    // BButton,
    Card,
  },
  directives: {
    // 'b-toggle': VBToggle,
  },
  data() {
    return {
      selectedLocation: {
        selectedCountry: '',
        selectedCity: '',
      },
      countries: [],
      cities: [],
      weather: [],
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
      await ForecastWeatherService.getWeatherOrForecastByCity('weather', selectedCity).then(
        (response) => {
          console.log('weather', response.data);
          this.weather = response.data;
        }
      );
      await ForecastWeatherService.getWeatherOrForecastByCity('forecast', selectedCity).then(
        (response) => {
          console.log('forecast', response.data);
          this.forecast = response.data;
        }
      );
    },
  },
};
</script>

<style lang='scss' scoped></style>
