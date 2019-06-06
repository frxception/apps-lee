import Vue from 'vue'
import Vuetify from 'vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/src/stylus/app.styl'
import { VuetifyToast } from '@/components/widget'

Vue.use(Vuetify, {
    theme: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
    options: {
        customProperties: true
    },
    iconfont: 'md'
})
Vue.use(VuetifyToast, {
    x: 'right',
    y: 'top',
    color: '',
    icon: 'info',
    timeout: 5000,
    dismissable: true,
    autoHeight: false,
    multiLine: false,
    vertical: false,
    queueable: false,
    shorts: {
        custom: {
            color: 'purple'
        }
    },
    property: '$message'
})
