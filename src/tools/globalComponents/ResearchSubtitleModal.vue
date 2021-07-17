<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" dark color="tertiary">
        <v-icon left>add</v-icon>Añadir nuevo subtítulo
      </v-btn>
    </template>
    <v-card>
      <v-toolbar color="tertiary" dark>
        <v-toolbar-title>Añadiendo subtítulo</v-toolbar-title>
      </v-toolbar>
      <v-container>
        <v-layout>
          <v-flex xs12>
            <v-text-field
              @keyup.enter="dialog = false;onSubtitleAdded(subtitle);"
              label="Escribe tu nuevo subítulo"
              id="id"
              v-model="subtitle"
            ></v-text-field>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="tertiary" dark @click="dialog = false;onSubtitleAdded(subtitle)">Agregar</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { generateObjectId } from "../../tools/objectIdGenerator";
export default {
  props: ["childNumber"],
  data() {
    return {
      dialog: false,
      subtitle: ""
    };
  },
  methods: {
    onSubtitleAdded(subtitle) {
      let theoricalBasesIndex = this.$store.getters[
        "research/getResearchIndex"
      ]("theoricalBases");
      let newType = generateObjectId();
      let newSubtitle = {
        id: generateObjectId(),
        level4: [],
        tag: subtitle,
        values: [],
        type: `tchild+${newType}`
      };
      this.$emit("onSubtitleAdded", newSubtitle);
      let payload = {
        newIndex: {
          index: [...theoricalBasesIndex, this.childNumber],
          type: `tchild+${newType}`
        }
      };
      this.$store.dispatch("research/addResearchIndex", payload);
      this.subtitle = "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>