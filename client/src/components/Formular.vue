<template>
  <div class='container-sm border border-light shadow rounded p-4'>
    <form @submit='onSubmit' @reset='onReset' v-if='showForm'>
      <div class='input-group mb-3'>
        <b-form-input
          list='input-countries'
          v-model='selectedForm.selectedCountry'
          aria-label='Select a country'
          autocomplete='off'
          type='search'
          @change='emitSelectedCountry()'
          aria-placeholder='Select a country'
          placeholder='Select a country'
        />
        <datalist id='input-countries'>
          <option v-for='country in countries' :key='country' :value='country'></option>
        </datalist>

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

        <select
          class='form-check-input'
          list='input-cities'
          v-model='selectedForm.selectedCity'
          aria-label='Select a city'
          autocomplete='off'
          type='search'
          aria-placeholder='Select a city'
          placeholder='Select a city'
          :disabled='disableInputCity'
        >
          <option v-for='city in cities' :key='city.id' :value='JSON.stringify(city)'>
            {{ city.name }}
          </option>
        </select>
      </div>
      <b-button type='submit' variant='primary' :disabled='disableSubmit'>Submit</b-button>
      <b-button type='reset' variant='danger'>Reset</b-button>
    </form>
    <pre>{{ selectedForm }} </pre>
  </div>

  <!-- <form>
    <div class='form-row'>
      <div class='form-group col-md-6'>
        <label for='inputCity'>City</label>
        <input type='text' class='form-control' id='inputCity' />
      </div>
      <div class='form-group col-md-4'>
        <label for='inputState'>State</label>
        <select id='inputState' class='form-control'>
          <option selected>Choose...</option>
          <option>...</option>
        </select>
      </div>
    </div>
    <button type='submit' class='btn btn-primary'>Sign in</button>
  </form> -->
</template>

<script>
export default {
  name: 'Formular',
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
