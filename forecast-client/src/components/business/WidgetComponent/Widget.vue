<template>
  <div class='widget-container'>
    <div class='widget-item'>{{ formatDate }}</div>
    <div class='widget-item'>
      <div class='icon-component'><IconComponent :name="forecastIcon" :colorFill="'white'" /></div>
    </div>
    <div class='widget-item'> {{ tempMax | tempKelvinToCelcius }}</div>
    <div class='widget-item'> {{ tempMin | tempKelvinToCelcius }}</div>
  </div>
</template>

<script>
import IconComponent from '@/components/business/IconComponent/Icon.vue';
import utils from '@/shared/utils';

export default {
  name: 'Widget',
  components: {
    IconComponent,
  },
  props: {
    day: {
      type: Number,
      required: true,
    },
    weatherId: {
      type: Number,
      required: true,
    },
    tempMin: {
      type: Number,
      required: true,
    },
    tempMax: {
      type: Number,
      required: true,
    },
  },
  computed: {
    formatDate() {
      const forecastDate = new Date(this.day * 1000);
      if (utils.compareDateToDateNow(forecastDate)) return 'Today';
      const forecastDay = utils.findWeekDateOfDate(forecastDate);
      return forecastDay;
    },
    forecastIcon() {
      return utils.getIconByWeatherId(this.weatherId);
    },
  },
};
</script>

<style lang='scss' scoped>
@import '@/css/forecastWeather.scss';
.widget-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .icon-component {
    width: 3em;
  }
}
.widget-item {
  font-family: $font-style;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
  &:nth-last-child(2) {
    color:$temp-hot;
  }
  &:last-child {
    color:$temp-cold;
  }
}
@media (max-width: 500px) {
  .widget-container {
    flex-direction: row;
  }
}
</style>
