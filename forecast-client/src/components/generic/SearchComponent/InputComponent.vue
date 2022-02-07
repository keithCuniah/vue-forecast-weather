<template>
  <div class='input-container'>
    <label :for='this.componentId'
      >The {{ this.labelToFilter }} selected is : <b>{{ this.selectedValue }}</b>
    </label>
    <input
      :id='this.componentId'
      class=''
      type='text'
      :placeholder='this.placeholder'
      v-model='searchText'
      @keydown.enter.prevent
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    componentId: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Enter your query',
    },
    valueToFilter: {
      type: String,
      required: true,
    },
    labelToFilter: {
      type: String,
      required: true,
    },
    selectedValue: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      searchText: '',
    };
  },
  watch: {
    searchText: {
      handler() {
        this.$emit('searchText', this.searchText);
      },
    },
  },
};
</script>
<style lang='scss' scoped>
.input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
