import Vue from 'vue';
import moment from 'moment';
import '@/plugins/vuetify';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';
import { createProvider } from '@/plugins/apollo';
import '@/app.styl';

moment.locale('zh-cn');

Vue.config.productionTip = false;

Vue.directive('time', {
  bind(el: any, binding: any) {
    el.innerHTML = moment(binding.value).startOf('hour').fromNow();
    // el.__timeout__ = setInterval(() => {
    //   el.innerHTML = moment(binding.value).startOf('hour').fromNow();
    // }, 60000);
  },
});

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: (h) => h(App),
}).$mount('#app');
