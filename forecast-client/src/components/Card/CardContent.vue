<template>
  <div class='widget-area'>
    <WidgetComponent
      v-for='value in listOfValues'
      :key='value.dt'
      :day='value.dt'
      :weatherId='value.weather[0].id'
      :tempMin='value.temp.min'
      :tempMax='value.temp.max'
    />
  </div>
</template>

<script>
import WidgetComponent from '../Widget.vue';

export default {
  name: 'CardContent',
  components: {
    WidgetComponent,
  },
  props: {
    listOfValues: {
      type: Array,
    },
    numberofDaysToShow: {
      type: Number,
      default: () => 5,
    },
  },
};
</script>

<style lang='scss' scoped>
.widget-area {
  display: flex;
  flex: 1;
  gap: 20px;
  flex-direction: row;
  flex-wrap: wrap;
}

@media (max-width: 500px) {
  .widget-area {
    flex-direction: column;
  }
}
</style>
