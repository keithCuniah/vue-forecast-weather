import Vue from 'vue';

Vue.filter('capitalizedStr', (str) => {
  const firstLetter = str.charAt(0);
  const otherLetter = str.slice(1);
  return firstLetter.toUpperCase() + otherLetter.toLowerCase();
});
Vue.filter('tempKelvinToCelcius', (temp) => {
  return `${Math.round(temp - 273.15)}º`;
});
Vue.filter('formatHumidity', (humidity) => {
  return `Humidity: ${humidity}%`;
});
Vue.filter('formatUVI', (uvi) => {
  return `UVI: ${uvi}`;
});
Vue.filter('formatWind', (windDeg, windSpeed) => {
  return `Wind: ${windDeg} ${windSpeed}KM/h`;
});
