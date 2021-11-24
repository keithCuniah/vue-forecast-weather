<template>
  <div class='container-area'>
    <div class='header-content'>
        <slot name="header" />
    </div>
    <div class='body-content'>
      <slot name="content" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'Card',
};
</script>

<style lang='scss' scoped>
.container-area {
  display: flex;
  flex-direction: column;
  gap: 35px;
  min-height: 311px;
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px #00000040 inset;
  background: linear-gradient(180deg, #0668c2 0%, #1c0168 100%, rgba(68, 12, 158, 0) 100%),
  linear-gradient(0deg, #c4c4c4, #c4c4c4);
}
.header-content {
  display: flex;
  flex-direction: row;
  flex: 1;
  max-height: 155px;
  padding: 25px 33px 0 33px;
}
.body-content {
  display: flex;
  flex: 1;
  padding: 0 33px 25px 33px;
}

</style>
