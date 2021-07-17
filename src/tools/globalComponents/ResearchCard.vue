<template>
  <div>
    <!-- title -->
    <v-toolbar v-if="toolbar" color="tertiary" dark>
      <div class="headline">{{title}}</div>
      <!-- Modal (Help) -->
      <div class="text-xs-center">
        <v-dialog v-model="dialog" width="700">
          <template v-slot:activator="{ on:dialog }">
            <v-tooltip bottom>
              <template v-slot:activator="{on:tooltip}">
                <v-btn
                  class="mx-2"
                  fab
                  outlined
                  dark
                  small
                  color="white"
                  v-on="{ ...tooltip, ...dialog }"
                >
                  <v-icon dark>mdi-information-variant</v-icon>
                </v-btn>
              </template>
              <span>Ver sugerencias</span>
            </v-tooltip>
          </template>

          <v-card>
            <v-toolbar color="tertiary" dark>
              <v-toolbar-title>¿Cómo se hace?</v-toolbar-title>
            </v-toolbar>
            <v-container>
              <slot name="contentModal"></slot>
            </v-container>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialog = false">Ya entendí!</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-toolbar>
    <v-card outlined>
      <slot name="alert" />
      <v-container>
        <slot name="body"></slot>
        <!-- actions -->
        <v-card-actions v-if="toolbar">
          <v-btn color="success" @click="onSave();snackbar = true">Guardar cambios</v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
    <!-- notification (snackbar) -->
    <v-snackbar v-model="snackbar" color="success" :timeout="timeout">
      Cambios guardados con éxito
      <v-btn dark text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { saveIntoDb } from "../customDbFunctions";
export default {
  props: {
    title: {
      type: String
    },
    toolbar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      snackbar: false,
      timeout: 4000,
      dialog: false,
      loading: false
    };
  },
  methods: {
    onSave() {
      this.$emit("onSave");
      //saving into db
      let projectId = this.$route.params.projectId;
      saveIntoDb(projectId, response => {
        console.log(response);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>