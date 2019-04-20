import Vue from 'vue';
import Vuex, { Store, ActionTree, MutationTree, GetterTree } from 'vuex';

Vue.use(Vuex);

export interface RootStateTypes {
  token: string;
}

const actions: ActionTree<RootStateTypes, {}> = {
  SET_TOKEN({ commit }, data: string) {
    commit('SET_TOKEN', data);
  },
};

const state: RootStateTypes = {
  token: localStorage.getItem('token') as any,
};

const mutations: MutationTree<RootStateTypes> = {
  // tslint:disable-next-line:no-shadowed-variable
  SET_TOKEN(state: RootStateTypes, data: string) {
    state.token = data;
    localStorage.setItem('token', state.token);
  },
};

const getters: GetterTree<RootStateTypes, any> = {
  // tslint:disable-next-line:no-shadowed-variable
  token: (state: RootStateTypes) => state.token,
};

const stroe: Store<any> = new Vuex.Store({
  actions,
  mutations,
  getters,
  state,
  modules: {},
});

export default stroe;
