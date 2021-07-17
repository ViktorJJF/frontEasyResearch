<template>
  <v-card outlined>
    <v-container fluid>
      <v-hover v-slot:default="{ hover }">
        <v-container>
          <!-- <citations-component :citationsData="citationsToShow"></citations-component> -->
          <div v-if="!editMode">
            <p class="body-1" v-if="citations.length == 0" v-html="text" />
            <span
              class="body-1"
              v-else
              v-for="(text, i) in splitedText"
              :key="text"
            >
              {{ text }}
              <div
                v-if="i <= citations.length - 1"
                class="citation hoverContainer"
              >
                <ins class="element">{{
                  formattedCitation(
                    citations[i].typeOfCitation,
                    citations[i].referenceId,
                  )
                }}</ins>
                <div class="topElement" outlined>
                  <v-list dense>
                    <v-list-item-group color="primary">
                      <v-list-item @click="changeCitationFormat(i, 1)">
                        <v-list-item-content
                          >Formato por defecto</v-list-item-content
                        >
                      </v-list-item>
                      <v-divider></v-divider>
                      <v-list-item @click="changeCitationFormat(i, 2)">
                        <v-list-item-content
                          >Mostrar como: Autor(Año)</v-list-item-content
                        >
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </div>
              </div>
            </span>
          </div>
          <!-- <ckeditor
            v-else
            ref="paragraphRef"
            :editor="editor"
            v-model="text"
            :config="editorConfig"
            :disabled="editorDisabled"
            @focus="onEditorFocus"
          ></ckeditor>
          <p>La posicion del cursor es: {{cursorPosition}}</p>
          <v-btn color="success" @click="editorClick">Clickeame</v-btn>
          <p>{{editorData}}</p>-->
          <v-textarea
            placeholder="Empieza a editar este párrafo"
            counter
            autofocus
            clearable
            ref="paragraphRef"
            @click="paragraphClicked"
            v-show="editMode"
            v-model="text"
            label="Edición"
            height="200%"
            auto-grow
          ></v-textarea>
          <v-expand-transition>
            <div v-show="hover">
              <v-btn
                outlined
                small
                color="primary"
                @click="activateEditMode"
                v-if="!editMode"
                >Editar</v-btn
              >
              <v-btn
                outlined
                v-if="editMode"
                small
                color="success"
                @click="
                  editMode = !editMode;
                  onUpdateParagraph(index, text);
                "
                >Guardar</v-btn
              >
              <reference-button
                v-if="editMode"
                :paragraphIndex="index"
                @addTextCitationEvent="addCitation"
              />
              <v-btn
                v-if="!editMode"
                outlined
                small
                color="error"
                @click="onDeleteParagraph(index)"
                >Eliminar</v-btn
              >
              <v-btn
                v-if="editMode"
                outlined
                small
                color="error"
                @click="cancelAction()"
                >Cancelar</v-btn
              >
            </div>
          </v-expand-transition>
        </v-container>
      </v-hover>
    </v-container>
  </v-card>
</template>

<script>
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor.js';
// import '@ckeditor/ckeditor5-build-classic/build/translations/es';
// import indent from "ckeditor5-indent-text/src/indent-text";

import { generateObjectId } from '../../tools/objectIdGenerator';
export default {
  props: ['data', 'index', 'paragraphCitations'],
  data() {
    return {
      cursorPosition: null,
      //   editor: ClassicEditor,
      editorDisabled: false,
      editorData: '',
      tableValues: '',
      editorConfig: {
        language: 'es',
        toolbar: {
          items: [
            'bold',
            'italic',
            'bulletedList',
            'numberedList',
            '|',
            'undo',
            'redo',
          ],
        },
      },
      //others
      selectedCitation: null,
      showCitationOptions: false,
      citations: this.paragraphCitations,
      text: '',
      splitedText: [],
      type: this.data.type,
      editMode: false,
    };
  },
  computed: {
    citationsToShow() {
      return this.paragraphCitations;
    },
  },
  mounted() {
    this.text = this.data.text;
    this.normalizeParagraph();
    this.setCitationMenu();
  },
  watch: {
    text() {
      if (this.citations.length > 0) {
        // this.deleteCitation(this.text, this.citations);
      }
    },
  },
  methods: {
    onEditorFocus(editor) {
      console.log('Ck editor fue seleccionado');
      console.log('es este: ', editor);
      // console.log(
      //   "es este: ",
      //   editor.path[0].selection._selection._ranges[0].start.offset
      // );
      this.cursorPosition =
        editor.path[0].selection._selection._ranges[0].start;
      // this.globalEditor = editor.model;
    },
    editorClick() {
      console.log(
        'este es el texto seleccionado: ',
        this.globalEditor.getSelectedContent(),
      );
      // let cursorPosition = this.$refs.paragraphRef.$refs.input.selectionStart;
    },
    normalizeParagraph() {
      this.citations.forEach((citation) => {
        this.text = this.text.replace(
          citation.id,
          this.formattedCitation(citation.typeOfCitation, citation.referenceId),
        );
      });
    },
    activateEditMode() {
      this.editMode = !this.editMode;
    },
    changeCitationFormat(index, type) {
      this.citations[index].typeOfCitation = type;
      let newText = '';
      this.splitedText.forEach((text, i) => {
        newText += text;
        if (i <= this.citations.length - 1) {
          newText += this.formattedCitation(
            this.citations[i].typeOfCitation,
            this.citations[i].referenceId,
          );
        }
      });
      this.text = newText;
      this.onUpdateParagraph(this.index, this.text);
    },
    formattedCitation(type, referenceid) {
      return this.$store.getters['research/getReference'](referenceid, type);
    },
    setCitationMenu() {
      if (this.citations.length > 0) {
        let newText = this.text,
          citationIds = [],
          cite = '';
        this.citations.forEach((citation) => {
          cite = this.formattedCitation(
            citation.typeOfCitation,
            citation.referenceId,
          );
          console.log('la cita es: ', cite);
          console.log('el texto anterior: ', newText);
          newText = newText.replace(
            this.formattedCitation(
              citation.typeOfCitation,
              citation.referenceId,
            ),
            `<cite>${citation.id}<cite>`,
          );
          console.log('el nuevo texto es: ', newText);
        });
        let regex = /<cite>.+?<cite>/g;
        console.log(`se buscara la expresion:${regex}`);
        citationIds = newText.match(/<cite>.+?<cite>/g);
        console.log('el nuevo citationIds es', citationIds);
        if (citationIds) {
          for (let i = 0; i < citationIds.length; i++) {
            citationIds[i] = citationIds[i].replace(/<cite>/g, '');
          }
          let orderedCitations = [];
          citationIds.forEach((citationId) => {
            orderedCitations.push(
              this.citations.find((citation) => citation.id == citationId),
            );
          });
          this.citations = orderedCitations;
          console.log('cita ordenada: ', orderedCitations);
          this.splitedText = newText.split(regex);
        }
      }
    },
    cancelAction() {
      this.editMode = false;
      this.text = this.data.text;
    },
    onDeleteParagraph(index) {
      this.deleteAllCitations(this.citations);
      this.$emit('onDeleteParagraph', index);
    },
    onUpdateParagraph(index, text) {
      this.setCitationMenu();
      let textWithCitationId = text;
      this.citations.forEach((citation) => {
        textWithCitationId = textWithCitationId.replace(
          this.formattedCitation(citation.typeOfCitation, citation.referenceId),
          citation.id,
        );
      });
      console.log('se guardara el texto: ', textWithCitationId);
      this.deleteCitation(this.text, this.citations);
      this.$emit(
        'onUpdateParagraph',
        index,
        textWithCitationId,
        this.citations,
      );
    },
    paragraphClicked() {
      // this.$emit("click", this.$refs.paragraphRef.$refs.input.selectionStart);
      console.log('se hizo click');
    },
    addCitation(InTextCitation, referenceId, typeOfCitation) {
      let text = this.text;
      let cursorPosition = this.$refs.paragraphRef.$refs.input.selectionStart;
      let cursorPositionEnd = text.length;
      let firstPart = text.substring(0, cursorPosition);
      let secondPart = text.substring(cursorPosition, cursorPositionEnd);
      this.text = firstPart + InTextCitation + secondPart;
      this.citations.push({
        typeOfCitation: typeOfCitation,
        referenceId,
        id: generateObjectId(),
      });
      this.updateQtyReference(referenceId, 1);
    },
    updateQtyReference(referenceId, qty) {
      let payload = {
        referenceId,
        qty: qty,
      };
      this.$store.dispatch('research/updateQtyReferences', payload);
    },
    deleteAllCitations(citations) {
      citations.forEach((citation) => {
        this.updateQtyReference(citation.referenceId, -1);
      });
    },
    deleteCitation(paragraph, citations) {
      let j = 0;
      let copyParagraph = paragraph;
      while (j < this.citations.length) {
        let citation = citations[j];
        let cite = this.formattedCitation(
          citation.typeOfCitation,
          citation.referenceId,
        );
        console.log('se verificara la cita: ', cite);
        let exist = copyParagraph.includes(cite);
        if (!exist) {
          console.log('la cita no existe y se procedera a borrar');
          // confirm(
          //   `¿Seguro que deseas eliminar esta cita : ${this.formattedCitation(
          //     citation.typeOfCitation,
          //     citation.referenceId
          //   )}?`
          // ) &&
          citations.splice(j, 1);
          this.updateQtyReference(citation.referenceId, -1);
          j = 0;
        } else {
          console.log('la cita existe y no se hara nada');
          copyParagraph = copyParagraph.replace(cite, '');
          console.log('el nuevo texto es: ');
          j++;
        }
      }
    },
  },
};
</script>

<style scoped>
.hoverContainer {
  position: relative;
  display: inline-block;
  cursor: pointer;
}
.hoverContainer:hover .element {
  text-decoration: underline;
}
.hoverContainer:hover .topElement {
  opacity: 1;
  visibility: visible;
  /* display: inline-block; */
}
.element {
  transition: 0.3s ease;
  text-decoration: none;
  color: blue;
}
.hoverContainer .topElement {
  visibility: hidden;
  width: 150px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  left: 50%;
  margin-left: -60px;
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
  bottom: 110%;

  /* Fade in tooltip */
  opacity: 0;
  transition: opacity 0.3s;
}
.hoverContainer .topElement::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}
</style>
