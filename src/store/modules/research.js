//usar esto para paginacion con servidor
// import api from '@/services/api/brands';
// import {
//   buildSuccess,
//   handleError,
//   buildQueryWithPagination,
// } from '@/utils/utils.js';
import { getCitation } from '@/tools/referenceGenerator';
import { orderFiguresAndTablesNumeration } from '@/tools/orderFiguresAndTables';
import { generateMatrix } from '@/tools/researchFunctions';

const module = {
  namespaced: true,
  state: {
    characteristics: {
      level: null,
      design: null,
      type: null,
      title: null,
      variables: null,
      instruments: null,
    },
    styles: {},
    coverPage: {},
    body: {},
    references: [],
    annexes: [],
    images: [],
    tables: [],
    researchIndexes: [],
  },
  actions: {
    addResearchIndex({ commit }, payload) {
      commit('addResearchIndex', payload);
    },
    addLevel3Element({ commit }, payload) {
      commit('addLevel3Element', payload);
    },
    loadResearch({ commit }, payload) {
      commit('loadResearch', payload);
    },
    updateResearchDynamically({ commit }, payload) {
      commit('updateResearchDynamically', payload);
    },
    updateCoverPageDynamically({ commit }, payload) {
      commit('updateCoverPageDynamically', payload);
    },
    updateReferences({ commit }, payload) {
      commit('updateReferences', payload);
    },
    updateQtyReferences({ commit }, payload) {
      commit('updateQtyReferences', payload);
    },
    updateCitationsDynamically({ commit }, payload) {
      commit('updateCitationsDynamically', payload);
    },
    updateImages({ commit }, payload) {
      commit('updateImages', payload);
    },
    updateTables({ commit }, payload) {
      commit('updateTables', payload);
    },
    updateTypeAndDesign({ commit }, payload) {
      commit('updateTypeAndDesign', payload);
    },
    updateVariables({ commit }, payload) {
      commit('updateVariables', payload);
    },
    updateTitle({ commit }, payload) {
      commit('updateTitle', payload);
    },
    updateMatrix({ commit }, payload) {
      commit('updateMatrix', payload);
    },
    updateAnnexesDynamically({ commit }, payload) {
      commit('updateAnnexesDynamically', payload);
    },
  },
  mutations: {
    addResearchIndex(state, payload) {
      let newIndex = payload.newIndex;
      state.researchIndexes.push(newIndex);
    },
    loadResearch(state, payload) {
      state.body = payload.body;
      state.styles = payload.styles;
      state.coverPage = payload.coverPage;
      state.references = payload.references;
      state.annexes = payload.annexes;
      state.images = payload.images;
      state.tables = payload.tables;
      state.characteristics = payload.characteristics;
      state.researchIndexes = payload.researchIndexes;
    },
    updateReferences(state, payload) {
      state.references = payload.references;
    },
    updateQtyReferences(state, payload) {
      let referenceId = payload.referenceId;
      if (referenceId != 'OWN') {
        let qty = payload.qty;
        let referenceIndex = state.references.findIndex(
          (reference) => reference.id == referenceId,
        );
        if (referenceIndex >= 0) {
          state.references[referenceIndex].qty += qty;
          if (state.references[referenceIndex].qty < 0) {
            state.references[referenceIndex].qty = 0;
          }
        }
      }
    },
    updateCitationsDynamically(state, payload) {
      let level1Index = payload.level1Index;
      let level2Index = payload.level2Index;
      let citations = payload.citations;
      state.body.level1[level1Index].level2[level2Index].citations = citations;
    },
    updateImages(state, payload) {
      let action = payload.action;
      switch (action) {
        case 'create':
          let newImage = payload.values;
          orderFiguresAndTablesNumeration(state.images, newImage, (result) => {
            state.images = result;
          });
          break;
        case 'update':
          console.log('actualizando imagenes');
          break;
        case 'delete':
          let index = state.images.findIndex((image) => image.id == payload.id);
          state.images.splice(index, 1);
          break;
        default:
          return 'Define the action';
      }
    },
    updateTables(state, payload) {
      let action = payload.action;
      switch (action) {
        case 'create':
          let newtable = payload.values;
          orderFiguresAndTablesNumeration(state.tables, newtable, (result) => {
            state.tables = result;
          });
          break;
        case 'update':
          let tableId = payload.tableId;
          let newValues = payload.values;
          let tableToUpdate = state.tables.find((table) => table.id == tableId);
          tableToUpdate.tableValues = newValues.tableValues;
          tableToUpdate.editorData = newValues.editorData;
          tableToUpdate.title = newValues.title;
          tableToUpdate.takenFrom = newValues.takenFrom;
          console.log('actualizando tabla');
          break;
        case 'delete':
          let index = state.tables.findIndex((table) => table.id == payload.id);
          state.tables.splice(index, 1);
          break;
        default:
          return 'Define the action';
      }
    },
    updateResearchDynamically(state, payload) {
      // let typeOfElement = payload.type;
      // let value = payload.value;
      // let level1TitlesLength = state.body.level1.length;
      // for (let i = 0; i < level1TitlesLength; i++) {
      //     let level2TitlesLength = state.body.level1[i].level2.length;
      //     for (let j = 0; j < level2TitlesLength; j++) {
      //         if (state.body.level1[i].level2[j].type == typeOfElement) {
      //             return state.body.level1[i].level2[j].values = value;
      //         }
      //     }
      // }
      let level1Index, level2Index, level3Index, level4Index, typeOfElement;
      let values = payload.values;
      level1Index = payload.level1Index; // como minino debe tener index de nivel 1
      if (
        payload.hasOwnProperty('level2Index') &&
        !payload.hasOwnProperty('level3Index')
      ) {
        level2Index = payload.level2Index;
        state.body.level1[level1Index].level2[level2Index].values = values;
        typeOfElement = state.body.level1[level1Index].level2[level2Index].type;
      }
      if (
        payload.hasOwnProperty('level3Index') &&
        !payload.hasOwnProperty('level4Index')
      ) {
        level2Index = payload.level2Index;
        level3Index = payload.level3Index;
        state.body.level1[level1Index].level2[level2Index].level3[
          level3Index
        ].values = values;
        typeOfElement =
          state.body.level1[level1Index].level2[level2Index].level3[level3Index]
            .type;
      }
      if (payload.hasOwnProperty('level4Index')) {
        level2Index = payload.level2Index;
        level3Index = payload.level3Index;
        level4Index = payload.level4Index;
        state.body.level1[level1Index].level2[level2Index].level3[
          level3Index
        ].level4[level4Index].values = values;
        typeOfElement =
          state.body.level1[level1Index].level2[level2Index].level3[level3Index]
            .level4[level4Index].type;
      }
      if (
        typeOfElement == 'objetives' ||
        typeOfElement == 'hypothesis' ||
        typeOfElement == 'problemDefinition'
      ) {
        // generateMatrix();
      }
    },
    addLevel3Element(state, payload) {
      let [level1Index, level2Index] = [
        payload.level1Index,
        payload.level2Index,
      ];
      state.body.level1[level1Index].level2[level2Index].level3 =
        payload.values;
    },
    updateCoverPageDynamically(state, payload) {
      let typeOfElement = payload.type;
      let value = payload.value;
      let basicInformationLength = state.coverPage.basicInformation.length;
      for (let i = 0; i < basicInformationLength; i++) {
        if (state.coverPage.basicInformation[i].type == typeOfElement) {
          return (state.coverPage.basicInformation[i].value = value);
        }
      }
    },
    updateTypeAndDesign(state, payload) {
      state.characteristics.design = payload.design;
      state.characteristics.type = payload.type;
      state.characteristics.level = payload.level;
    },
    updateVariables(state, payload) {
      state.characteristics.variables = payload.variables;
      console.log('se empezara a generar la matriz desde updateVariables');
      generateMatrix();
    },
    updateTitle(state, payload) {
      state.characteristics.title = payload.title;
    },
    updateMatrix(state, payload) {
      state.characteristics.matrix = payload.matrix;
    },
    updateAnnexesDynamically(state, payload) {
      let typeOfElement = payload.type;
      let value = payload.value;
      let indexToUpdate = state.annexes.findIndex(
        (annex) => annex.type == typeOfElement,
      );
      state.annexes[indexToUpdate].values = value;
      console.log('se termino de actualizar los anexos');
    },
  },
  getters: {
    level1Titles(state) {
      return state.body.level1;
    },
    /**indexes [1,1,1,1] array max level 4*/
    getResearchData: (state) => (indexes) => {
      let level = indexes.length;
      if (level > 0) {
        switch (level) {
          case 1:
            return state.body.level1[indexes[0]];
          case 2:
            return state.body.level1[indexes[0]].level2[indexes[1]];
          case 3:
            return state.body.level1[indexes[0]].level2[indexes[1]].level3[
              indexes[2]
            ];
          case 4:
            return state.body.level1[indexes[0]].level2[indexes[1]].level3[
              indexes[2]
            ].level4[indexes[3]];

          default:
            break;
        }
      } else {
        console.log('se mando un indice erroneo - getter');
        return {};
      }
    },
    getDataFromBody: (state) => (typeOfResearchElement) => {
      console.log('se recibio el tipo: ', typeOfResearchElement);
      let body = state.body;
      let level1TitlesLength = state.body.level1.length;
      for (let i = 0; i < level1TitlesLength; i++) {
        let level1ElementType = body.level1[i].type;
        if (level1ElementType == typeOfResearchElement) {
          return body.level1[i];
        }
        if (body.level1[i].hasOwnProperty('level2')) {
          let level2TitlesLength = body.level1[i].level2.length;
          for (let j = 0; j < level2TitlesLength; j++) {
            let level2ElementType = body.level1[i].level2[j].type;
            if (level2ElementType == typeOfResearchElement) {
              return body.level1[i].level2[j];
            }
            let hasLevel3 = body.level1[i].level2[j].level3.length;
            if (hasLevel3) {
              for (let k = 0; k < hasLevel3; k++) {
                let hasLevel4 =
                  body.level1[i].level2[j].level3[k].level4.length;
                let level3ElementType = body.level1[i].level2[j].level3[k].type;
                if (level3ElementType == typeOfResearchElement) {
                  return body.level1[i].level2[j].level3[k];
                }
                if (hasLevel4) {
                  for (let l = 0; l < hasLevel4; l++) {
                    let level4ElementType =
                      body.level1[i].level2[j].level3[k].level4[l].type;
                    if (level4ElementType == typeOfResearchElement) {
                      return body.level1[i].level2[j].level3[k].level4[l];
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    getDataFromAnnexes: (state) => (typeOfAnnex) => {
      let annexes = state.annexes;
      for (let i = 0; i < annexes.length; i++) {
        if (annexes[i].type == typeOfAnnex) {
          console.log(
            'se encontro el anexo: ',
            annexes[i].values.matrixContent,
          );
          return annexes[i].values.matrixContent;
        }
      }
    },
    getResearchIndex: (state) => (typeOfElement) => {
      let index, object;
      object = state.researchIndexes.find(
        (element) => element.type == typeOfElement,
      );
      if (object) {
        index = object.index;
        return index;
      } else
        console.log('hubo un problema buscando el indice del del elemento');
    },
    getReference: (state) => (id, type) => {
      if (id != 'OWN') {
        return getCitation(
          state.references.find((reference) => reference.id == id),
          type,
        );
      } else {
        return 'Elaboración propia';
      }
    },
    getTable: (state) => (id) => {
      return state.tables.find((table) => table.id == id);
    },
  },
};

export default module;
