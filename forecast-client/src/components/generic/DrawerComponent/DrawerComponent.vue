<template>
  <div class='drawer-component' :style='cssVar'>
    <div
      class='drawer-mask drawer-mask-transition'
      @click='clickOnMask()'
      :style="{
        width: showDrawer ? '100vw' : '0',
        opacity: showDrawer ? '.6' : '0'
      }"
    ></div>
    <div
      class='drawer drawer-transition drawer-right tracked-item'
      :class="{
        'drawer-right': position === 'right',
        'drawer-left': position === 'left',
      }"
      :style="{ width: showDrawer ? '35em' : '0' }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrawerComponent',
  props: {
    position: {
      type: String,
      default: 'right',
      validator: (value) => ['right', 'left'].includes(value.toLowerCase()),
    },
    showDrawer: {
      type: Boolean,
      required: true,
    },
    zIndex: {
      type: Number,
      default: 199,
    },
  },
  computed: {
    cssVar() {
      return {
        '--z-index-mask': this.zIndex.toString(),
        '--z-index-drawer': (this.zIndex + 1).toString(),
      };
    },
  },
  methods: {
    clickOnMask() {
      this.$emit('clickOnMask');
    },
  },
};
</script>

<style lang='scss' scoped>
@import '@/css/forecastWeather.scss';
.drawer-component {
  /* drawer and mask*/
  .drawer {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    width: 0; /* initially */
    max-width: calc(100vw - 4em);
    overflow: hidden;
    height: 100%;
    padding-left: 0;
    background: $bg-white;
    z-index: var(--z-index-drawer);
  }

  .drawer-right {
    right: 0;
  }

  .drawer-left {
    left: 0;
  }
  .drawer-transition {
    -webkit-transition: all 0.4s ease-in-out; /* Chrome and Safari */
    -moz-transition: all 0.4s ease-in-out; /* Firefox */
    transition: all 0.4s ease-in-out;
  }

  .drawer-mask {
    cursor: pointer;
    position: fixed;
    left: 0;
    top: 0;
    width: 0; /* initially */
    height: 100%;
    background: $bg-dark;
    opacity: 0.3;
    z-index: var(--z-index-mask);
  }

  .drawer-mask-transition {
    -webkit-transition: opacity 0.35s ease-in-out; /* Chrome and Safari */
    -moz-transition: opacity 0.35s ease-in-out; /* Firefox */
    transition: opacity 0.35s ease-in-out;
  }
}
</style>
