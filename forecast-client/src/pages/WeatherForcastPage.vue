<template>
  <div class='container-fluid'>
    <div class='p-5 mb-4 bg-light'>
      <h1 class='display-5 fw-bold'>Weather and forecast</h1>
      <p class='lead'>Please click on the button </p>
      <div class='m-1'>
        <button class='btn btn-primary' @click='showDrawer = !showDrawer'> Select Location </button>
      </div>
    </div>
    <!-- <div class='container-fluid'> -->
      <!-- <Formular
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
      /> -->
    <!-- </div> -->
    <DrawerComponent
      :showDrawer='showDrawer'
      :position="'right'"
      @clickOnMask='showDrawer=!showDrawer'
      :zIndex='1'>
      <template>
        <div class="drawer-content">
          <!-- <FilterComponent :myFilter='this.countries' /> -->
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
          <!-- <form>
            <div class="form-group">
              <div class="content">
                <Search
                  v-if="this.countries.length > 0"
                  :componentId="'searchCountry'"
                  :placeholder="'Search for a country'"
                  :dataEntries="this.countries"
                  :keyOfValueToShow="'country'"
                  @selectedObject='(value) => this.daboudi = value'
                  />
                  {{this.daboudi}}
              </div>
            </div>
          </form> -->
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
import CardInformation from '../components/Card/Card.vue';
import CardHeader from '../components/Card/CardHeader.vue';
import CardContent from '../components/Card/CardContent.vue';
import CountryService from '../services/CountryService';
import ForecastWeatherService from '../services/ForecastWeatherService';
import DrawerComponent from '../components/DrawerComponent/DrawerComponent.vue';
import FormularLocation from '../components/Formular/FormularLocation.vue';

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
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
