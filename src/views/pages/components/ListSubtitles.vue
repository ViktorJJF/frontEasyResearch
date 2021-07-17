<template>
  <div>
    <draggable
      handle=".my-handle"
      @change="sortOrder(level2Elements)"
      v-model="level2Elements"
      :animation="300"
    >
      <transition-group>
        <div
          v-for="(level2Element, index) in level2Elements"
          :key="level2Element.tag"
        >
          <v-row justify="start" align="center" class="mr-3">
            <v-col sm="1">
              <v-btn fab dark small color="tertiary">
                <v-icon dark class="my-handle">mdi-gesture-swipe-up</v-icon>
              </v-btn>
            </v-col>
            <v-col sm="11">
              <level2-items-hover
                @delete="deleteLevel2Item"
                :parentOrder="parentOrder"
                :index="index"
                :level2Element="level2Element"
              />
            </v-col>
          </v-row>
        </div>
      </transition-group>
    </draggable>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" color="tertiary" outlined
          >Añadir nueva Sub-Sección</v-btn
        >
      </template>
      <v-card>
        <v-toolbar color="secondary" dark>
          <v-toolbar-title>Añadir nueva Sub-Sección</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" class="mb-2">
                <p class="headline">¿Qué tipo de elemento añadiras? *</p>
                <v-autocomplete
                  v-model="selectedType"
                  :items="defaultTags"
                  hide-no-data
                  hide-selected
                  item-text="text"
                  placeholder="Empieza a escribir para buscar"
                  return-object
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false" outlined color="error">Cancelar</v-btn>
          <v-btn
            @click="
              addLevel2Element();
              dialog = false;
            "
            outlined
            color="success"
            >Guardar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-divider class="my-3"></v-divider>
  </div>
</template>

<script>
import Level2ItemsHover from './Level2ItemsHover';
import variablesTypes from '../../../tools/constants';
export default {
  components: {
    Level2ItemsHover,
  },
  props: ['level2Titles', 'parentOrder'],
  data() {
    return {
      defaultTags: [],
      dialog: false,
      level2Elements: [],
      selectedType: null,
    };
  },
  mounted() {
    this.level2Elements = this.level2Titles;
    this.initDataFromDB();
  },
  methods: {
    initDataFromDB() {
      this.defaultTags = variablesTypes.data;
      console.log('llego esto: ', this.defaultTags);
      // axios
      //   .get("/api/project/thesis-research/variables-types")
      //   .then(res => {
      //     if (res.data.ok) {
      //       console.log(res.data);
      //       this.defaultTags = JSON.parse(JSON.stringify(res.data.payload));
      //       console.log("ahora tienes: ", this.defaultTags);
      //     } else {
      //       // error msg
      //       console.error(res.data);
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    addLevel2Element() {
      console.log('Añadido elemento al padre : ', this.parentOrder);
      this.level2Elements.push({
        id: this.level2Elements.length + 1,
        order: this.level2Elements.length + 1,
        type: this.selectedType,
        tag: this.selectedType,
        level1_id: this.parentId,
        values: [],
      });
      this.tagTitle = '';
      this.selectedType = '';
    },
    showModal() {
      this.$refs.myModalRef.show();
    },
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    sortOrder(array) {
      array.forEach((element, index) => {
        element.order = index + 1;
      });
    },
    negocios(index) {
      console.log('gaaa del elemento: ', index);
    },
    deleteLevel2Item(index) {
      this.level2Elements.splice(index, 1);
    },
  },
};
</script>

<style scoped>
</style>