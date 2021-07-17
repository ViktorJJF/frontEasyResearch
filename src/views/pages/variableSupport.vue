<template>
  <research-card
    :toolbar="toolbar"
    @onSave="saveIntoStoreAndDB"
    title="Variables de la investigación"
  >
    <div slot="body">
      <div v-if="titleFromStore">
        <p class="title">Tu título es:</p>
        <blockquote class="blockquote">"{{titleFromStore.fullTitle}}"</blockquote>
        <p>
          Ahora
          <strong>desestructúralo</strong> identificando tus variables
        </p>
      </div>
      <div v-else>
        <v-alert
          :value="true"
          type="error"
          icon="warning"
        >Parece que aún no cuentas con un título :( es recomendable hacerlo antes de pasar a esta sección</v-alert>
      </div>
      <v-container>
        <v-row align="center">
          <h3>Variables</h3>
          <v-tooltip bottom>
            <template v-slot:activator="{on}">
              <v-btn class="ml-3" v-on="on" @click="addVariable()" dark color="tertiary">
                <v-icon left>add</v-icon>Agregar variable
              </v-btn>
            </template>
            <span>Agregar variable</span>
          </v-tooltip>
        </v-row>
      </v-container>
      <v-form>
        <v-container>
          <v-card
            class="pa-8 mb-5"
            outlined
            v-for="(variable,index) in variables"
            :key="variable.id"
          >
            <v-row no-gutters>
              <v-col cols="12">
                <v-row>
                  <strong class="headline">Variable {{index+1}}: {{variable.value}}</strong>
                  <v-col cols="12">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          class="ml-3"
                          @click="addDimension(index)"
                          small
                          color="tertiary"
                          dark
                          v-on="on"
                        >
                          <v-icon left>add</v-icon>Agregar Dimensión
                        </v-btn>
                      </template>
                      <span>Agregar dimensión</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          v-on="on"
                          class="ml-3"
                          small
                          color="error"
                          @click="deleteVariable(index)"
                        >
                          <v-icon left>delete</v-icon>Eliminar
                        </v-btn>
                      </template>
                      <span>Eliminar variable</span>
                    </v-tooltip>
                  </v-col>
                </v-row>
                <v-row class="px-3">
                  <v-col cols="6">
                    <v-text-field
                      label="Nombre de variable"
                      v-model="variable.value"
                      :counter="50"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      :items="types"
                      item-text="value"
                      item-value="type"
                      v-model="variable.type"
                      label="Tipo de variable"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12">
                <ul>
                  <li v-for="(dimension,dimensionIndex) in variable.dimensions" :key="dimension.id">
                    <v-row align="center">
                      <v-col sm="6">
                        <p>
                          <strong>Dimensión {{dimensionIndex+1}}</strong>
                        </p>
                        <v-text-field
                          @click:append-outer="deleteDimension(index,dimensionIndex)"
                          append-outer-icon="delete"
                          label="Nombre de la dimensión"
                          v-model="dimension.value"
                        ></v-text-field>
                      </v-col>
                      <v-col sm="6">
                        <p>
                          <strong>Indicadores</strong>
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on }">
                              <v-btn
                                @click="addIndicator(index,dimensionIndex)"
                                small
                                fab
                                color="tertiary"
                                dark
                                v-on="on"
                              >
                                <v-icon>add</v-icon>
                              </v-btn>
                            </template>
                            <span>Agregar indicador</span>
                          </v-tooltip>
                        </p>
                        <ul>
                          <li
                            v-for="(indicator,indicatorIndex) in dimension.indicators"
                            :key="indicator.id"
                          >
                            <v-row>
                              <v-text-field
                                @click:append-outer="deleteIndicator(index,dimensionIndex,indicatorIndex)"
                                append-outer-icon="delete"
                                label="Nombre del indicador"
                                v-model="indicator.value"
                              ></v-text-field>
                            </v-row>
                          </li>
                        </ul>
                      </v-col>
                    </v-row>
                  </li>
                </ul>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-form>
    </div>
    <div slot="contentModal">
      <p>
        <strong>Las variables en la investigación, representan un concepto de vital importancia dentro de un proyecto. Las variables, son los conceptos que forman enunciados de un tipo particular denominado hipótesis.</strong>
      </p>
      <h3>Variable independiente</h3>Fenómeno a la que se le va a evaluar su capacidad para influir, incidir o afectar a otras variables.
      Su nombre lo explica de mejor modo en el hecho que de no depende de algo para estar allí:
      Es aquella característica o propiedad que se supone ser la causa del fenómeno estudiado. En investigación experimental se llama así, a la variable que el investigador manipula. Que son manipuladas experimentalmente por un investigador.
      <h3>Variable Dependiente</h3>Cambios sufridos por los sujetos como consecuencia de la manipulación de la variable independiente por parte del experimentador. En este caso el nombre lo dice de manera explicita, va a depender de algo que la hace variar.
      Propiedad o característica que se trata de cambiar mediante la manipulación de la variable independiente.
      Las variables dependientes son las que se miden.
      <h3>Tipos de variables según su naturaleza Sampieri</h3>
      <v-img :src="imgDesignSrc" aspect-ratio="1.7" contain></v-img>
    </div>
  </research-card>
</template>

<script>
import { generateObjectId } from "../../tools/objectIdGenerator";
import { customCopyObject } from "../../tools/customCopyObject";
import { mapState } from "vuex";
export default {
  props: {
    toolbar: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      types: [
        { id: 1, type: "independentVariable", value: "Variable independiente" },
        { id: 2, type: "dependentVariable", value: "Variable dependiente" },
        { id: 3, type: "interveningVariable", value: "Variable interviniente" },
        { id: 4, type: "studyVariable", value: "Variable (correlación)" }
      ],
      imgDesignSrc: "https://i.ytimg.com/vi/sQ08tqf-rXU/maxresdefault.jpg",
      variables: []
    };
  },
  mounted() {
    this.initialData();
  },
  methods: {
    deleteDimension(variableIndex, dimensionIndex) {
      confirm(
        "¿Seguro que deseas eliminar esta dimensión? También serán eliminados los indicadores asociados"
      ) && this.variables[variableIndex].dimensions.splice(dimensionIndex, 1);
    },
    deleteIndicator(variableIndex, dimensionIndex, indicatorIndex) {
      this.variables[variableIndex].dimensions[
        dimensionIndex
      ].indicators.splice(indicatorIndex, 1);
    },
    addDimension(variableIndex) {
      this.variables[variableIndex].dimensions.push({
        id: generateObjectId(),
        value: "# Nueva dimensión",
        indicators: [{ id: 1, value: "# Nuevo Indicador 01" }]
      });
    },
    addIndicator(variableIndex, dimensionIndex) {
      this.variables[variableIndex].dimensions[dimensionIndex].indicators.push({
        id: generateObjectId(),
        value: "# Indicador 01"
      });
    },
    initialData() {
      this.variables = this.variablesFromStore;
    },
    saveIntoStoreAndDB() {
      console.log("guardando las variables");
      //saving into store //saving db in research-card
      let payload = { variables: customCopyObject(this.variables) };
      this.$store.dispatch("research/updateVariables", payload);
    },
    deleteVariable(index) {
      confirm(
        "¿Seguro que deseas eliminar esta variable? También serán eliminados las dimensiones e indicadores asociados"
      ) && this.variables.splice(index, 1);
    },
    addVariable() {
      this.variables.push({
        id: generateObjectId(),
        value: "",
        type: "",
        dimensions: [
          {
            id: generateObjectId(),
            value: "# Edita esta dimensión",
            indicators: [
              {
                id: generateObjectId(),
                value: "# Indicador 01"
              },
              {
                id: generateObjectId(),
                value: "# Indicador 02"
              }
            ]
          }
        ]
      });
    }
  },
  computed: {
    ...mapState("research", {
      titleFromStore: state => state.characteristics.title,
      variablesFromStore: state => state.characteristics.variables
    })
  }
};
</script>

<style lang="scss" scoped>
</style>