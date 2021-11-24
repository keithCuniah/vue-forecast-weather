<template>
  <div class='card-info'>
    <div class='icon-component'>
      <IconComponent :name="weatherIcon" :colorFill="'white'" />
    </div>
    <div class='descriptions'>
      <span class='description-item'
        >{{ city.name | capitalizedStr }}, {{ country | capitalizedStr }}
      </span>
      <span class='description-item'>{{ currentWeather | tempKelvinToCelcius }}</span>
      <span class='description-item'>{{ currentWeather | formatHumidity }} </span>
      <span class='description-item'>{{ currentWeather | formatUVI }} </span>
      <span class='description-item'>{{ currentWeather | formatWind }} </span>
    </div>
  </div>
</template>

<script>
import IconComponent from '../IconComponent/Icon.vue';
import utils from '../shared';

export default {
  name: 'CardHeader',
  components: {
    IconComponent,
  },
  props: {
    country: {
      type: String,
    },
    city: {
      type: Object,
    },
    currentWeather: {
      type: Object,
    },
  },
  filters: {
    capitalizedStr(str) {
      const firstLetter = str.charAt(0);
      const otherLetter = str.slice(1);
      return firstLetter.toUpperCase() + otherLetter.toLowerCase();
    },
    tempKelvinToCelcius(currentWeather) {
      const { temp } = { ...currentWeather };
      return `${Math.round(temp - 273.15)}º`;
    },
    formatHumidity(currentWeather) {
      const { humidity } = { ...currentWeather };
      return `Humidity: ${humidity}%`;
    },
    formatUVI(currentWeather) {
      const { uvi } = { ...currentWeather };
      return `UVI: ${uvi}`;
    },
    formatWind(currentWeather) {
      return `Wind: ${currentWeather.wind_deg} ${currentWeather.wind_speed}KM/h`;
    },
  },
  computed: {
    weatherIcon() {
      return utils.getIconByWeatherId(this.currentWeather.weather[0].id);
    }
  },
};
</script>

<style lang='scss' scoped>
// I am not using the margin class of bootstrap here to keep the same distance as the wireframe
.card-info {
  display: flex;
  flex: 1;
  .icon-component {
    display: flex;
    width: 8em;
    margin-right: 1.5em;
  }
  .descriptions {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
  }
}
.description-item {
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  text-align: left;
  letter-spacing: 0em;
  font-weight: 400;
  font-size: 15px;
  line-height: 17.58px;

  &:first-child {
    font-size: 25px;
    line-height: 29px;
  }
  &:nth-child(2) {
    font-size: 20px;
    line-height: 23.44px;
  }
}
</style>
