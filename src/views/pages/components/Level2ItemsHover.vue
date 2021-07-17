<template>
  <research-hover>
    <!-- element to hover -->
    <div class="body-1" slot="element" v-if="!editMode">
      {{ parentOrder }}.{{ level2Element.order }}. {{ level2ElementText }}.
    </div>
    <v-text-field
      slot="element"
      clearable
      v-else
      v-model="level2ElementText"
    ></v-text-field>
    <!-- what will appear -->
    <div slot="options">
      <div v-if="!editMode">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              large
              v-on="on"
              @click="editMode = !editMode"
              color="green darken-2"
              >mdi-pencil-box-outline</v-icon
            >
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              large
              v-on="on"
              @click="deleteElement(level2ElementText, index)"
              color="error"
              >mdi-delete-circle</v-icon
            >
          </template>
          <span>Eliminar</span>
        </v-tooltip>
      </div>
      <div v-if="editMode">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              large
              v-on="on"
              @click="
                editMode = !editMode;
                save(level2ElementText);
              "
              color="green darken-2"
              >mdi-content-save</v-icon
            >
          </template>
          <span>Guardar</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon large v-on="on" @click="cancelAction" color="error"
              >mdi-cancel</v-icon
            >
          </template>
          <span>Cancelar</span>
        </v-tooltip>
      </div>
    </div>
  </research-hover>
</template>

<script>
export default {
  props: ['index', 'level2Element', 'parentOrder'],
  data() {
    return {
      editMode: false,
      level2ElementText: '',
    };
  },
  mounted() {
    this.level2ElementText = this.level2Element.tag;
  },
  methods: {
    save(tag) {
      let payload = {
        typeOfElement: this.level2Element.type,
        newTag: tag,
      };
      this.$store.dispatch('researchConfig/updateLevel2ElementText', payload);
    },
    deleteElement(element, index) {
      confirm(`¿Seguro que deseas eliminar ${element}?`) &&
        this.$emit('delete', index);
    },
    cancelAction() {
      this.editMode = false;
      this.level2ElementText = this.level2Element.tag;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>