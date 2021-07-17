<template>
  <div class="maxHeigth element" @click.stop="dialog = true">
    <slot></slot>
    <v-dialog v-model="dialog" scrollable width="900">
      <!-- body dialog -->
      <v-card>
        <v-toolbar color="tertiary" dark>
          <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-card-text style="height: 400px;">
          <component :toolbar="false" :is="componentName"></component>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" @click="dialog = false;save();">Guardar cambios</v-btn>
          <v-btn color="error" outlined @click="dialog = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import objetives from "../thesisComponents/objetives";
import problemFormulation from "../thesisComponents/problemFormulation";
import hypothesis from "../thesisComponents/hypothesis";
import variableSupport from "../../pages/variableSupport";
export default {
  components: {
    objetives,
    problemFormulation,
    hypothesis,
    variableSupport
  },
  props: ["title", "componentName"],
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    save() {
      this.$emit("save");
    }
  },
  computed: {
    ...mapGetters("research", ["getResearchIndex"])
  }
};
</script>

<style lang="scss" scoped>
.element:hover {
  outline: 1px #bbdefb dashed;
  background-color: #e3f2fd;
  cursor: pointer;
}
</style>