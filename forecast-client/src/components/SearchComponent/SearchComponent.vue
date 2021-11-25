<template>
  <div class='search-container' :style='cssVar'>
    <InputComponent
      :componentId='inputId'
      :placeholder='placeholderInput'
      @searchText='
        (value) => {
          this.queryText = value;
        }
      '
      @click.native='showDropdown()'
    />
    <div class='dropdown-content'>
      <div
        class='dropdown-items'
        v-for='elem in responseQueryText'
        :key='elem.id'
        :value='elem'
        @click="clickEvent(elem)"
      >
        <div>{{ elem[keyOfValueToShow] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import InputComponent from './InputComponent.vue';

export default {
  components: {
    InputComponent,
  },
  props: {
    componentId: {
      type: String,
      required: true,
    },
    keyOfValueToShow: {
      type: String,
      required: true,
    },
    placeholderInput: {
      type: String,
      default: () => 'Enter your query',
    },
    dataEntries: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      queryText: '',
      isDropdownVisible: 'none',
    };
  },
  computed: {
    cssVar() {
      return {
        '--display-dropdown': this.isDropdownVisible,
      };
    },
    inputId() {
      return `${this.componentId}-input`;
    },
    responseQueryText() {
      if (this.queryText.length > 0) {
        return this.dataEntries.filter((obj) =>
          obj[this.keyOfValueToShow].includes(this.queryText.toUpperCase())
        );
      }
      return this.dataEntries;
    },
  },
  methods: {
    showDropdown() {
      if (this.isDropdownVisible === 'none') this.isDropdownVisible = 'block';
      else this.isDropdownVisible = 'none';
    },
    clickEvent(value) {
      this.$emit('selectedObject', value);
    }
  },
};
</script>

<style lang='scss' scoped>
.search-container {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: var(--display-dropdown);
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  max-height: 19em;
  overflow: overlay;
  .dropdown-items:hover {
    background-color: burlywood;
  }
}
</style>
