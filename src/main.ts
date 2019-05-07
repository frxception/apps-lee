import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import VCharts from 'v-charts';
import '@/plugins/vuetify';
import '@/plugins/formattime';
import { createProvider } from '@/plugins/apollo';
import '@/app.styl';

Vue.use(VCharts);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
