<template>
  <v-flex class="mt-4" sm12>
    <div class="text-center" v-if="!editMode">
      <p>
        {{ element }}
        <v-btn
          small
          fab
          outlined
          color="success"
          @click="editMode = !editMode"
          v-if="!editMode"
        >
          <v-icon>mdi-lead-pencil</v-icon>
        </v-btn>
      </p>
    </div>
    <v-text-field
      class="text-center"
      clearable
      v-model="element"
      v-show="editMode"
      autofocus
    ></v-text-field>
    <v-btn
      outlined
      v-if="editMode"
      small
      color="success"
      @click="
        editMode = !editMode;
        storeData();
      "
      >Guardar</v-btn
    >
    <v-btn
      v-if="editMode"
      outlined
      small
      color="error"
      @click="editMode = !editMode"
      >Cancelar</v-btn
    >
    <!-- notification (snackbar) -->
    <v-snackbar v-model="snackbar" color="success" :timeout="timeout">
      Cambios guardados con éxito
      <v-btn dark text @click="snackbar = false">Cerrar</v-btn>
    </v-snackbar>
  </v-flex>
</template>

<script>
export default {
  props: ['data'],
  data() {
    return {
      snackbar: false,
      timeout: 4000,
      editMode: false,
      completeObject: null,
      element: '',
    };
  },
  methods: {
    getData() {
      console.log('llego esta data: ', this.data);
      this.completeObject = this.data;
      if (this.completeObject.values.length < 1) {
        this.editMode = true;
      } else {
        this.element = this.completeObject.values[0].text;
      }
    },
    storeData() {
      this.snackbar = true;
      this.completeObject.values[0].text = this.element;
      this.$emit('storeData', this.completeObject);
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style scoped>
</style>
