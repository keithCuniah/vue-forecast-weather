<template>
  <div class='widget-container'>
    <div class='widget-item'>{{ formatDate }}</div>
    <div class='widget-item'>
      <div class='icon-component'><IconComponent :name="forecastIcon" :colorFill="'white'" /></div>
    </div>
    <div class='widget-item'> {{ tempMin | tempKelvinToCelcius }}</div>
    <div class='widget-item'> {{ tempMax | tempKelvinToCelcius }}</div>
  </div>
</template>

<script>
import IconComponent from './IconComponent/Icon.vue';
import utils from './shared';

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
      const dateNow = new Date();
      const formatDateNow = this.shapeDate(dateNow);

      const forecastDate = new Date(this.day * 1000);
      const formatForecastDate = this.shapeDate(forecastDate);
      if (formatDateNow === formatForecastDate) return 'Today';

      const weekday = new Array(7);
      weekday[0] = 'Sunday';
      weekday[1] = 'Monday';
      weekday[2] = 'Tuesday';
      weekday[3] = 'Wednesday';
      weekday[4] = 'Thursday';
      weekday[5] = 'Friday';
      weekday[6] = 'Saturday';

      const forecastDay = weekday[forecastDate.getDay()];
      return forecastDay;
    },
    forecastIcon() {
      return utils.getIconByWeatherId(this.weatherId);
    },
  },
  filters: {
    tempKelvinToCelcius(temp) {
      return `${Math.round(temp - 273.15)}ºC`;
    },
  },
  methods: {
    shapeDate(dateValue) {
      return `${dateValue.getDate()}/${dateValue.getMonth()}/${dateValue.getFullYear()}`;
    }
  },
};
</script>

<style lang='scss' scoped>
.widget-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-around;
  max-width: 900px;
  align-items: center;
  .icon-component {
    width: 3em;
  }
}
.widget-item {
  font-family: 'Roboto', sans-serif;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0em;
  text-align: left;
  color: white;
  &:nth-last-child(2) {
    color:#FF0000
  }
  &:last-child {
    color:#00FFFF
  }
}
@media (max-width: 500px) {
  .widget-container {
    flex-direction: row;
  }
}
</style>
