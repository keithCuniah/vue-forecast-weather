<template>
  <div class='container-fluid'>
    <div class='p-5 mb-4 bg-light'>
      <h1 class='display-5 fw-bold'>Weather and forecast</h1>
      <p class='lead'>Please click on the button</p>
      <div class='m-1'>
        <button class='btn btn-primary' @click='showDrawer = !showDrawer'>Select Location</button>
      </div>
    </div>
    <DrawerComponent
      :showDrawer='showDrawer'
      :position="'right'"
      @clickOnMask='showDrawer = !showDrawer'
      :zIndex='1'
    >
      <template>
        <div class='p-3 mb-2 bg-light'>
          <h2 class='display-9 fw-bold'>Select a location</h2>
          <p class='lead'>Choose a country and then a city</p>
        </div>
        <div class='drawer-content'>
          <FormularLocation
            :key='key'
            :countries='countries'
            @selectedCountry='(_country) => this.getCities(_country)'
            :cities='cities'
            @submittedForm='(_submittedForm) => onSubmittedFormEvent(_submittedForm)'
          />
        </div>
      </template>
    </DrawerComponent>
    <transition name='fade'>
      <CardInformation v-if='showCard'>
        <template v-slot:header>
          <CardHeader
            :city='JSON.parse(selectedLocation.selectedCity)'
            :country='selectedLocation.selectedCountry'
            :currentWeather='weatherAndForecast.current'
          />
        </template>
        <template v-slot:content>
          <CardContent :listOfValues='weatherAndForecast.daily' />
        </template>
      </CardInformation>
      <CardInformation v-if='showErrorCard'>
        <template v-slot:content>
          <p class='label-error'>NO DATA</p>
        </template>
      </CardInformation>
    </transition>
  </div>
</template>

<script>
import CardInformation from '@/components/business/Card/Card.vue';
import CardHeader from '@/components/business/Card/CardHeader.vue';
import CardContent from '@/components/business/Card/CardContent.vue';
import CountryService from '@/services/CountryService';
import ForecastWeatherService from '@/services/ForecastWeatherService';
import DrawerComponent from '@/components/generic/DrawerComponent/DrawerComponent.vue';
import FormularLocation from '@/components/business/Formular/FormularLocation.vue';

export default {
  name: 'WeatherForecastPage',
  components: {
    DrawerComponent,
    CardInformation,
    CardHeader,
    CardContent,
    FormularLocation,
  },
  data() {
    return {
      selectedLocation: {
        selectedCountry: '',
        selectedCity: '',
      },
      showCard: false,
      showErrorCard: false,
      countries: [],
      cities: [],
      weatherAndForecast: [],
      showDrawer: false,
      key: 0,
    };
  },
  created() {
    CountryService.getCountries()
      .then((response) => {
        this.countries = response;
      })
      .catch((err) => console.log('daboudi', err));
  },
  methods: {
    onSubmittedFormEvent(_submittedForm) {
      this.selectedLocation = JSON.parse(_submittedForm);
      this.getWeatherAndForecast(_submittedForm);
      this.showDrawer = false;
      this.key += 1; // to rerender the formular and not sqve previous data
    },
    getCities(_country) {
      CountryService.getCitiesByCountry(_country)
        .then((response) => {
          this.cities = response;
        })
        .catch(() => {
          this.showCard = false;
          this.showErrorCard = true;
        });
    },
    getWeatherAndForecast(selectedForm) {
      const { selectedCity } = { ...JSON.parse(selectedForm) };
      ForecastWeatherService.getWeatherForecastByCity('weather', selectedCity)
        .then((response) => {
          this.weatherAndForecast = response;
          this.showCard = true;
          this.showErrorCard = false;
        })
        .catch(() => {
          this.showCard = false;
          this.showErrorCard = true;
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.drawer-content {
  display: block;
  height: 100%;
}

.label-error {
  color: white;
}
</style>
