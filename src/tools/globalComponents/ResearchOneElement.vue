<template>
  <v-container v-if="elements">
    <v-flex sm12>
      <v-row>
        <div class="title mb-3">{{title}}</div>
        <help-selector :type="type"></help-selector>
      </v-row>
      <v-btn @click="editMode=!editMode" color="tertiary" dark small>
        <v-icon dark class="my-handle">mdi-lead-pencil</v-icon>
      </v-btn>
      <v-card outlined>
        <v-card-text>
          <v-hover>
            <div slot-scope="{ hover }">
              <p v-if="!editMode">{{text}}</p>
              <v-textarea
                v-show="editMode"
                filled
                v-model="text"
                label="Edición"
                rows="3"
                auto-grow
              ></v-textarea>

              <v-expand-transition>
                <div v-if="hover">
                  <v-btn
                    outlined
                    small
                    color="success"
                    @click="editMode=!editMode"
                    v-if="!editMode"
                  >Editar</v-btn>
                  <v-btn
                    outlined
                    v-if="editMode"
                    small
                    color="success"
                    @click="editMode=!editMode;updateParagraph(text)"
                  >Guardar</v-btn>
                  <v-btn
                    v-if="editMode"
                    outlined
                    small
                    color="error"
                    @click="cancelAction()"
                  >Cancelar</v-btn>
                </div>
              </v-expand-transition>
            </div>
          </v-hover>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import { customCopyObject } from "../../tools/customCopyObject";
import helpSelector from "../../views/pages/thesisHelp/helpSelector";
export default {
  props: ["title", "data", "completeObject", "indexElement", "type"],
  components: {
    helpSelector
  },
  data() {
    return {
      editMode: false,
      elements: [],
      text: ""
    };
  },
  computed: {
    titleNumeration() {
      return (
        this.indexElement[0] +
        1 +
        "." +
        (this.indexElement[1] + 1) +
        "." +
        (this.indexElement[2] + 1) +
        ". "
      );
    }
  },
  mounted() {
    this.text = customCopyObject(this.data[0].text);
    this.elements = this.data;
  },
  methods: {
    cancelAction() {
      this.editMode = false;
      this.text = this.data[0].text;
    },
    updateParagraph(text) {
      this.elements[0].text = text;
      this.onChangeData();
    },
    onChangeData() {
      console.log("actualizando datos de store...");
      console.log("se esta enviando: ", this.elements);

      let level1Index = this.indexElement[0];
      let level2Index = this.indexElement[1];
      let levelNumber = this.indexElement.length;
      if (levelNumber == 3) {
        console.log("previo a la actualizacion");
        console.log("el total de indices es: ", this.indexElement);
        let level3Index = this.indexElement[2];
        this.completeObject.level3[level3Index].values = this.elements;
      }
      let payload = {
        level1Index: level1Index,
        level2Index: level2Index,
        values: customCopyObject(this.completeObject)
      };
      this.$store.dispatch("research/updateResearchDynamically", payload);
      this.$emit("onUpdate");
    }
  }
};
</script>

<style scoped>
.padding-0 .v-timeline-item__divider {
  margin: 0;
  padding: 0 !important;
}
</style>