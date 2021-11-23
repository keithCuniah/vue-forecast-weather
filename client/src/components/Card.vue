<template>
  <div class='card-weather-forecast'>
    <div class='weather-header'>
      <div class='header-content'>
        <div class="img-content">
          <Icon :name="'SUN'" :colorFill="'white'"/>
        </div>
        <div class="weather-desc-content"></div>
      </div>
    </div>
    <div class='card-content'></div>
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
  name: 'Card',
  components: {
    Icon,
  },
  props: {
    selectedLocation: {
      type: Object,
      default: () => ({
        selectedCountry: '',
        selectedCity: 1,
      }),
    },
    weatherData: {
      type: Array,
      default: () => [],
    },
    forecastData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang='scss' scoped>
.card-weather-forecast {
  background: linear-gradient(180deg, #0668c2 0%, #1c0168 100%, rgba(68, 12, 158, 0) 100%),
    linear-gradient(0deg, #c4c4c4, #c4c4c4);
  min-height: 311px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px #00000040 inset;
  display: flex;
  flex-direction: column;
}
.weather-header {
  display: flex;
  flex-direction: row;
  flex: 1;
  max-height: 155px;
  padding: 25px 33px 25px 33px;
  // padding: 1.5em 2em 1.5em 2em;
  .header-content{
    display: inline-flex;
    background-color: bisque;
    min-width: 16em;
    .img-content {
      display: flex;
      flex: 1;
    }
  }
}
.card-content {
  display: flex;
  flex-direction: row;
  flex: 1;
  background-color: aliceblue;
}
</style>
