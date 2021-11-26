<template>
  <div class='card-info'>
    <div class="icon-component"><IconComponent :name="weatherIcon" :colorFill="'white'" /></div>
    <div class='descriptions'>
      <span class='description-item'
        >{{ city.name | capitalizedStr }}, {{ country | capitalizedStr }}
      </span>
      <span class='description-item'>{{ currentInfo.temp | tempKelvinToCelcius }}</span>
      <span class='description-item'>{{ currentInfo.humidity | formatHumidity }}</span>
      <span class='description-item'>{{ currentInfo.uvi | formatUVI }}</span>
      <span class='description-item'>{{ currentInfo.wind | formatWind }}</span>
    </div>
  </div>
</template>

<script>
import IconComponent from '@/components/business/IconComponent/Icon.vue';
import utils from '@/shared/utils';

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
        temp, humidity, uvi, wind_deg, wind_speed
      } = { ...this.currentWeather };
      return {
        temp,
        humidity,
        uvi,
        wind: { wind_dir: utils.convertDegToCardinal(wind_deg), wind_speed },
      };
    },
    weatherIcon() {
      return utils.getIconByWeatherId(this.currentWeather.weather[0].id);
    },
  },
};
</script>

<style lang='scss' scoped>
@import '@/css/forecastWeather.scss';
// I am not using the margin class of bootstrap here to keep the same distance as the wireframe
.card-info {
  display: flex;
  flex: 1;
  .icon-component {
    display: flex;
    min-width: 107px;
    margin-right: 1em;
  }
  .descriptions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-width: 295px;
    color: white;
  }
}
.description-item {
  font-family: $font-style;
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
