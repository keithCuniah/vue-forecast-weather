<template>
  <div class='search-container' :style='cssVar'>
    <InputComponent
      :componentId='inputId'
      :placeholder='placeholderInput'
      :valueToFilter='keyOfValueToShow'
      :selectedValue='selectedValue'
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
        @click='clickEvent(elem)'
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
      selectedValue: '',
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
      return `${this.componentId}Input`;
    },
    responseQueryText() {
      if (this.queryText.length > 0) {
        const dataFiltered = this.dataEntries.filter((obj) =>
          obj[this.keyOfValueToShow].includes(this.queryText.toUpperCase())
        );
        if (dataFiltered.length === 0) {
          return [{ id: -1, [this.keyOfValueToShow]: `No data match with ${this.queryText}` }];
        }
        return dataFiltered;
      }
      return this.dataEntries;
    },
  },
  methods: {
    showDropdown() {
      if (this.isDropdownVisible === 'none') this.isDropdownVisible = 'block';
      else this.isDropdownVisible = 'none';
    },
    clickEvent(selectedElem) {
      if (selectedElem.id !== -1) {
        this.selectedValue = selectedElem[this.keyOfValueToShow];
        this.$emit('selectedObject', selectedElem);
        this.showDropdown();
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.search-container {
  position: relative;
  display: block;
}
.dropdown-content {
  display: var(--display-dropdown);
  position: absolute;
  background-color: #f9f9f9;
  width: 100%;
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
