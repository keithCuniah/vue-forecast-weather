<template>
  <div class='container-fluid'>
    <div class='p-5 mb-4 bg-light'>
      <h1 class='display-5 fw-bold'>Weather and forecast</h1>
      <p class='lead'>Please click on the button </p>
      <div class='m-1'>
        <button class='btn btn-primary' @click='showDrawer = !showDrawer'> Select Location </button>
      </div>
    </div>
    <DrawerComponent
      :showDrawer='showDrawer'
      :position="'right'"
      @clickOnMask='showDrawer=!showDrawer'
      :zIndex='1'>
      <template>
        <div class="drawer-content">
          <FormularLocation
            :countries='countries'
            @selectedCountry='(_country) => this.getCities(_country)'
            :cities='cities'
            @submittedForm='
              (_submittedForm) => {
                this.selectedLocation = JSON.parse(_submittedForm);
                this.getWeatherAndForecast(_submittedForm);
              }
            '
          />
        </div>
      </template>
    </DrawerComponent>
    <transition name='fade'>
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
      countries: [],
      cities: [],
      weatherAndForecast: [],
      currentWeather: [],
      forecast: [],
      showDrawer: false,
    };
  },
  async created() {
    await CountryService.getCountries().then((response) => {
      this.countries = response.data;
    });
  },
  methods: {
    async getCities(_country) {
      await CountryService.getCitiesByCountry(_country).then((response) => {
        this.cities = response.data;
      });
    },
    async getWeatherAndForecast(selectedForm) {
      const { selectedCity } = { ...JSON.parse(selectedForm) };
      await ForecastWeatherService.getWeatherForecastByCity('weather', selectedCity).then(
        (response) => {
          this.weatherAndForecast = response.data;
          this.showCard = true;
        }
      );
    },
  },
};
</script>

<style lang='scss' scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.drawer-content{
  display: block;
  height: 100%;
}
</style>
