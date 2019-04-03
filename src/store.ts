import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const LOGIN = 'LOGIN';

export default new Vuex.Store({
    state: {
        token: window.sessionStorage.getItem('token'),
    },
    mutations: {
        [LOGIN]: (state, data) => {
            // 更改token的值
            state.token = data;
            window.sessionStorage.setItem('token', data);
        },
    },
    actions: {
        token({commit}, data) {
            commit(LOGIN, data);
        },
    },
});
