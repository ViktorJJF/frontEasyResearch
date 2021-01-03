import Vue from 'vue';
import Vuex from 'vuex';
//plugins
import modules from './modules';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: modules,
  state: {
    businessImage: '/img/viktorjjf.png',
    maxPaginationButtons: 15,
    itemsPerPage: 20,
    snackbar: {
      text: '',
      active: false,
      color: 'success',
    },
    toolbar: {
      drawerIcon: null,
    },
    overlay: {
      active: false,
    },
  },
  mutations: {
    showOverlay(state, active) {
      state.overlay.active = active;
    },
  },
  actions: {
    showOverlay({ commit }, active) {
      commit('showOverlay', active);
    },
  },
});
