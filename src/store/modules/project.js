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
    projects: [],
    currentProject: null,
  },
  actions: {
    addProject({ commit }, payload) {
      commit('addProject', payload);
    },
    setCurrentProject({ commit }, payload) {
      commit('setCurrentProject', payload);
    },
    updateConfigStatus({ commit }, payload) {
      commit('updateConfigStatus', payload);
    },
    loadProjects({ commit }, payload) {
      commit('loadProjects', payload);
    },
  },
  mutations: {
    setCurrentProject(state, payload) {
      state.currentProject = payload.currentProject;
    },
    loadProjects(state, payload) {
      state.projects = payload.projects;
    },
    addProject(state, payload) {
      state.projects.push(payload);
    },
    updateConfigStatus(state, payload) {
      console.log('actualizando config Status:');
      //update current Project
      state.currentProject.configStatus = payload.configStatus;
      //update project in array of projects
      let projectArrayIndex = state.projects.findIndex(
        (project) => project.dbId == state.currentProject.dbId,
      );
      console.log('se encontro index: ', projectArrayIndex);
      if (projectArrayIndex > -1)
        state.projects[projectArrayIndex].configStatus = payload.configStatus;
    },
  },
  getters: {},
};

export default module;
