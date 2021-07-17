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
    // snackbar: {
    //   text: '',
    //   active: false,
    //   color: 'success',
    // },
    toolbar: {
      drawerIcon: null,
    },
    overlay: {
      active: false,
    },
    companyName: 'EasyResearch',
    auth: {
      first_name: '',
      last_name: '',
      email: '',
      avatar: '',
    },
    level2Titles: [],
    drawer: null,
    snackbar: true,
  },
  mutations: {
    showOverlay(state, active) {
      state.overlay.active = active;
    },
    setAuthUserDetail(state, auth) {
      for (let key of Object.keys(auth)) {
        state.auth[key] = auth[key];
      }
      if ('avatar' in auth)
        state.auth.avatar = auth.avatar !== null ? auth.avatar : 'avatar.png';
    },
    resetAuthUserDetail(state) {
      for (let key of Object.keys(state.auth)) {
        state.auth[key] = '';
      }
    },
    setConfig(state, config) {
      for (let key of Object.keys(config)) {
        state.config[key] = config[key];
      }
    },
    setLevel2Titles(state, payload) {
      state.level2Titles = payload;
    },
    setDrawerStatus(state) {
      state.drawer = !state.drawer;
    },
    setSnackbarStatus(state, payload) {
      state.snackbar = payload;
    },
  },
  actions: {
    showOverlay({ commit }, active) {
      commit('showOverlay', active);
    },
    updateResearch({ commit }) {
      commit('updateResearch');
    },
    setAuthUserDetail({ commit }, auth) {
      commit('setAuthUserDetail', auth);
    },
    resetAuthUserDetail({ commit }) {
      commit('resetAuthUserDetail');
    },
    setConfig({ commit }, data) {
      commit('setConfig', data);
    },
    setLevel2Titles({ commit }, payload) {
      commit('setLevel2Titles', payload);
    },
    setDrawerStatus({ commit }) {
      commit('setDrawerStatus');
    },
    setSnackbarStatus({ commit }, payload) {
      commit('setSnackbarStatus', payload);
    },
  },
  getters: {
    getAuthUser: (state) => (name) => {
      return state.auth[name];
    },
    getAuthUserEmail: (state) => {
      return state.auth.email;
    },
    getAuthUserFullName: (state) => {
      return state.auth['first_name'] + ' ' + state.auth['last_name'];
    },
    getConfig: (state) => (name) => {
      return state.config[name];
    },
    getLevel2Titles: (state) => (order) => {
      return state.level2Titles[order];
    },
  },
});
