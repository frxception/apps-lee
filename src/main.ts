import Vue from 'vue';
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import VCharts from 'v-charts'
import { createProvider } from './apollo';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VCharts)

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    apolloProvider: createProvider(),
    render: (h) => h(App),
}).$mount('#app');
