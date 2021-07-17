<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on:dialog }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn color="success" icon v-on="{ ...tooltip, ...dialog }">
            <v-icon color="black">mdi-help-circle-outline</v-icon>
          </v-btn>
        </template>
        <span>Ver sugerencias</span>
      </v-tooltip>
    </template>
    <v-card>
      <v-toolbar color="tertiary" dark>
        <v-toolbar-title>Tu texto</v-toolbar-title>
      </v-toolbar>
      <!-- body -->
      <v-container>
        <component :is="componentToShow(type)"></component>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">De acuerdo</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import generalObjectiveHelp from "../thesisHelp/generalObjectiveHelp";
import specificObjetive from "../thesisHelp/specificObjetive";
export default {
  props: ["type"],
  data() {
    return {
      dialog: false,
      components: [generalObjectiveHelp, specificObjetive]
    };
  },
  methods: {
    componentToShow(type) {
      console.log("se empezara a buscar el tipo: ", type);
      let selectedComponent = this.components.find(component => {
        return component.name == type;
      });
      return selectedComponent;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>