<template>
  <div class='card-info'>
    <div class='icon-component'><IconComponent :name='weatherIcon' :colorFill="'white'"  /></div>
    <div class='descriptions'>
      <span class='description-item'
        >{{ city.name | capitalizedStr }}, {{ country | capitalizedStr }}
      </span>
      <span class='description-item'>{{ currentInfo.temp | tempKelvinToCelcius }}</span>
      <span class='description-item'>{{ currentInfo.humidity | formatHumidity }} </span>
      <span class='description-item'>{{ currentInfo.uvi | formatUVI }} </span>
      <span class='description-item'>{{ { ...currentInfo.wind } | formatWind }} </span>
    </div>
  </div>
</template>

<script>
import IconComponent from '../IconComponent/Icon.vue';
import utils from '../shared/utils';

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
  computed: {
    currentInfo() {
      const {
        temp,
        humidity,
        uvi,
        wind_deg,
        wind_speed
      } = { ...this.currentWeather };
      return {
        temp,
        humidity,
        uvi,
        wind: { wind_deg, wind_speed },
      };
    },
    weatherIcon() {
      return utils.getIconByWeatherId(this.currentWeather.weather[0].id);
    },
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
