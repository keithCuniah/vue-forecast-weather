<template>
  <div :id='this.myFilterId'>
    <Search
      v-if="this.responseStatus === 'OK'"
      :componentId="'searchForFilter'"
      @searchText='searchText'
    />
    <div class='container-filter'>
      <div
        class='form-check'
        v-for='element in this.filteredText'
        :key='element.filtreId'
      >
        <input
          :id='element.filtreId'
          type='checkbox'
          :value='element'
          v-model='element.selected'
          :disabled='!element.enable'
        />

        <label
          class=''
          :for='element.filtreid'
        >
        <!-- <label
          class=''
          :for='element.filtreId'
          :class="
          {
            'hover': element.enable,
            'activate': element.selected,
            'disable-hover disable-color': !element.enable
          }"
        > -->
          <div>
          <!-- <div
            class=''
            :class="
            {
              'activate-box': element.enable && element.selected,
              'deactivate-box': element.enable && !element.selected,
              'disable-box': !element.enable
            }"
          > -->
            <span :class="{ 'font-tick': element.selected }"></span>
          </div>
          <div class=''>
            <span
              class=''
              v-html='$options.filters.highlight1(element.label, searchText)'
            >
            </span>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import Search from './Search.vue';

export default {
  name: 'Filter',
  props: {
    myFilter: {
      type: Array,
      required: true
    }
  },
  components: {
    Search
  },
  data() {
    return {
      searchText: '',
      myFilterId: this.myFilter.myFilterId,
      filters: this.myFilter.filters,
      status: this.myFilter.statuses,
      filterLabel: this.myFilter.label,
      responseStatus: 'OK'
    };
  },
  updated() {
    // const selectedIds = [];
    // this.myFilter.filters.filter((element) => {
    //   if (element.selected) {
    //     selectedIds.push(element.filtreId);
    //   }
    // });
  },
  computed: {
    filteredTest() {
      if (!this.searchText) {
        return this.filters;
      }
      return this.filters.filter(
        (elem) =>
          elem.label.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1
      );
    }
  },
  methods: {
    updateSearchText(value) {
      this.searchText = value;
    }
  }
};
</script>
