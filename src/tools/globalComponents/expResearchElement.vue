<template>
  <div>
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
              <v-btn
                v-show="elements.length > 1"
                v-on="on"
                color="tertiary"
                dark
                small
              >
                <v-icon class="my-handle">mdi-gesture-swipe-up</v-icon>
              </v-btn>
            </template>
            <span>Arrastra el párrafo</span>
          </v-tooltip>
          <v-card outlined>
            <research-image-component
              v-if="element.type == 'image'"
              :data="element"
              :index="index"
              @click="elementClicked(index)"
              ref="elementRef"
              @onDeleteImage="deleteImage"
            ></research-image-component>
            <research-paragraph-component
              v-if="element.type == 'text'"
              :data="element"
              :index="index"
              :paragraphCitations="element.citations"
              @click="elementClicked(index)"
              ref="elementRef"
              @onDeleteParagraph="deleteParagraph"
              @onUpdateParagraph="updateParagraph"
              :id="'paragraph' + indexElement.join('-') + index"
            ></research-paragraph-component>
            <research-table-component
              v-if="element.type == 'table'"
              :data="element"
              :index="index"
              @click="elementClicked(index)"
              ref="elementRef"
              @onDeleteTable="deleteTable"
            ></research-table-component>
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
        insertForm
        slot="modalBody"
        @onInsertTable="insertTable"
      ></insert-table-component>
    </research-modal>
  </div>
</template>

<script>
import { generateObjectId } from '../../tools/objectIdGenerator';
import { Paragraph } from '../../classes/Paragraph';
export default {
  props: ['data', 'type'],
  data() {
    return {
      elements: this.data,
      indexElement: this.$store.getters['research/getResearchIndex'](this.type),
    };
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
    insertTable(tableValues, editorData, title, takenFrom) {
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
    },
    addElement() {
      this.elements.push(Paragraph(''));
      let newParagraphIndex = this.elements.length - 1;
      this.$nextTick(() => {
        console.log(this.$refs.elementRef[newParagraphIndex]);
        this.$refs.elementRef[newParagraphIndex].editMode = true;
        this.$vuetify.goTo(
          `#paragraph${this.indexElement.join('-')}${newParagraphIndex}`,
          {
            duration: 180,
            offset: 300,
          },
        );
      });
      this.onChangeData();
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
      if (confirm('¿Seguro que deseas eliminar esta tabla?')) {
        this.elements.splice(localIndex, 1);
        let payload = {
          action: 'delete',
          id: globalId,
        };
        this.$store.dispatch('research/updateTables', payload);
        this.onChangeData();
      }
    },
    updateParagraph(index, text, citations) {
      this.elements[index].text = text;
      this.elements[index].citations = citations;
      this.onChangeData();
    },
    onChangeData() {
      let indexes = this.indexElement;
      let payload = {
        level1Index: indexes[0],
        level2Index: indexes[1],
        values: this.elements,
      };
      if (indexes.length > 2) {
        payload['level3Index'] = indexes[2];
      }
      if (indexes.length > 3) {
        payload['level4Index'] = indexes[3];
      }
      this.$store.dispatch('research/updateResearchDynamically', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
