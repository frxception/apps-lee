import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/main.styl'
import zhHans from 'vuetify/src/locale/zh-Hans'
import { VuetifyToast } from '@/components/widget';
Vue.use(VuetifyToast, {
  x: 'right',
  y: 'top',
  icon: 'info',
  timeout: 3000,
  dismissable: true,
  autoHeight: false,
  multiLine: false,
  vertical: false,
  shorts: {
    custom: {
      color: 'purple',
    },
  },
  property: '$toast',
});
Vue.use(Vuetify, {
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
  options: {
    customProperties: true,
  },
  iconfont: 'md',
  lang: {
    locales: { zhHans },
    current: 'zh-Hans',
  },
})
