import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './components/shared/filters';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

// add all filters into the vue instance
