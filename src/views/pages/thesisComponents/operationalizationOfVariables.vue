<template>
  <research-chapter-card>
    <div slot="body">
      <p>{{variables}}</p>
      <v-alert v-if="!variablesFromStore" :value="true" color="error" icon="warning">
        Parece que aún no definiste tus variables, es necesario si quieres crear las tablas de operacionalización de las variables. Puedes hacerlo entrando a esta
        <router-link class="link" :to="{name:'variable'}">sección</router-link>
      </v-alert>
      <div v-else class="mb-3" v-for="variable in variables" :key="variable.id">
        <h3>
          Tabla de operacionalización de la variable:
          <strong>{{variable.value}}</strong>
        </h3>
        <table class="customTable">
          <thead>
            <tr>
              <th v-for="(header) in headers" :key="header.id">{{ header.tag }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td :rowspan="variable.dimensions.length+1">{{variable.value}}</td>
              <td>{{variable.dimensions[0].value}}</td>
              <td>
                <ul v-for="indicator in variable.dimensions[0].indicators" :key="indicator.id">
                  <li>{{indicator.value}}</li>
                </ul>
              </td>
              <td>Items ({{`${1+1},${1+2},${1+3}`}})</td>
            </tr>
            <tr v-for="i in (1,variable.dimensions.length-1)" :key="variable.dimensions[i].id">
              <td>{{variable.dimensions[i].value}}</td>
              <td>
                <ul>
                  <li
                    v-for="(indicator) in variable.dimensions[i].indicators"
                    :key="indicator.id"
                  >{{indicator.value}}</li>
                </ul>
              </td>
              <td>Items ({{`${i+1},${i+2},${i+3}`}})</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </research-chapter-card>
</template>

<script>
import { mapState } from "vuex";
import { customCopyObject } from "../../../tools/customCopyObject";
export default {
  name: "operationalizationOfVariables",
  props: ["index"],
  data() {
    return {
      variables: null,
      headers: [
        { type: "variableName", tag: "Variable" },
        { type: "nonVariable", tag: "Dimensión" },
        { type: "nonVariable", tag: "Indicadores" },
        { type: "nonVariable", tag: "Instrumento" }
      ]
    };
  },
  computed: {
    ...mapState("research", {
      variablesFromStore: state => state.characteristics.variables
    })
  },
  methods: {
    initialData() {
      this.variables = customCopyObject(this.variablesFromStore);
    }
  },
  mounted() {
    this.initialData();
  }
};
</script>

<style scoped>
</style>