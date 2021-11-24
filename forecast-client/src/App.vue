<template>
  <div id='app'>
    <!-- <img alt='Vue logo' src='./assets/logo.png'> -->
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
