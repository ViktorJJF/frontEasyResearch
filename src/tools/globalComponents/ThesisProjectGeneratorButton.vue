<template>
  <!-- Modal (Help) -->
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on }">
        <v-btn
          class="ml-3"
          v-if="$store.state.research.body.hasOwnProperty('level1')"
          color="tertiary"
          dark
          v-on="on"
        >
          <v-icon left>mdi-cloud-download</v-icon>Descargar Tesis
        </v-btn>
      </template>
      <!-- body dialog -->
      <v-card>
        <v-toolbar color="secondary" dark>
          <v-toolbar-title>Exportar a proyecto de tesis a Word</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn dark @click="generateDocument" color="primary">Exportar</v-btn>
        </v-toolbar>
        <v-container>
          <ul>
            <li>Matriz de consistencia en forma de imagen</li>
            <li>Matriz de consistencia en hoja horizontal</li>
            <li>Matriz de operacionalización de variables en imagen</li>
          </ul>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">Mejor no</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import { generateCoverPageTemplate } from '../CoverPageGenerator';
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    generateDocument() {
      //regenerate CoverPage to send to API
      let template = JSON.parse(
        JSON.stringify(this.$store.state.research.coverPage.template),
      );
      let data = JSON.parse(
        JSON.stringify(this.$store.state.research.coverPage.basicInformation),
      );
      let payload = {
        coverPageTemplate: template,
        basicInformation: data,
      };
      generateCoverPageTemplate((generatedCoverPage) => {
        axios({
          url: '/api/word',
          method: 'POST',
          responseType: 'blob', // important
          data: {
            body: this.$store.state.research.body,
            references: this.$store.state.research.references,
            annexes: this.$store.state.research.annexes,
            coverPage: generatedCoverPage,
            styles: this.$store.state.research.styles,
            images: this.$store.state.research.images,
            tables: this.$store.state.research.tables,
          },
        }).then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'proyecto-tesis.docx'); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      }, payload);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
