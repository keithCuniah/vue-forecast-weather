<template>
  <div class='container-sm w-50 border border-secondary rounded p-4 mb-4'>
    <form @submit='onSubmit' @reset='onReset' v-if='showForm'>
      <div class='form-group m-2'>
        <b-form-input
          list='input-countries'
          v-model='selectedForm.selectedCountry'
          aria-label='Select a country'
          autocomplete='off'
          type='search'
          @change='emitSelectedCountry()'
          aria-placeholder='Select a country'
          placeholder='Select a country'
          aria-describedby='countryHelp'
        />
        <small id='countryHelp' class='form-text text-muted'> First select a country </small>
        <datalist id='input-countries'>
          <option v-for='country in countries' :key='country' :value='country'></option>
        </datalist>
      </div>
      <div class='form-group m-2'>
        <b-form-select
          id='inputState'
          class='form-select'
          v-model='selectedForm.selectedCity'
          :disabled='disableInputCity'
          aria-placeholder='Select a city'
          placeholder='Select a city'
        >
          <option v-for='city in cities' :key='city.id' :value='JSON.stringify(city)'>
            {{ city.name }}
          </option>
        </b-form-select>
      </div>
      <div class='d-inline-flex'>
        <div class="m-1">
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
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue';

export default {
  name: 'Formular',
  components: {
    BButton,
  },
  props: {
    countries: {
      type: Array,
      default: () => ['FR', 'SP', 'IT'],
      required: true,
    },
    cities: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      showForm: true,
      selectedForm: {
        selectedCountry: '',
        selectedCity: '',
      },
      selectedCity: '',
      disableInputCity: true,
    };
  },
  computed: {
    disableSubmit() {
      if (this.selectedForm.selectedCity.length > 0) return false;
      return true;
    },
  },
  methods: {
    emitSelectedCountry() {
      this.disableInputCity = true;
      this.selectedForm.selectedCity = ''; // clean selected city if user is looking for a country
      if (this.isInlistCountries(this.selectedForm.selectedCountry)) {
        this.disableInputCity = false;
        this.$emit('getSelectedCountry', this.selectedForm.selectedCountry);
      }
    },
    isInlistCountries(_country) {
      return this.countries.includes(_country.toUpperCase());
    },
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
  },
};
</script>

<style lang='scss' scoped></style>
