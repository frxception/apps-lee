import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './plugins/vuetify';
import './plugins/formattime';
import { createProvider } from './plugins/apollo';
import 'nprogress/nprogress.css';
import '@/app.styl';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
