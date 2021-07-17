<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <!-- <ckeditor
          ref="richText"
          :editor="editor"
          v-model="editorData"
          :config="editorConfig"
          :disabled="editorDisabled"
        ></ckeditor>-->
      </v-col>
    </v-row>
    <div class="text-center">
      <v-text-field name="name" label="Título" v-model="title"></v-text-field>
      <v-autocomplete
        v-model="takenFrom"
        :disabled="own"
        :hint="'Fuente: ' + getCitation(takenFrom)"
        :items="references"
        :return-object="true"
        item-text="title"
        label="Fuente"
        no-data-text="No hay referencias disponibles"
      ></v-autocomplete>
      <v-checkbox
        color="primary"
        v-model="own"
        label="Elaboración propia"
      ></v-checkbox>
    </div>
    <v-row justify="end">
      <v-btn v-show="insertForm" color="success" @click="onInsertTable"
        >Insertar</v-btn
      >
      <v-btn v-show="updateForm" color="success" @click="onUpdateTable(tableId)"
        >Guardar</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
import parser from 'html2json';
import { mapState } from 'vuex';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor.js';
import { getCitation } from '../../tools/referenceGenerator';
export default {
  props: {
    tableId: {
      type: String,
      default: null,
    },
    insertForm: {
      type: Boolean,
      default: false,
    },
    updateForm: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //   editor: ClassicEditor,
      editorDisabled: false,
      editorData: '',
      tableValues: '',
      editorConfig: {
        language: {
          // The UI will be in English.
          ui: 'es',

          // But the content will be edited in Arabic.
          content: 'es',
        },
        readOnly: false,
        toolbar: {
          items: ['insertTable', 'bold', 'italic', 'link', '|', 'undo', 'redo'],
        },
      },
      title: '',
      takenFrom: null,
      initialTakenFromId: null,
      editMode: false,
      own: false,
      dataTable: null,
    };
  },
  beforeMount() {
    console.log('se monto el insertTable');
    this.initialData();
  },
  methods: {
    getCitation(reference) {
      if (reference) {
        return getCitation(reference, 1);
      }
    },
    initialData() {
      if (this.tableId) {
        let dataTable = this.$store.getters['research/getTable'](this.tableId);
        this.editorData = dataTable.editorData;
        this.title = dataTable.title;
        console.log('object');
        console.log('el dataTable es: ', dataTable);
        console.log('el id de la tabla es: ', dataTable.takenFrom);
        if (dataTable.takenFrom != 'OWN') {
          this.takenFrom = this.$store.state.research.references.find(
            (reference) => reference.id == dataTable.takenFrom,
          );
          console.log('el takenFrom de inicio es: ', this.takenFrom);
          if (!this.takenFrom) {
            console.log('colocando takenFrom Vacio');
            this.setEmptyTakenFrom('');
          } else {
            this.initialTakenFromId = this.takenFrom.id;
            console.log('el takenfrom inicial es: ', this.initialTakenFromId);
          }
        } else {
          this.setEmptyTakenFrom('OWN');
          this.own = true;
        }
      }
    },
    setEmptyTakenFrom(id) {
      this.takenFrom = {
        id: id,
        type: '',
        title: '',
        authors: [],
        fullAuthors: '',
        formated: '',
        year: 0,
        qty: 0,
      };
    },
    onUpdateTable(tableId) {
      this.getTableValues(this.editorData, (tableValues) => {
        console.log('el takenFrom antes de actualizar es: ', this.takenFrom);
        let payload = {};
        if (this.own) {
          payload = {
            action: 'update',
            tableId,
            values: {
              tableValues,
              editorData: this.editorData,
              title: this.title,
              takenFrom: 'OWN',
            },
          };
        } else {
          payload = {
            action: 'update',
            tableId,
            values: {
              tableValues,
              editorData: this.editorData,
              title: this.title,
              takenFrom: this.takenFrom.id,
            },
          };
        }

        this.$store.dispatch('research/updateTables', payload);
        console.log('este es el id inicial: ', this.initialTakenFromId);
        if (this.initialTakenFromId) {
          console.log(
            'se restara 1 a la referencia: ',
            this.initialTakenFromId,
          );
          this.updateQtyReference(this.initialTakenFromId, -1);
        }
        console.log('este es el id de takenFrom: ', this.takenFrom.id);
        if (this.takenFrom.id != 'OWN' && this.own == false) {
          console.log('se añadira 1 a la referencia: ', this.takenFrom.id);
          this.updateQtyReference(this.takenFrom.id, 1);
        }
        if (this.initialTakenFromId && this.own == true) {
          this.updateQtyReference(this.takenFrom.id, -1);
        }
        this.$emit('onUpdateTable');
      });
    },
    updateQtyReference(referenceId, qty) {
      let payload = {
        referenceId,
        qty: qty,
      };
      this.$store.dispatch('research/updateQtyReferences', payload);
    },
    onInsertTable() {
      this.getTableValues(this.editorData, (tableValues) => {
        if (this.own) {
          console.log('se insertara el own');
          this.$emit(
            'onInsertTable',
            tableValues,
            this.editorData,
            this.title,
            'OWN',
          );
        } else {
          console.log('se insertara lo normal');
          this.$emit(
            'onInsertTable',
            tableValues,
            this.editorData,
            this.title,
            this.takenFrom.id,
          );
          this.updateQtyReference(this.takenFrom.id, 1);
        }
        this.resetValues();
      });
    },
    resetValues() {
      this.editorData = '';
      this.title = '';
      this.takenFrom = '';
    },
    getTableValues(htmlData, callback) {
      let json = parser.html2json(this.editorData);
      let table = [];
      let rows = [];
      let rowsReference = json.child[0].child[0].child[0].child;
      rowsReference.forEach((row) => {
        row.child.forEach((cell) => {
          rows.push(
            cell.child[0].text
              ? cell.child[0].text.replace(/&nbsp;/g, ' ')
              : 'verifica esta celda', // de momento no soporte /n
          );
        });
        table.push(rows);
        rows = [];
      });
      callback(table);
      console.log('esto es toda la tabla: ', table);
    },
  },
  computed: {
    ...mapState('research', { references: (state) => state.references }),
  },
};
</script>
