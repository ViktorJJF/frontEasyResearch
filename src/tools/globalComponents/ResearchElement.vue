<template>
  <v-container>
    <!-- <h3>{{title?titleNumeration+title:""}}</h3> -->
    <v-row class="mb-3">
      <v-col>
        <span class="title">{{ title }}</span>
        <help-selector :type="type"></help-selector>
      </v-col>
    </v-row>
    <draggable
      v-model="elements"
      handle=".my-handle"
      :animation="300"
      @change="onMoveElement"
    >
      <transition-group>
        <div
          v-for="(element, index) in elements"
          :key="element.id"
          color="purple lighten-2"
          fill-dot
          right
          class="mb-3"
        >
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" color="tertiary" dark small>
                <v-icon class="my-handle">mdi-gesture-swipe-up</v-icon>
              </v-btn>
            </template>
            <span>Arrastra el párrafo</span>
          </v-tooltip>
          <v-card outlined>
            <v-card-text>
              <research-image-component
                v-if="element.type == 'image'"
                :data="element"
                :index="index"
                @click="elementClicked(index)"
                ref="elementRef"
                @onDeleteImage="deleteImage"
                @onUpdateImage="updateImage"
              ></research-image-component>
              <research-paragraph-component
                v-if="element.type == 'text'"
                :data="element"
                :index="index"
                :paragraphCitations="citationsData"
                @click="elementClicked(index)"
                ref="elementRef"
                @onDeleteParagraph="deleteParagraph"
                @onUpdateParagraph="updateParagraph"
              ></research-paragraph-component>
              <research-table-component
                v-if="element.type == 'table'"
                :data="element"
                :index="index"
                @click="elementClicked(index)"
                ref="elementRef"
                @onDeleteTable="deleteTable"
                @onUpdateTable="updateTable"
              ></research-table-component>
            </v-card-text>
          </v-card>
        </div>
      </transition-group>
    </draggable>
    <v-divider></v-divider>
    <p>
      Agregue nuevos elementos
      <v-icon small color="amber">mdi-plus-circle</v-icon>
    </p>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          color="tertiary"
          @click="addElement"
          outlined
          small
          dark
        >
          <v-icon>mdi-pen</v-icon>
        </v-btn>
      </template>
      <span>Agregar nuevo párrafo</span>
    </v-tooltip>

    <research-modal
      ref="imageModal"
      tooltipText="Agregar nueva imagen"
      btnIcon="mdi-image"
      title="Agregar imagen"
    >
      <upload-image-component
        slot="modalBody"
        @onUploadImage="updateStoreImages"
      ></upload-image-component>
    </research-modal>
    <research-modal
      ref="tableModal"
      tooltipText="Agregar nueva tabla"
      btnIcon="mdi-table"
      title="Agregar tabla"
    >
      <insert-table-component
        slot="modalBody"
        @onInsertTable="updateStoreTables"
      ></insert-table-component>
    </research-modal>
  </v-container>
</template>

<script>
import helpSelector from '../../views/pages/thesisHelp/helpSelector';
import { mapState } from 'vuex';
import { generateObjectId } from '../../tools/objectIdGenerator';
import { customCopyObject } from '../../tools/customCopyObject';
import { textElement } from '../../tools/researchElementTemplates';
export default {
  components: {
    helpSelector,
  },
  props: [
    'addButtonText',
    'data',
    'citationsData',
    'indexElement',
    'title',
    'completeObject',
    'type',
  ],
  data() {
    return {
      typeOfElementToAdd: -1,
      dialog: false,
      elements: this.data,
      textAreaValue: '',
      selectedElement: null,
    };
  },
  computed: {
    ...mapState('research', ['images']),
    titleNumeration() {
      return (
        this.indexElement[0] +
        1 +
        '.' +
        (this.indexElement[1] + 1) +
        '.' +
        (this.indexElement[2] + 1 ? this.indexElement[2] + 1 + '.' : ' ') +
        (this.indexElement[3] != null ? this.indexElement[3] + 1 + '. ' : ' ')
      );
    },
  },
  methods: {
    onMoveElement() {
      console.log('se movio un elemento!');
      this.onChangeData();
    },
    updateStoreImages(newImagePath, title, takenFrom) {
      let globalId = generateObjectId();
      //updateLocalImage
      this.elements.push({
        id: generateObjectId(),
        type: 'image',
        idGlobalImage: globalId,
      });
      //updateGlobalImage
      console.log('Indice del objecto: ', [
        ...this.indexElement,
        this.elements.length - 1,
      ]);
      let payload = {
        action: 'create',
        values: {
          id: globalId,
          path: newImagePath,
          title: title,
          takenFrom: takenFrom,
          pathInsideObject: [...this.indexElement, this.elements.length - 1],
        },
      };
      this.$store.dispatch('research/updateImages', payload);
      this.onChangeData();
      //closing dialog
      this.$refs.imageModal.closeDialog();
    },
    updateStoreTables(tableValues, editorData, title, takenFrom) {
      let globalId = generateObjectId();
      //updateLocalTable
      this.elements.push({
        id: generateObjectId(),
        type: 'table',
        idGlobalTable: globalId,
      });
      //updateGlobalTable
      console.log('Indice de la tabla: ', [
        ...this.indexElement,
        this.elements.length - 1,
      ]);
      let payload = {
        action: 'create',
        values: {
          id: globalId,
          tableValues: tableValues,
          editorData: editorData,
          title: title,
          takenFrom: takenFrom,
          pathInsideObject: [...this.indexElement, this.elements.length - 1],
        },
      };
      this.$store.dispatch('research/updateTables', payload);
      this.onChangeData();
      this.$refs.tableModal.closeDialog();
    },
    elementClicked(index) {
      console.log('elemento seleccionado: ', [...this.indexElement, index]);

      // console.log("total de refs: ", this.$refs);
      // console.log("total de refs: ", this.$refs.paragraphRef);
      // console.log("ref: ", this.$refs.textAreaRef.$refs.input.selectionStart);
      // console.log("total: ", this.$refs.textAreaRef.$refs.input.length);
      // console.log("parrafo clickeado: ", this.$refs.paragraphRef);
    },
    addElement() {
      this.elements.push(textElement('Modifica este elemento'));
      // this.textAreaValue = "";
    },
    deleteParagraph(index) {
      this.elements.splice(index, 1);
      this.onChangeData();
    },
    deleteImage(localIndex, globalId) {
      this.elements.splice(localIndex, 1);
      let payload = {
        action: 'delete',
        id: globalId,
      };
      this.$store.dispatch('research/updateImages', payload);
      this.onChangeData();
    },
    deleteTable(localIndex, globalId) {
      this.elements.splice(localIndex, 1);
      let payload = {
        action: 'delete',
        id: globalId,
      };
      this.$store.dispatch('research/updateTables', payload);
      this.onChangeData();
    },
    updateParagraph(index, text) {
      this.elements[index].text = text;
      this.onChangeData();
    },
    updateImage(index, text) {
      this.elements[index].text = text;
      this.onChangeData();
    },
    updateTable(index, text) {
      this.elements[index].text = text;
      this.onChangeData();
    },
    onChangeData() {
      console.log('actualizando datos de store...');
      console.log('se esta enviando: ', this.elements);

      let level1Index = this.indexElement[0];
      let level2Index = this.indexElement[1];
      let levelNumber = this.indexElement.length;
      console.log('el tamaño es de:', levelNumber);
      if (levelNumber == 2) {
        // level 2
        this.completeObject.values = this.elements;
      }
      if (levelNumber == 3) {
        // level 3
        let level3Index = this.indexElement[2];
        this.completeObject.level3[level3Index].values = this.elements;
      }
      if (levelNumber == 4) {
        // level 4
        let level3Index = this.indexElement[2];
        let level4Index = this.indexElement[3];
        this.completeObject.level3[level3Index].level4[
          level4Index
        ].values = this.elements;
      }
      let payload = {
        level1Index: level1Index,
        level2Index: level2Index,
        values: customCopyObject(this.completeObject),
      };
      this.$store.dispatch('research/updateResearchDynamically', payload);
      this.$emit('onUpdate');
    },
  },
};
</script>

<style scoped>
</style>
