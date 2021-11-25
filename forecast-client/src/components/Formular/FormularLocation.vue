<template>
  <form class='formular' @submit='onSubmit' @reset='onReset' v-if='showForm'>
    <div class='form-group' v-if='countriesAreLoaded'>
      <div class='content'>
        <Search
          :componentId="'searchCountry'"
          :placeholder="'Search for a country'"
          :dataEntries='this.countries'
          :keyOfValueToShow="'country'"
          @selectedObject='(value) => onEventCountry(value)'
        />
      </div>
    </div>
    <div class='form-group'>
      <div class='content'>
        <Search
          :key='this.cityKey'
          :componentId="'searchCity'"
          :placeholder="'Search for a city'"
          :dataEntries='this.cities'
          :keyOfValueToShow="'name'"
          @selectedObject='(value) => onEventCity(value)'
          :disabled='!citiesAreLoaded'
        />
      </div>
    </div>
    <div class='d-inline-flex'>
      <div class='m-1'>
        <b-button
          type='submit'
          :variant="disableSubmit ? 'secondary' : 'primary'"
          :disabled='disableSubmit'
        >
          Submit
        </b-button>
      </div>
      <div class='m-1'>
        <b-button type='reset' variant='danger'> Reset </b-button>
      </div>
    </div>
  </form>
</template>

<script>
import { BButton } from 'bootstrap-vue';
import Search from '../SearchComponent/SearchComponent.vue';

export default {
  name: 'FormularLocation',
  components: {
    Search,
    BButton
  },
  props: {
    countries: {
      type: Array,
      required: true,
    },
    cities: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showForm: true,
      cityKey: 1,
      selectedForm: {
        selectedCountry: '',
        selectedCity: '',
      },
    };
  },
  computed: {
    countriesAreLoaded() {
      return this.countries.length > 0;
    },
    citiesAreLoaded() {
      return this.cities.length > 0;
    },
    disableSubmit() {
      if (this.selectedForm.selectedCity.length > 0) return false;
      return true;
    },
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.$emit('submittedForm', JSON.stringify(this.selectedForm));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.$emit('formIsReset');
      this.selectedForm.selectedCountry = '';
      this.selectedForm.selectedCity = '';
      this.disableInputCity = true;
      // Trick to reset/clear native browser form validation state
      this.showForm = false;
      this.$nextTick(() => {
        this.showForm = true;
      });
    },
    onEventCountry(value) {
      // When user have selected a city country from a country
      const { country } = { ...value };
      this.$emit('selectedCountry', country);
      this.selectedForm.selectedCountry = country;
      this.cityKey += 1;
    },
    onEventCity(jsonValue) {
      // When user have selected a city country from a country
      console.log(jsonValue);
      const strValue = JSON.stringify(jsonValue);
      this.selectedForm.selectedCity = strValue;
    },
  },
};
</script>

<style lang='scss' scoped>
.formular {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  .form-group {
    display: flex;
    justify-content: center;
    flex: 1;
  }
}
</style>
