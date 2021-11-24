<template>
  <div id='app'>
    <WeatherForecast />
  </div>
</template>

<script>
import WeatherForecast from './pages/WeatherForcast.vue';

export default {
  name: 'App',
  components: {
    WeatherForecast,
  },
};
</script>

<style lang='scss'></style>
