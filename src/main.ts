import Vue, { CreateElement } from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import { createProvider } from './plugins/apollo'
import i18n from './plugins/i18n'
import '@/app.styl'
import moment from 'moment'
import MultiFiltersPlugin from './plugins/multifilters'

Vue.use(MultiFiltersPlugin)

moment.locale('zh-cn')

Vue.config.productionTip = false

Vue.filter('diffForHumans', (value: string) => {
    return moment(value)
        .utc()
        .subtract()
        .calendar()
})

new Vue({
    router,
    store,
    apolloProvider: createProvider(),
    i18n,
    render: (h: CreateElement) => h(App)
}).$mount('#app')
