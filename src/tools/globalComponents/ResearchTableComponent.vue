<template>
  <v-hover v-slot:default="{ hover }">
    <v-container fluid>
      <!-- <ckeditor
        ref="richText"
        @focus="onEditorFocus"
        :editor="editor"
        :value="getEditorData"
        :config="editorConfig"
        :disabled="editorDisabled"
      ></ckeditor>-->
      <div class="text-center">
        <p>
          <b>Título:</b>
          {{ title }}
        </p>
        <p>
          <b>Fuente:</b>
          {{ takenFrom || 'Elaboración propia' }}
        </p>
        <v-expand-transition>
          <div v-show="hover">
            <v-dialog eager v-model="dialog" width="500">
              <template v-slot:activator="{ on: dialog }">
                <v-btn small outlined color="tertiary" v-on="{ ...dialog }"
                  >Editar</v-btn
                >
              </template>
              <v-card>
                <v-toolbar color="tertiary" dark>
                  <v-toolbar-title>Edición de tabla</v-toolbar-title>
                </v-toolbar>
                <v-container>
                  <insert-table-component
                    v-if="dialog"
                    :tableId="data.idGlobalTable"
                    updateForm
                    @onUpdateTable="updateTable"
                  ></insert-table-component>
                </v-container>
              </v-card>
            </v-dialog>
            <v-btn
              small
              outlined
              color="error"
              @click="onDeleteTable(index, idGlobalTable)"
              >Eliminar</v-btn
            >
          </div>
        </v-expand-transition>
      </div>
    </v-container>
  </v-hover>
</template>

<script>
// import ClassicEditor from '@ckeditor/ckeditor5-build-inline/build/ckeditor';
// import "@ckeditor/ckeditor5-build-classic/build/translations/es";

export default {
  props: ['elementCitations', 'data', 'index'],
  data() {
    return {
      dialog: false,
      //   editor: ClassicEditor,
      editorDisabled: true,
      // '<figure class="table"><table><tbody><tr><td>Rol</td><td>Nombres y apellidos</td><td>Información de contacto</td></tr><tr><td>Investigador</td><td>Victor Juan Jimenez Flores</td><td><a href="mailto:mirakel1401@gmail.com"><i>v</i></a><i>j.jimenez96@gmail.com</i></td></tr><tr><td>Asesor Metodológico 1</td><td>Erbert Francisco Osco Mamani</td><td><i>eoscom@unjbg.edu.pe</i></td></tr><tr><td>Asesor Metodológico 2</td><td>Katherine de los Milagros Elías Quispe</td><td><i>katttyelias@gmail.com</i></td></tr></tbody></table></figure>',
      // this.data.editorData,
      idGlobalTable: this.data.idGlobalTable,
      editorConfig: {
        readOnly: true,
        // language: "es"
        // plugins: ["Table", "TableToolbar"],
        // plugins: [Alignment],
        // alignment: {
        //   options: ["left", "right"]
        // },
        toolbar: {
          items: [
            'insertTable',
            'bold',
            'italic',
            'link',
            '|',
            'undo',
            'redo',

            // "alignment",
            // "JustifyLeft",
            // "JustifyCenter",
            // "JustifyRight",

            // "bulletedList",
            // "numberedList",
            // "imageStyle:full",
            // "imageStyle:side",
            // "|",
            // "imageTextAlternative"
          ],
          //   image: { styles: ["full", "side"] },
          //   viewportTopOffset: 30
        },
      },
      menu: false,
      toggle_exclusive: 2,
      numberOfRows: 0,
      numberOfColumns: 0,
      snack: false,
      snackColor: '',
      snackText: '',
      max25chars: (v) => v.length <= 25 || 'El texto es muy largo!',
      headers: [],
      items: [],
    };
  },
  computed: {
    title() {
      return this.$store.state.research.tables[
        this.getTableIndex(this.idGlobalTable)
      ].title;
    },
    takenFrom() {
      return this.$store.getters['research/getReference'](
        this.$store.state.research.tables[
          this.getTableIndex(this.idGlobalTable)
        ].takenFrom,
        1,
      );
    },
    getEditorData() {
      return this.$store.state.research.tables[
        this.getTableIndex(this.idGlobalTable)
      ].editorData;
    },
  },
  methods: {
    updateQtyReference(referenceId, qty) {
      let payload = {
        referenceId,
        qty: qty,
      };
      this.$store.dispatch('research/updateQtyReferences', payload);
    },
    updateTable() {
      this.dialog = false;
    },
    onEditorFocus() {
      console.log('el foco lo tiene el editor!');
    },
    onDeleteTable(localIndex, globalId) {
      let referenceId = this.$store.state.research.tables[
        this.getTableIndex(this.idGlobalTable)
      ].takenFrom;
      this.$emit('onDeleteTable', localIndex, globalId);
      console.log('se mandara a eliminar esta referencia: ', referenceId);
      this.updateQtyReference(referenceId, -1);
    },
    getTableIndex(id) {
      return this.$store.state.research.tables.findIndex(
        (table) => table.id == id,
      );
    },
  },
};
</script>

<style scoped>
* {
  text-align: center;
}
</style>
