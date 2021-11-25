<template>
  <div class='search-container' :id='this.componentId'>
    <div class='input-container'>
      <input
        class=''
        type='text'
        :placeholder='this.placeholder'
        v-model='searchText'
        @keydown.enter.prevent
      />
      {{this.searchText}}
      <b-icon icon="exclamation-circle-fill" variant="success"></b-icon>
    </div>
  </div>
</template>

<script>
import { BIcon } from 'bootstrap-vue';

export default {
  name: 'Search',
  components: {
    BIcon,
  },
  props: {
    componentId: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: 'Enter your query',
    },
  },
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    deleteSearchText() {
      this.searchText = '';
    },
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
