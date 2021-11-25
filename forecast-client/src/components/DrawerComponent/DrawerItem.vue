<template>
  <div class="drawer-items cursor-pointer">
    <div class="image-and-label">
      <div class="image-items" v-if="isLeftImage">
        <slot name="left-image"></slot>
      </div>
      <div class="label-items">
        <slot name="text"></slot>
      </div>
    </div>
    <div class="image-items" v-if="isRightImage">
      <slot name="right-image"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DrawerItem",
  props: {
    isLeftImage: {
      type: Boolean,
      default: false
    },
    isRightImage: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/css/ob1-color.scss";
.drawer-items {
  display: flex;
  justify-content: space-between;
  min-height: 5em;
  border-bottom: 1px solid $bg-dark-ob1;
  align-items: center;
  .image-and-label {
    display: inline-flex;
    align-items: center;
    min-width: 0;
    .image-items {
      display: inline-flex;
      justify-content: center;
      color: $bg-dark-ob1;
      margin-left: 1em;
    }
    .label-items {
      display: flex;
      align-items: center;
      font-family: $font-family-1;
      margin-left: 1em;
      min-width: 0;
      span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
