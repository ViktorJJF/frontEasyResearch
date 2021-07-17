//usar esto para paginacion con servidor
// import api from '@/services/api/brands';
// import {
//   buildSuccess,
//   handleError,
//   buildQueryWithPagination,
// } from '@/utils/utils.js';

const module = {
  namespaced: true,
  state: {
    researcherProfile: {},
    template: {},
    styles: {},
    coverPageTemplate: {
      basicInformation: [],
      template: [],
    },
  },
  actions: {
    setProfileResearcher({ commit }, payload) {
      commit('setProfileResearcher', payload);
    },
    loadThesisTemplate({ commit }, payload) {
      commit('loadThesisTemplate', payload);
    },
    loadThesisStyles({ commit }, payload) {
      commit('loadThesisStyles', payload);
    },
    loadCoverPage({ commit }, payload) {
      commit('loadCoverPage', payload);
    },
    loadCoverPageBasicInformation({ commit }, payload) {
      commit('loadCoverPageBasicInformation', payload);
    },
    initializeResearchConfigDynamically({ commit }, payload) {
      commit('initializeResearchConfigDynamically', payload);
    },
    updateLevel2ElementText({ commit }, payload) {
      commit('updateLevel2ElementText', payload);
    },
  },
  mutations: {
    setProfileResearcher(state, payload) {
      console.log('se actualizara el perfil de investigador con: ', payload);
      state.researcherProfile = payload.researcherProfile;
    },
    loadThesisTemplate(state, payload) {
      console.log('se actualizara el template con: ', payload);
      state.template = payload.template;
    },
    loadThesisStyles(state, payload) {
      state.styles = payload;
    },
    loadCoverPage(state, payload) {
      state.coverPageTemplate.template = payload.coverPage;
    },
    loadCoverPageBasicInformation(state, payload) {
      state.coverPageTemplate.basicInformation = payload;
    },
    initializeResearchConfigDynamically(state, payload) {
      state.template = payload;
    },
    updateLevel2ElementText(state, payload) {
      let type = payload.typeOfElement;
      let newTag = payload.newTag;
      let level1, level2;
      console.log('llego este payload: ', payload);
      console.log('el template es: ', state);
      for (let i = 0; i < state.template.level1.length; i++) {
        level1 = state.template.level1[i];
        for (let j = 0; j < level1.level2.length; j++) {
          level2 = level1.level2[j];
          if (level2.type == type) {
            console.log('se encontro el tipo: ', type);
            level2.tag = newTag;
          }
        }
      }
    },
  },
  getters: {
    templateThesis(state) {
      return state.template;
    },
  },
};

export default module;
